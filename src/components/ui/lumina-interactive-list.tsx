"use client"

// Lumina interactive list: a full-bleed slider whose images hand over through a
// WebGL "glass bubble" that grows from the centre, refracting the next image as
// it expands. Titles re-enter letter by letter; a progress line under each item
// in the index counts down to the next slide.
//
// Adapted from the 21st.dev original: slides come in as props, three.js and GSAP
// come from npm instead of injected <script> tags, the canvas is sized to its
// container instead of the window, it only renders while something changes, and
// it cleans up its WebGL resources on unmount. Without WebGL it shows the image.
import gsap from "gsap"
import * as React from "react"
import {
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  type Texture,
} from "three"

import { cn } from "@/lib/utils"

export interface LuminaSlide {
  title: string
  description: string
  /** Image URL. Any src an <img> takes. */
  media: string
  /** Short line above the title, e.g. role and year. */
  meta?: string
  tags?: string[]
  link?: { label: string; href: string }
  /** Small caption in the corner, e.g. "Illustration". */
  caption?: string
}

export interface LuminaInteractiveListProps {
  slides: LuminaSlide[]
  /** Accessible name for the whole slider. */
  label?: string
  /** Time each slide stays up before advancing, ms. @default 6500 */
  interval?: number
  /** Length of the glass transition, s. @default 2.2 */
  transition?: number
  className?: string
}

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`

// The glass effect from the original, unchanged apart from dropping the unused effect stubs.
const fragmentShader = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  void main() {
    float progress = uProgress;
    float time = progress * 5.0;
    vec2 uv1 = getCoverUV(vUv, uTexture1Size);
    vec2 uv2 = getCoverUV(vUv, uTexture2Size);
    float maxR = length(uResolution) * 0.85;
    float br = progress * maxR;
    vec2 p = vUv * uResolution;
    vec2 c = uResolution * 0.5;
    float d = length(p - c);
    float nd = d / max(br, 0.001);
    float inside = smoothstep(br + 3.0, br - 3.0, d);
    vec4 img;
    if (inside > 0.0) {
      float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
      vec2 distUV = uv2 - dir * ro;
      distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * inside;
      float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        texture2D(uTexture2, distUV + dir * ca * 1.2).r,
        texture2D(uTexture2, distUV + dir * ca * 0.2).g,
        texture2D(uTexture2, distUV - dir * ca * 0.8).b,
        1.0
      );
      float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
      img.rgb += rim * 0.08;
    } else {
      img = texture2D(uTexture2, uv2);
    }
    vec4 oldImg = texture2D(uTexture1, uv1);
    if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
    gl_FragColor = mix(oldImg, img, inside);
  }
`

type Gl = {
  renderer: WebGLRenderer
  material: ShaderMaterial
  textures: Texture[]
  render: () => void
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const read = () => setReduced(mq.matches)
    read()
    mq.addEventListener("change", read)
    return () => mq.removeEventListener("change", read)
  }, [])
  return reduced
}

/** Splits a title into per-letter spans so GSAP can stagger them in. */
function SplitTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span key={i} data-char className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {w < text.split(" ").length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </>
  )
}

export function LuminaInteractiveList({
  slides,
  label = "Projects",
  interval = 6500,
  transition = 2.2,
  className,
}: LuminaInteractiveListProps) {
  const rootRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const gl = React.useRef<Gl | null>(null)
  const shown = React.useRef(0) // the slide the canvas currently shows
  const busy = React.useRef(false)

  const [active, setActive] = React.useState(0)
  const [ready, setReady] = React.useState(false) // textures loaded, canvas visible
  const [visible, setVisible] = React.useState(false)
  const [held, setHeld] = React.useState(false)
  const [tabHidden, setTabHidden] = React.useState(false)
  const reduced = usePrefersReducedMotion()
  const count = slides.length
  const playing = visible && !held && !tabHidden && count > 1

  // WebGL setup: one renderer, one full-screen quad, a texture per slide.
  React.useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return
    let disposed = false
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false })
    } catch {
      return // No WebGL: the <img> fallback stays up.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const material = new ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uResolution: { value: new Vector2(1, 1) },
        uTexture1Size: { value: new Vector2(1, 1) },
        uTexture2Size: { value: new Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader,
    })
    const geometry = new PlaneGeometry(2, 2)
    scene.add(new Mesh(geometry, material))
    const render = () => renderer.render(scene, camera)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = root
      renderer.setSize(w, h, false)
      material.uniforms.uResolution.value.set(w, h)
      render()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(root)
    resize()

    const loader = new TextureLoader()
    const textures: Texture[] = []
    Promise.all(
      slides.map(
        (s) =>
          new Promise<Texture>((resolve, reject) =>
            loader.load(
              s.media,
              (t) => {
                t.minFilter = t.magFilter = LinearFilter
                const img = t.image as HTMLImageElement
                t.userData = { size: new Vector2(img.width, img.height) }
                resolve(t)
              },
              undefined,
              reject,
            ),
          ),
      ),
    )
      .then((loaded) => {
        if (disposed) return loaded.forEach((t) => t.dispose())
        textures.push(...loaded)
        const first = loaded[shown.current]
        material.uniforms.uTexture1.value = first
        material.uniforms.uTexture2.value = first
        material.uniforms.uTexture1Size.value = first.userData.size
        material.uniforms.uTexture2Size.value = first.userData.size
        gl.current = { renderer, material, textures, render }
        render()
        setReady(true)
      })
      .catch(() => {
        /* A failed image leaves the <img> fallback in place. */
      })

    return () => {
      disposed = true
      ro.disconnect()
      gsap.killTweensOf(material.uniforms.uProgress)
      textures.forEach((t) => t.dispose())
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      gl.current = null
    }
  }, [slides])

  // Pause when scrolled away or the tab is hidden.
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  const goTo = React.useCallback(
    (next: number) => {
      if (next === shown.current || busy.current) return
      setActive(next)
      const g = gl.current
      if (!g) {
        shown.current = next
        return
      }
      const from = g.textures[shown.current]
      const to = g.textures[next]
      const u = g.material.uniforms
      busy.current = true
      u.uTexture1.value = from
      u.uTexture2.value = to
      u.uTexture1Size.value = from.userData.size
      u.uTexture2Size.value = to.userData.size
      shown.current = next
      gsap.fromTo(
        u.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: reduced ? 0.01 : transition,
          ease: "power2.inOut",
          onUpdate: g.render,
          onComplete: () => {
            u.uTexture1.value = to
            u.uTexture1Size.value = to.userData.size
            u.uProgress.value = 0
            g.render()
            busy.current = false
          },
        },
      )
    },
    [reduced, transition],
  )

  // Title and description re-enter whenever the slide changes.
  React.useLayoutEffect(() => {
    const chars = titleRef.current?.querySelectorAll("[data-char]")
    const body = bodyRef.current
    if (!chars || !body) return
    if (reduced) {
      gsap.set([chars, body], { opacity: 1, y: 0 })
      return
    }
    const tl = gsap.timeline()
    tl.fromTo(chars, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.025, ease: "power3.out" })
    tl.fromTo(body, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.2)
    return () => {
      tl.kill()
    }
  }, [active, reduced])

  const slide = slides[active]

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative isolate h-svh min-h-[640px] w-full overflow-hidden bg-night text-paper", className)}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {/* Fallback and first paint: the plain image, until the canvas has its textures. */}
      <img
        src={slide.media}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn("absolute inset-0 size-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
      />
      {/* Shade the left (and, on phones, the bottom) so the text always reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,21,40,0.96)_0%,rgba(12,21,40,0.85)_36%,rgba(12,21,40,0)_62%)] max-md:bg-[linear-gradient(0deg,rgba(12,21,40,0.97)_0%,rgba(12,21,40,0.92)_58%,rgba(12,21,40,0.55)_78%,rgba(12,21,40,0.25)_100%)]"
      />

      <p className="absolute top-10 right-6 font-display text-[15px] text-paper/70 tabular-nums sm:right-10">
        <span className="text-paper">{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
      </p>

      <div
        aria-live="polite"
        className="absolute inset-x-0 bottom-36 px-5 sm:px-10 md:top-1/2 md:bottom-auto md:-translate-y-1/2 lg:pl-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))]"
      >
        <div className="max-w-[31rem]">
          {slide.meta ? <p className="text-[15px] font-medium text-tape">{slide.meta}</p> : null}
          <h3
            key={`t-${active}`}
            ref={titleRef}
            className="mt-3 font-display text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.05]"
          >
            <SplitTitle text={slide.title} />
          </h3>
          <div key={`b-${active}`} ref={bodyRef}>
            <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.65] text-paper/80">{slide.description}</p>
            {slide.tags?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {slide.tags.map((t) => (
                  <li key={t} className="rounded-full border border-paper/25 px-3 py-1 text-[13px] text-paper/80">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {slide.link ? (
              <a
                href={slide.link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-accent hover:text-paper"
              >
                {slide.link.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {slide.caption ? (
        <p className="absolute right-6 bottom-28 text-[13px] text-paper/60 sm:right-10 md:bottom-32">{slide.caption}</p>
      ) : null}

      {/* The index: one entry per slide, with a line that fills until the next one. */}
      <nav aria-label={`${label} index`} className="absolute inset-x-0 bottom-8 px-5 sm:px-10">
        <ol
          className="mx-auto grid max-w-6xl gap-3 sm:gap-5"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {slides.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                aria-label={`Show ${s.title}`}
                className="group block w-full cursor-pointer pt-3 text-left"
              >
                <span className="relative block h-[2px] overflow-hidden rounded-full bg-paper/20">
                  {i === active ? (
                    <span
                      key={active}
                      className="lumina-fill absolute inset-0 origin-left bg-accent"
                      style={{
                        animationDuration: `${interval}ms`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                      onAnimationEnd={() => goTo((active + 1) % count)}
                    />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "mt-3 hidden truncate text-[14px] transition-colors md:block",
                    i === active ? "text-paper" : "text-paper/55 group-hover:text-paper/85",
                  )}
                >
                  {s.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}

export default LuminaInteractiveList

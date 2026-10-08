// Torn Postcard Portfolio by Kedhareswer Naidu — 21st.dev/@kedhareswer/templates/scroll-tear-portfolio-website-template
// Recovered from the template's published preview bundle (the 21st registry URL returns "Component not found").
// Swap this file for the official source when the registry serves it; the props stay the same.
/* eslint-disable */
import * as g from "react"
import * as t from "react/jsx-runtime"
const pt = (r, e, a) => Math.min(a, Math.max(e, r)),
  O = (r) => {
    let e = r >>> 0 || 1
    return () => {
      e = (e + 1831565813) >>> 0
      let a = e
      return (
        (a = Math.imul(a ^ (a >>> 15), a | 1)),
        (a ^= a + Math.imul(a ^ (a >>> 7), a | 61)),
        ((a ^ (a >>> 14)) >>> 0) / 4294967296
      )
    }
  },
  be = (r) => {
    const e = pt(r, 0, 1)
    return e * e * (3 - 2 * e)
  },
  f = (r) => String(Math.round(r * 100) / 100),
  ts = (r, e, a) => {
    const s = O(r),
      o = s() * 6.283,
      n = s() * 6.283,
      p = []
    for (let d = 0; d <= e; d++) {
      const c = d / e
      let h =
        Math.sin(c * 6.283 * 1.15 + o) * a * 0.55 +
        Math.sin(c * 6.283 * 3.4 + n) * a * 0.28 +
        (s() - 0.5) * a * 0.6
      s() < 0.07 && (h += (s() - 0.5) * a * 1.5),
        p.push(Math.round(h * 10) / 10)
    }
    return p
  },
  pe = (r, e, a, s) => {
    const o = O(r),
      n = o() * 6.283,
      p = []
    for (let d = 0; d <= e; d++) {
      const c = 0.5 + 0.5 * Math.sin((d / e) * 6.283 * 2.3 + n)
      p.push(Math.round((a + (s - a) * (c * 0.7 + o() * 0.3)) * 10) / 10)
    }
    return p
  },
  le = 40,
  ye = (r, e) =>
    "calc(" +
    le +
    "px + (100% - " +
    le * 2 +
    "px) * " +
    f(r) +
    (e < 0 ? " - " + f(-e) : " + " + f(e)) +
    "px)",
  Et = (r, e, a) => {
    const s = r.length - 1,
      o = ["0 0", "100% 0"]
    for (let n = s; n >= 0; n--)
      o.push(f((n / s) * 100) + "% " + ye(e, r[n] + (a ? a[n] : 0)))
    return "polygon(" + o.join(",") + ")"
  },
  Tt = (r, e, a) => {
    const s = r.length - 1,
      o = []
    for (let n = 0; n <= s; n++)
      o.push(f((n / s) * 100) + "% " + ye(e, r[n] - (a ? a[n] : 0)))
    return o.push("100% 100%", "0 100%"), "polygon(" + o.join(",") + ")"
  },
  es = (r, e, a) => {
    const s = pt(r, 0, e - 1),
      o = Math.min(Math.floor(s), e - 1),
      n = o < e - 1 ? be((s - o - a) / (1 - a)) : 0,
      p = []
    for (let d = 0; d < e; d++)
      p.push({
        s: d === o ? n : 0,
        p: d === o ? 1 : d === o + 1 ? n : 0,
        on: d === o || (d === o + 1 && n > 0),
      })
    return { k: o, split: n, active: n > 0.55 ? o + 1 : o, chapters: p }
  },
  ss = (r, e, a, s) => {
    const o = pt(r, 0, e - 1),
      n = Math.floor(o)
    if (n >= e - 1) return null
    const p = be((o - n - a) / (1 - a))
    return p <= 0.002 || p >= 0.998
      ? null
      : (s > 0 ? p > 0.12 : p > 0.88)
        ? n + 1
        : n + a
  },
  ce = (r, e) => ((r % e) + e) % e,
  as = (r) =>
    r
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((e) => e[0].toUpperCase())
      .join("") || "·",
  rs = (r, e, a) => {
    const s = []
    return (
      e && s.push("subject=" + encodeURIComponent(e)),
      a && s.push("body=" + encodeURIComponent(a)),
      "mailto:" + r + (s.length ? "?" + s.join("&") : "")
    )
  },
  st = (r, e, a, s, o, n = 0.52, p = 7) => {
    const d = O(r),
      c = Math.pow(2, p),
      h = []
    for (let x = 0; x <= c; x++) h.push(0)
    ;(h[0] = (d() - 0.5) * o), (h[c] = (d() - 0.5) * o)
    let u = c,
      y = o
    for (; u > 1; ) {
      const x = u / 2
      for (let m = x; m < c; m += u)
        h[m] = (h[m - x] + h[m + x]) / 2 + (d() - 0.5) * y
      ;(y *= n), (u = x)
    }
    return h.map((x, m) => [e + ((a - e) * m) / c, s + x])
  },
  os = (r) => {
    if (r.length < 2) return ""
    let e = "M" + f(r[0][0]) + " " + f(r[0][1])
    for (let a = 0; a < r.length - 1; a++) {
      const s = r[Math.max(0, a - 1)],
        o = r[a],
        n = r[a + 1],
        p = r[Math.min(r.length - 1, a + 2)]
      e +=
        " C" +
        f(o[0] + (n[0] - s[0]) / 6) +
        " " +
        f(o[1] + (n[1] - s[1]) / 6) +
        " " +
        f(n[0] - (p[0] - o[0]) / 6) +
        " " +
        f(n[1] - (p[1] - o[1]) / 6) +
        " " +
        f(n[0]) +
        " " +
        f(n[1])
    }
    return e
  },
  is = (r) => {
    if (r.length < 2) return { fr: r.map(() => 0), total: 0 }
    const e = [0]
    let a = 0
    for (let s = 0; s < r.length - 1; s++) {
      const o = r[Math.max(0, s - 1)],
        n = r[s],
        p = r[s + 1],
        d = r[Math.min(r.length - 1, s + 2)],
        c = [n[0] + (p[0] - o[0]) / 6, n[1] + (p[1] - o[1]) / 6],
        h = [p[0] - (d[0] - n[0]) / 6, p[1] - (d[1] - n[1]) / 6]
      let u = n
      for (let y = 1; y <= 24; y++) {
        const x = y / 24,
          m = 1 - x,
          L = [
            m * m * m * n[0] +
              3 * m * m * x * c[0] +
              3 * m * x * x * h[0] +
              x * x * x * p[0],
            m * m * m * n[1] +
              3 * m * m * x * c[1] +
              3 * m * x * x * h[1] +
              x * x * x * p[1],
          ]
        ;(a += Math.hypot(L[0] - u[0], L[1] - u[1])), (u = L)
      }
      e.push(a)
    }
    return { fr: e.map((s) => (a ? s / a : 0)), total: a }
  },
  de = [
    {
      name: "Hearth",
      year: "2026",
      role: "Product design & build",
      description:
        "A booking app for mountain lodges that feels like walking into a warm kitchen. Rooms, sauna slots and the bus timetable on one calm screen.",
      tags: ["React Native", "Design"],
      note: "4.9 on the store, no ads",
      scene: "dawn",
    },
    {
      name: "Frostline",
      year: "2025",
      role: "Data visualisation",
      description:
        "An avalanche and weather dashboard for ski patrols, readable at a glance and usable with gloves on.",
      tags: ["D3", "React"],
      note: "used by 12 patrol teams",
      scene: "peak",
    },
    {
      name: "Swan Count",
      year: "2025",
      role: "Design + iOS",
      description:
        "Citizen science for a lake that never freezes. Over a thousand whooper swans winter there, and volunteers count every one.",
      tags: ["SwiftUI", "Research"],
      note: "1,500 swans every winter",
      scene: "lake",
    },
    {
      name: "Ember",
      year: "2024",
      role: "Product design",
      description:
        "The companion app for a warm-light lamp: sunrise alarms, slow evenings and nothing that glows blue after nine.",
      tags: ["Figma", "Motion"],
      note: "the sunrise alarm",
      scene: "sun",
    },
    {
      name: "Trailhead",
      year: "2023",
      role: "Front-end",
      description:
        "Open-source trail maps that keep working offline, deep in the woods where the signal gives up.",
      tags: ["Maps", "PWA"],
      url: "https://example.com",
      note: "40 MB of forest, offline",
      scene: "forest",
    },
  ],
  fe = [
    {
      year: "2019",
      title: "Went freelance",
      place: "Hyderabad",
      text: "Two cafés and a yoga studio. Learned to listen before drawing anything.",
    },
    {
      year: "2020",
      title: "Designer at Nordlys",
      place: "Remote",
      text: "Design systems for a travel company. Shipped a booking flow that halved support tickets.",
    },
    {
      year: "2022",
      title: "Lead designer, Frostline",
      place: "Bengaluru",
      text: "Built the data-viz team from one to five. Charts that work in a blizzard.",
    },
    {
      year: "2024",
      title: "Design engineer, Hearth",
      place: "Remote",
      text: "Prototype in code, ship in code. Owned the app from first sketch to store.",
    },
    {
      year: "2026",
      title: "Independent studio",
      place: "Anywhere with a view",
      text: "Taking on a few careful projects a year. Maybe yours.",
    },
  ],
  he = {
    title: "Postcard",
    subtitle: "How I slow down, recover and keep making good things",
    text: "If you need to reset, rebuild your focus and get your energy back, the best way is to make something with care, in good company. I design and build calm, useful products, and I like trading the noise for the view and shipping with the people who will use it.",
    facts: [
      { label: "Based in", value: "Hyderabad, India" },
      { label: "Doing", value: "Product design + front-end" },
      { label: "Experience", value: "7 years, 40+ launches" },
      { label: "Currently", value: "Open for new projects" },
    ],
    skills: [
      "Figma",
      "React",
      "TypeScript",
      "Motion",
      "Design systems",
      "Research",
    ],
  },
  ns = [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Dribbble", url: "https://dribbble.com" },
  ],
  yt = 5,
  xe = 0.32,
  ps = ["dark", "light", "dark", "light", "dark"],
  ls = `
.tpp-root{position:relative;width:100%;color:var(--tpp-ink);font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;--tpp-serif:"Cormorant Garamond","Cormorant","Playfair Display","Didot","Bodoni 72",Georgia,"Times New Roman",serif;--tpp-hand:"Caveat","Segoe Print","Bradley Hand","Marker Felt","Comic Sans MS",cursive}
.tpp-root *,.tpp-root *::before,.tpp-root *::after{box-sizing:border-box}
.tpp-root :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit}
.tpp-root :where(button,a,textarea,input):focus-visible{outline:2px dashed currentColor;outline-offset:3px}
.tpp-svg{display:block;max-width:none}
.tpp-fill{position:absolute;inset:0;width:100%;height:100%}
.tpp-track{position:relative;width:100%}
.tpp-stage{position:sticky;top:0;width:100%;overflow:clip;container-type:size;container-name:tpp;background:var(--tpp-deep)}
.tpp-ch{position:absolute;inset:0;visibility:hidden}
.tpp-ch[data-on]{visibility:visible}
.tpp-in{position:absolute;inset:0;transform-origin:50% 55%;will-change:transform}
.tpp-up,.tpp-lo{position:absolute;left:0;right:0;top:-40px;bottom:-40px;will-change:transform}
.tpp-up{z-index:2;transform-origin:50% 0}
.tpp-lo{z-index:1;transform-origin:50% 100%}
.tpp-sh,.tpp-fib,.tpp-shade{position:absolute;inset:0}
.tpp-fib{background:var(--tpp-fiber)}
.tpp-shade{background:rgba(8,14,26,.3)}
.tpp-lo .tpp-shade{background:rgba(8,14,26,.18)}
.tpp-grain{position:absolute;inset:0;background-image:var(--tpp-gd);background-size:192px 192px;pointer-events:none}
.tpp-grain[data-light]{background-image:var(--tpp-gl)}
.tpp-box{position:absolute;left:0;right:0;top:40px;bottom:40px;overflow:clip}
.tpp-ub{position:absolute;left:0;right:0;top:0;height:calc(var(--seam) * 100%)}
.tpp-lb{position:absolute;left:0;right:0;bottom:0;top:calc(var(--seam) * 100% + 16px)}
.tpp-par{will-change:transform;transition:transform .25s ease-out}
.tpp-root[data-mode=stack] .tpp-stage{position:relative;container-type:normal;background:none}
.tpp-root[data-mode=stack] .tpp-ch{position:relative;inset:auto;visibility:visible;height:var(--tpp-h);container-type:size;container-name:tpp;overflow:clip}

.tpp-serif{font-family:var(--tpp-serif)}
.tpp-hand{font-family:var(--tpp-hand)}
.tpp-h{font-family:var(--tpp-serif);font-weight:300;text-transform:uppercase;letter-spacing:.06em;line-height:1.08;margin:0}
.tpp-hero-h{font-size:clamp(28px,min(4.8cqw,7.4cqh),70px);color:#f3eee4;text-shadow:0 2px 24px rgba(10,18,32,.45)}
.tpp-sec-h{font-size:clamp(24px,min(4cqw,6cqh),56px)}
.tpp-label{font-size:11px;letter-spacing:.24em;text-transform:uppercase}

.tpp-nav{position:absolute;left:0;right:0;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px clamp(16px,4cqw,44px);color:var(--tpp-navc,#f3eee4);transition:color .5s;pointer-events:none}
.tpp-nav>*{pointer-events:auto}
.tpp-stage[data-tone=light] .tpp-nav,.tpp-stage[data-tone=light] .tpp-rail{--tpp-navc:var(--tpp-ink)}
.tpp-brand{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;white-space:nowrap}
.tpp-links{display:flex;gap:clamp(12px,2.2cqw,28px)}
.tpp-link{position:relative;font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.7;transition:opacity .3s}
.tpp-link:hover,.tpp-link[aria-current=true]{opacity:1}
.tpp-link::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:1px;background:currentColor;transform:scaleX(0);transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.tpp-link[aria-current=true]::after{transform:scaleX(1)}
.tpp-count{display:none;font-size:11px;letter-spacing:.2em}
.tpp-rail{position:absolute;right:clamp(10px,1.6cqw,22px);top:50%;z-index:40;display:flex;flex-direction:column;gap:12px;transform:translateY(-50%);color:var(--tpp-navc,#f3eee4)}
.tpp-dot{display:block;width:9px;height:9px;border:1px solid currentColor;border-radius:99px;opacity:.6;transition:all .4s}
.tpp-dot[aria-current=true]{background:currentColor;opacity:1;transform:scale(1.25)}

.tpp-tag{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;background:var(--tpp-paper);color:var(--tpp-ink);clip-path:polygon(0 8%,4% 0,30% 6%,58% 0,84% 5%,100% 0,98% 46%,100% 100%,70% 94%,40% 100%,12% 95%,0 100%,2% 52%);transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s}
.tpp-tag:hover{transform:translateY(-3px) rotate(-1.5deg)}
.tpp-tag[data-ghost]{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor;clip-path:none;border-radius:2px}

.tpp-paper{background:var(--tpp-paper);color:var(--tpp-ink);box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 18px 40px -18px rgba(8,14,26,.55),0 3px 8px rgba(8,14,26,.18)}
.tpp-tape{position:absolute;width:76px;height:22px;background:var(--tpp-tape);opacity:.82;clip-path:polygon(0 10%,6% 0,12% 12%,20% 0,100% 0,96% 30%,100% 55%,95% 80%,100% 100%,0 100%,4% 70%,0 45%);mix-blend-mode:multiply;z-index:3;pointer-events:none}
.tpp-note{position:absolute;padding:14px 18px 16px;font-family:var(--tpp-hand);font-size:clamp(14px,1.35cqw,19px);line-height:1.15;text-align:center;clip-path:polygon(2% 6%,10% 0,22% 5%,40% 1%,60% 6%,78% 0,96% 4%,100% 22%,97% 48%,100% 76%,96% 100%,74% 95%,52% 100%,30% 94%,8% 100%,0 78%,3% 50%,0 24%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.tpp-note:hover{transform:rotate(-1deg) translateY(-4px) scale(1.03)}

.tpp-eagle .tpp-wing{transform-box:view-box;transform-origin:124px 98px;animation:tpp-flap 3.6s ease-in-out infinite}
.tpp-eagle .tpp-wing-b{transform-origin:142px 96px;animation-delay:-.15s}
.tpp-glide{animation:tpp-glide 9s ease-in-out infinite}
@keyframes tpp-flap{0%,100%{transform:rotate(0)}45%{transform:rotate(-7deg)}60%{transform:rotate(3deg)}}
@keyframes tpp-glide{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(-14px,10px) rotate(-2deg)}}
.tpp-flake{position:absolute;top:-10px;width:var(--fs);height:var(--fs);border-radius:99px;background:#fff;opacity:.75;animation:tpp-fall var(--fd) linear infinite;animation-delay:var(--fl);pointer-events:none}
@keyframes tpp-fall{from{transform:translate(0,-20px)}to{transform:translate(var(--fx),calc(100cqh + 40px))}}
.tpp-hint{display:inline-block;animation:tpp-bob 1.8s ease-in-out infinite}
@keyframes tpp-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}

.tpp-rise{animation:tpp-rise 1.1s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--rd,0s)}
@keyframes tpp-rise{from{opacity:0;transform:translateY(26px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
.tpp-flyin{animation:tpp-flyin 1.8s cubic-bezier(.2,.8,.2,1) both .3s}
@keyframes tpp-flyin{from{opacity:0;transform:translate(160px,-90px) scale(.7) rotate(8deg)}to{opacity:1;transform:none}}

.tpp-card3d{display:grid;perspective:1600px}
.tpp-card3d>*{grid-area:1/1}
.tpp-flip{display:grid;transition:transform .9s cubic-bezier(.3,.7,.2,1);transform-style:preserve-3d}
.tpp-flip>*{grid-area:1/1;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.tpp-flip[data-back]{transform:rotateY(180deg)}
.tpp-back{transform:rotateY(180deg)}
.tpp-postcard{width:min(800px,88cqw,calc((var(--seam) * 100cqh - 150px) * 1.66));aspect-ratio:1.62/1}
.tpp-pc-grid{display:grid;grid-template-columns:1fr 1px 1fr;gap:clamp(12px,2cqw,26px);height:100%;padding:clamp(14px,2.2cqw,26px)}
.tpp-rule{background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(1.5em - 1px),rgba(38,54,79,.22) calc(1.5em - 1px),rgba(38,54,79,.22) 1.5em)}
.tpp-hw{font-family:var(--tpp-hand);font-size:clamp(13px,1.45cqw,19px);line-height:1.5em;color:#2f4a76}
.tpp-envelope{transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.tpp-envelope .tpp-letter{transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.tpp-envelope:hover{transform:rotate(-4deg) translateY(-4px)}
.tpp-envelope:hover .tpp-letter{transform:translateY(-26px)}

.tpp-polaroid{position:absolute;inset:0;padding:10px 10px 0;background:#f7f4ee;box-shadow:0 22px 40px -18px rgba(0,0,0,.6),0 2px 6px rgba(0,0,0,.25);transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .5s}
.tpp-polaroid[data-f="1"]{animation:tpp-flick1 .75s cubic-bezier(.3,.6,.2,1)}
.tpp-polaroid[data-f="2"]{animation:tpp-flick2 .75s cubic-bezier(.3,.6,.2,1)}
@keyframes tpp-flick1{0%{translate:0 0;z-index:30}45%{translate:-70% -6%;z-index:30}55%{z-index:0}100%{translate:0 0;z-index:0}}
@keyframes tpp-flick2{0%{translate:0 0;z-index:30}45%{translate:-70% -6%;z-index:30}55%{z-index:0}100%{translate:0 0;z-index:0}}
.tpp-polaroid[data-in="1"]{animation:tpp-back1 .75s cubic-bezier(.3,.6,.2,1)}
.tpp-polaroid[data-in="2"]{animation:tpp-back2 .75s cubic-bezier(.3,.6,.2,1)}
@keyframes tpp-back1{0%{translate:0 0;z-index:0}45%{translate:-70% -6%;z-index:0}55%{z-index:30}100%{translate:0 0;z-index:30}}
@keyframes tpp-back2{0%{translate:0 0;z-index:0}45%{translate:-70% -6%;z-index:0}55%{z-index:30}100%{translate:0 0;z-index:30}}
.tpp-ncard{position:relative;background:#f4f1ea;color:var(--tpp-ink);border-radius:8px;padding:clamp(14px,1.8cqw,22px);box-shadow:0 20px 40px -20px rgba(0,0,0,.65)}
.tpp-ncard::before{content:"";position:absolute;inset:5px;border:1px solid rgba(38,54,79,.35);border-radius:5px;pointer-events:none}
.tpp-chip{display:inline-block;padding:3px 9px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(38,54,79,.35);border-radius:99px}
.tpp-round{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:99px;border:1px solid currentColor;transition:background .3s,color .3s,transform .3s}
.tpp-round:hover{background:#f3eee4;color:var(--tpp-deep);transform:scale(1.06)}
.tpp-pip{width:22px;height:4px;border-radius:2px;background:currentColor;opacity:.3;transition:opacity .3s,width .3s}
.tpp-pip[aria-current=true]{opacity:1;width:34px}
.tpp-dash{stroke-dasharray:7 9;animation:tpp-march 1.6s linear infinite}
@keyframes tpp-march{to{stroke-dashoffset:-32}}
.tpp-tail{transform-box:view-box;transform-origin:140px 150px;transition:transform .6s cubic-bezier(.3,1.6,.4,1)}
.tpp-squirrel:hover .tpp-tail{transform:rotate(-9deg)}
.tpp-squirrel .tpp-sq-head{transform-box:view-box;transform-origin:112px 96px;transition:transform .5s}
.tpp-squirrel:hover .tpp-sq-head{transform:rotate(-8deg)}

.tpp-pin{position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--tpp-ink);transition:transform .3s}
.tpp-pin:hover{transform:translate(-50%,-100%) translateY(-3px)}
.tpp-pin-dot{width:12px;height:12px;border-radius:99px;background:var(--tpp-paper);border:2px solid var(--tpp-ink);transition:background .3s,transform .3s}
.tpp-pin[aria-pressed=true] .tpp-pin-dot{background:var(--tpp-accent);border-color:var(--tpp-accent);transform:scale(1.3)}
.tpp-pin-y{font-family:var(--tpp-serif);font-size:15px;font-weight:600;letter-spacing:.06em}
.tpp-walker{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:99px;border:1.5px dashed var(--tpp-accent);transition:left .9s cubic-bezier(.4,.1,.2,1),top .9s cubic-bezier(.4,.1,.2,1);pointer-events:none;animation:tpp-spin 6s linear infinite}
@keyframes tpp-spin{to{rotate:360deg}}
.tpp-progress{transition:stroke-dashoffset .9s cubic-bezier(.4,.1,.2,1)}
.tpp-stop{position:absolute;width:min(300px,40cqw);transition:left .6s cubic-bezier(.2,.8,.2,1),top .6s cubic-bezier(.2,.8,.2,1)}

.tpp-stamp-btn{position:relative;transition:transform .3s;opacity:.55}
.tpp-stamp-btn[aria-pressed=true]{opacity:1;transform:rotate(-4deg) scale(1.08)}
.tpp-stamp-btn:hover{opacity:1}
.tpp-input{width:100%;background:transparent;border:0;border-bottom:1px solid rgba(38,54,79,.3);padding:4px 0;font-family:var(--tpp-hand);font-size:clamp(15px,1.5cqw,20px);color:#2f4a76;outline:none}
.tpp-input::placeholder{color:rgba(47,74,118,.45)}
.tpp-msg{width:100%;height:100%;resize:none;background:transparent;border:0;outline:none;padding:0;font-family:var(--tpp-hand);font-size:clamp(15px,1.5cqw,20px);line-height:1.5em;color:#2f4a76}
.tpp-msg::placeholder{color:rgba(47,74,118,.45)}
.tpp-shake{animation:tpp-shake .45s}
.tpp-shake2{animation:tpp-shake2 .45s}
@keyframes tpp-shake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
@keyframes tpp-shake2{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.tpp-postmark{position:absolute;pointer-events:none;animation:tpp-stampin .5s cubic-bezier(.2,1.6,.4,1) both}
@keyframes tpp-stampin{from{opacity:0;transform:scale(1.8) rotate(-30deg)}to{opacity:.85;transform:scale(1) rotate(-12deg)}}
.tpp-luggage{position:relative;display:inline-flex;align-items:center;gap:8px;padding:8px 16px 8px 26px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;background:var(--tpp-paper);color:var(--tpp-ink);clip-path:polygon(12px 0,100% 0,100% 100%,12px 100%,0 50%);transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.tpp-luggage::before{content:"";position:absolute;left:12px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:99px;background:var(--tpp-deep)}
.tpp-luggage:hover{transform:rotate(-3deg) translateY(-2px)}
.tpp-aurora{animation:tpp-aurora 14s ease-in-out infinite alternate;transform-box:view-box;transform-origin:50% 30%}
@keyframes tpp-aurora{from{transform:translateX(-30px) scaleY(.9);opacity:.55}to{transform:translateX(30px) scaleY(1.1);opacity:.85}}
.tpp-twinkle{animation:tpp-tw 3s ease-in-out infinite alternate}
@keyframes tpp-tw{from{opacity:.25}to{opacity:1}}

.tpp-wide{display:block}
.tpp-wide-i{display:inline}
.tpp-narrow{display:none}
@container tpp (max-width:760px){
.tpp-links{display:none}
.tpp-count{display:block}
.tpp-wide,.tpp-wide-i{display:none}
.tpp-narrow{display:block}
.tpp-postcard{width:min(440px,90cqw);aspect-ratio:auto;height:min(calc(var(--seam) * 100cqh - 120px),620px)}
.tpp-pc-grid{grid-template-columns:1fr;grid-template-rows:auto 1px 1fr;gap:12px}
.tpp-hw{font-size:clamp(13px,3.7cqw,17px)}
.tpp-stop{width:auto}
.tpp-note{font-size:14px}
.tpp-rail{display:none}
.tpp-hero-copy{top:42% !important}
.tpp-hero-eagle{top:9% !important;width:120px !important}
.tpp-hero-note{top:calc(9% + 84px) !important;width:150px !important}
.tpp-squirrel-wrap{top:16% !important;width:84px !important}
}
@container tpp (max-height:560px){
.tpp-hero-h{font-size:clamp(22px,min(4.4cqw,8cqh),60px)}
}
@media (prefers-reduced-motion:reduce){
.tpp-root *,.tpp-root *::before,.tpp-root *::after{animation:none !important;transition:none !important}
.tpp-flake{display:none}
}
`,
  at = (r, e) =>
    "M" +
    f(r[0][0]) +
    " " +
    e +
    " " +
    r.map((a) => "L" + f(a[0]) + " " + f(a[1])).join(" ") +
    " L" +
    f(r[r.length - 1][0]) +
    " " +
    e +
    " Z",
  Zt = (r) =>
    r.map((e, a) => (a ? "L" : "M") + f(e[0]) + " " + f(e[1])).join(" "),
  rt = (r, e, a, s, o, n, p) => {
    const d = O(r)
    let c = ""
    for (let h = e; h < a; h += p * (0.55 + d() * 0.9)) {
      const u = o + d() * (n - o),
        y = u * (0.26 + d() * 0.08),
        x = 5 + Math.floor(d() * 3),
        m = []
      for (let w = 1; w <= x; w++) {
        const j = s - u + (u * 0.9 * w) / x,
          C = y * (0.25 + (0.75 * w) / x) * (0.85 + d() * 0.3)
        m.push([h + C, j]), w < x && m.push([h + C * 0.38, j - u * 0.03])
      }
      const L = [
        [h, s - u],
        ...m,
        [h + y * 0.07, s - u * 0.1],
        [h + y * 0.07, s + 4],
        [h - y * 0.07, s + 4],
        [h - y * 0.07, s - u * 0.1],
      ]
      for (let w = m.length - 1; w >= 0; w--) L.push([2 * h - m[w][0], m[w][1]])
      c += "M" + L.map((w) => f(w[0]) + " " + f(w[1])).join(" L") + " Z "
    }
    return (
      c +
      "M" +
      f(e) +
      " " +
      f(s - 4) +
      " H" +
      f(a + p) +
      " V" +
      f(s + 60) +
      " H" +
      f(e) +
      " Z"
    )
  },
  kt = (r) => r.replace(/[^a-zA-Z0-9_-]/g, "")
function P({ light: r = !1, opacity: e = 0.35 }) {
  return t.jsx("div", {
    className: "tpp-grain",
    "data-light": r ? "" : void 0,
    "aria-hidden": "true",
    style: { opacity: e },
  })
}
function Ht({ seed: r, count: e = 26 }) {
  const a = g.useMemo(() => {
    const s = O(r)
    return Array.from({ length: e }, () => ({
      left: s() * 100,
      fs: 1.5 + s() * 3,
      fd: 9 + s() * 12,
      fl: -s() * 20,
      fx: (s() - 0.5) * 120,
    }))
  }, [r, e])
  return t.jsx("div", {
    className: "tpp-fill",
    "aria-hidden": "true",
    style: { pointerEvents: "none", overflow: "clip" },
    children: a.map((s, o) =>
      t.jsx(
        "span",
        {
          className: "tpp-flake",
          style: {
            left: s.left + "%",
            "--fs": s.fs + "px",
            "--fd": s.fd + "s",
            "--fl": s.fl + "s",
            "--fx": s.fx + "px",
          },
        },
        o,
      ),
    ),
  })
}
const cs = [
  {
    seed: 11,
    base: 290,
    amp: 380,
    top: "#a7afbe",
    bot: "#7f8ca2",
    dp: 3,
    snow: 0.6,
    streaks: 0,
  },
  {
    seed: 23,
    base: 380,
    amp: 360,
    top: "#98806e",
    bot: "#5a6981",
    dp: 6,
    snow: 0.4,
    streaks: 40,
  },
  {
    seed: 37,
    base: 480,
    amp: 320,
    top: "#8a614a",
    bot: "#3d4d69",
    dp: 9,
    snow: 0.2,
    streaks: 70,
  },
  {
    seed: 41,
    base: 590,
    amp: 280,
    top: "#734e3a",
    bot: "#2b3b57",
    dp: 13,
    snow: 0,
    streaks: 80,
  },
  {
    seed: 59,
    base: 720,
    amp: 210,
    top: "#463f45",
    bot: "#1d2a43",
    dp: 18,
    snow: 0,
    streaks: 50,
  },
  {
    seed: 67,
    base: 870,
    amp: 140,
    top: "#222b3d",
    bot: "#111a2c",
    dp: 24,
    snow: 0,
    streaks: 0,
  },
]
function ds({ uid: r }) {
  const e = r + "-hm",
    a = g.useMemo(
      () =>
        cs.map((s) => {
          const o = st(s.seed, -120, 1720, s.base, s.amp, 0.58, 7),
            n = O(s.seed * 7),
            p = []
          for (let d = 0; d < s.streaks; d++) {
            const c = o[Math.floor(n() * o.length)],
              h = 14 + n() * 70,
              u = (n() - 0.5) * 40
            p.push(
              "M" +
                f(c[0]) +
                " " +
                f(c[1] + 3) +
                " Q" +
                f(c[0] + u * 0.3) +
                " " +
                f(c[1] + h * 0.5) +
                " " +
                f(c[0] + u) +
                " " +
                f(c[1] + h),
            )
          }
          return { ...s, d: at(o, 1e3), line: Zt(o), streaks: p.join(" ") }
        }),
      [],
    )
  return t.jsxs("div", {
    className: "tpp-fill",
    "aria-hidden": "true",
    children: [
      t.jsxs("svg", {
        className: "tpp-svg tpp-fill",
        viewBox: "0 0 1600 1000",
        preserveAspectRatio: "xMidYMid slice",
        children: [
          t.jsx("defs", {
            children: t.jsxs("linearGradient", {
              id: e + "-sky",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [
                t.jsx("stop", { offset: "0", stopColor: "#4b5d7a" }),
                t.jsx("stop", { offset: ".45", stopColor: "#8e98a9" }),
                t.jsx("stop", { offset: "1", stopColor: "#b4b7bd" }),
              ],
            }),
          }),
          t.jsx("rect", {
            width: "1600",
            height: "1000",
            fill: "url(#" + e + "-sky)",
          }),
        ],
      }),
      a.map((s, o) =>
        t.jsx(
          "div",
          {
            className: "tpp-par tpp-fill",
            "data-dp": s.dp,
            children: t.jsxs("svg", {
              className: "tpp-svg tpp-fill",
              viewBox: "0 0 1600 1000",
              preserveAspectRatio: "xMidYMid slice",
              style: { overflow: "visible" },
              children: [
                t.jsxs("defs", {
                  children: [
                    t.jsxs("linearGradient", {
                      id: e + "-g" + o,
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        t.jsx("stop", { offset: "0", stopColor: s.top }),
                        t.jsx("stop", { offset: ".55", stopColor: s.bot }),
                      ],
                    }),
                    t.jsxs("linearGradient", {
                      id: e + "-m" + o,
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        t.jsx("stop", {
                          offset: "0",
                          stopColor: "#dfe3ea",
                          stopOpacity: "0",
                        }),
                        t.jsx("stop", {
                          offset: ".5",
                          stopColor: "#dfe3ea",
                          stopOpacity: ".28",
                        }),
                        t.jsx("stop", {
                          offset: "1",
                          stopColor: "#dfe3ea",
                          stopOpacity: "0",
                        }),
                      ],
                    }),
                    t.jsx("clipPath", {
                      id: e + "-c" + o,
                      children: t.jsx("path", { d: s.d }),
                    }),
                  ],
                }),
                t.jsx("path", { d: s.d, fill: "url(#" + e + "-g" + o + ")" }),
                s.streaks
                  ? t.jsx("path", {
                      d: s.streaks,
                      clipPath: "url(#" + e + "-c" + o + ")",
                      fill: "none",
                      stroke: "#1a2436",
                      strokeOpacity: ".2",
                      strokeWidth: "1.3",
                      strokeLinecap: "round",
                    })
                  : null,
                s.snow > 0 &&
                  t.jsx("path", {
                    d: s.line,
                    fill: "none",
                    stroke: "#f4f6f8",
                    strokeOpacity: s.snow,
                    strokeWidth: "2.2",
                    transform: "translate(0 2)",
                  }),
                o < a.length - 1 &&
                  t.jsx("rect", {
                    x: "-200",
                    y: s.base + 20,
                    width: "2000",
                    height: "160",
                    fill: "url(#" + e + "-m" + o + ")",
                  }),
              ],
            }),
          },
          o,
        ),
      ),
    ],
  })
}
function fs({ uid: r, x: e = 1120, y: a = 140, flip: s = !1 }) {
  const o = r + "-ep",
    n = g.useMemo(() => {
      const p = O(Math.round(e * 3 + a)),
        d = [],
        c = 46
      for (let j = 0; j <= c; j++) {
        const C = j / c,
          E = 500 + (e - 500) * C,
          q =
            1e3 -
            (1e3 - a) * Math.pow(C, 1.35) +
            (j && j < c ? (p() - 0.5) * 26 : 0)
        d.push([E, q])
      }
      const h = []
      for (let j = 1; j <= c; j++) {
        const C = j / c,
          E = e + (1760 - e) * C,
          q =
            a +
            (560 - a) * Math.pow(C, 0.75) +
            (j < c ? (p() - 0.5) * 30 : 0) -
            Math.sin(C * Math.PI) * 60
        h.push([E, q])
      }
      const u = []
      for (let j = 0; j <= 20; j++) {
        const C = j / 20
        u.push([
          e + 60 * C + Math.sin(C * 9) * 26 + (p() - 0.5) * 18,
          a + (1e3 - a) * C,
        ])
      }
      const y =
          "M500 1000 " +
          d.map((j) => "L" + f(j[0]) + " " + f(j[1])).join(" ") +
          " " +
          h.map((j) => "L" + f(j[0]) + " " + f(j[1])).join(" ") +
          " L1760 1000 Z",
        x =
          "M" +
          f(e) +
          " " +
          f(a) +
          " " +
          h.map((j) => "L" + f(j[0]) + " " + f(j[1])).join(" ") +
          " L1760 1000 " +
          u
            .slice()
            .reverse()
            .map((j) => "L" + f(j[0]) + " " + f(j[1]))
            .join(" ") +
          " Z",
        m = [],
        L = [...d, ...h]
      for (let j = 0; j < 170; j++) {
        const C = p() < 0.62,
          E = C ? h : d,
          q = E[Math.floor(p() * E.length)],
          F = 40 + p() * 220,
          U = C ? 0.35 + p() * 0.5 : -0.35 - p() * 0.5,
          K = q[0] + U * F * 0.45,
          lt = q[1] + F,
          v = q[0] + U * F * 0.1 + (p() - 0.5) * 30
        m.push({
          d:
            "M" +
            f(q[0]) +
            " " +
            f(q[1] + 6) +
            " Q" +
            f(v) +
            " " +
            f(q[1] + F * 0.5) +
            " " +
            f(K) +
            " " +
            f(lt),
          w: 1 + p() * (C ? 3.4 : 2),
          o: 0.35 + p() * 0.5,
        })
      }
      let w = ""
      for (let j = -400; j < 1400; j += 9)
        w += "M" + (e - 100) + " " + (a + j) + " l900 -330 "
      return { shape: y, shade: x, rocks: m, hatch: w, ridge: Zt(L) }
    }, [e, a])
  return t.jsxs("svg", {
    className: "tpp-svg tpp-fill",
    viewBox: "0 0 1600 1000",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
    style: s ? { transform: "scaleX(-1)" } : void 0,
    children: [
      t.jsxs("defs", {
        children: [
          t.jsx("clipPath", {
            id: o + "-sc",
            children: t.jsx("path", { d: n.shade }),
          }),
          t.jsx("clipPath", {
            id: o + "-mc",
            children: t.jsx("path", { d: n.shape }),
          }),
          t.jsxs("linearGradient", {
            id: o + "-fog",
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
              t.jsx("stop", {
                offset: ".55",
                stopColor: "var(--tpp-fog)",
                stopOpacity: "0",
              }),
              t.jsx("stop", {
                offset: "1",
                stopColor: "var(--tpp-fog)",
                stopOpacity: ".95",
              }),
            ],
          }),
        ],
      }),
      t.jsxs("g", {
        children: [
          t.jsx("path", { d: n.shape, fill: "#f3f1ec" }),
          t.jsx("path", { d: n.shade, fill: "#a7a9ad", fillOpacity: ".55" }),
          t.jsx("path", {
            d: n.hatch,
            clipPath: "url(#" + o + "-sc)",
            stroke: "#3a414e",
            strokeOpacity: ".22",
            strokeWidth: ".9",
          }),
          t.jsx("g", {
            clipPath: "url(#" + o + "-mc)",
            children: n.rocks.map((p, d) =>
              t.jsx(
                "path",
                {
                  d: p.d,
                  fill: "none",
                  stroke: "#2c323c",
                  strokeOpacity: p.o,
                  strokeWidth: p.w,
                  strokeLinecap: "round",
                },
                d,
              ),
            ),
          }),
          t.jsx("path", {
            d: n.ridge,
            fill: "none",
            stroke: "#2c323c",
            strokeOpacity: ".55",
            strokeWidth: "1.4",
          }),
          t.jsx("rect", {
            y: "0",
            width: "1600",
            height: "1000",
            fill: "url(#" + o + "-fog)",
          }),
        ],
      }),
    ],
  })
}
function me({ uid: r, peak: e = !0, forest: a = !1, seed: s = 5 }) {
  const o = r + "-fp" + s,
    n = g.useMemo(
      () => [
        at(st(s * 13, -100, 1700, 520, 160, 0.5, 6), 1e3),
        at(st(s * 17, -100, 1700, 640, 140, 0.5, 6), 1e3),
        rt(s * 19, -40, 620, 1010, 120, 300, 30),
        rt(s * 23, 1180, 1640, 1010, 90, 220, 34),
      ],
      [s],
    )
  return t.jsxs("div", {
    className: "tpp-fill",
    "aria-hidden": "true",
    style: {
      background:
        "linear-gradient(180deg, color-mix(in oklab, var(--tpp-fog) 82%, #fff) 0%, var(--tpp-fog) 70%)",
    },
    children: [
      t.jsxs("svg", {
        className: "tpp-svg tpp-fill",
        viewBox: "0 0 1600 1000",
        preserveAspectRatio: "xMidYMid slice",
        children: [
          t.jsx("defs", {
            children: t.jsxs("linearGradient", {
              id: o,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [
                t.jsx("stop", {
                  offset: "0",
                  stopColor: "#9d9a92",
                  stopOpacity: ".55",
                }),
                t.jsx("stop", {
                  offset: ".6",
                  stopColor: "#9d9a92",
                  stopOpacity: "0",
                }),
              ],
            }),
          }),
          t.jsxs("g", {
            children: [
              t.jsx("path", { d: n[0], fill: "url(#" + o + ")" }),
              t.jsx("path", {
                d: n[1],
                fill: "url(#" + o + ")",
                opacity: ".8",
              }),
              a && t.jsx("path", { d: n[2], fill: "#8d8a84", opacity: ".35" }),
              a && t.jsx("path", { d: n[3], fill: "#8d8a84", opacity: ".28" }),
            ],
          }),
        ],
      }),
      e && t.jsx(fs, { uid: r + s }),
      t.jsx(P, { uid: r, opacity: 0.5 }),
    ],
  })
}
function vt({ uid: r, seed: e = 3, trees: a = !0, flakes: s = !0 }) {
  const o = r + "-np" + e,
    n = g.useMemo(
      () => [
        rt(e * 31, -40, 1640, 1e3, 120, 260, 34),
        rt(e * 37, -40, 1640, 1010, 180, 380, 40),
      ],
      [e],
    )
  return t.jsxs("div", {
    className: "tpp-fill",
    "aria-hidden": "true",
    style: {
      background:
        "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--tpp-navy) 85%, #fff) 0%, var(--tpp-navy) 45%, var(--tpp-deep) 100%)",
    },
    children: [
      a &&
        t.jsxs("svg", {
          className: "tpp-svg tpp-fill",
          viewBox: "0 0 1600 1000",
          preserveAspectRatio: "xMidYMax slice",
          children: [
            t.jsx("defs", {
              children: t.jsxs("linearGradient", {
                id: o,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  t.jsx("stop", {
                    offset: "0",
                    stopColor: "var(--tpp-navy)",
                    stopOpacity: "0",
                  }),
                  t.jsx("stop", {
                    offset: "1",
                    stopColor: "var(--tpp-deep)",
                    stopOpacity: ".9",
                  }),
                ],
              }),
            }),
            t.jsx("g", {
              children: t.jsx("path", {
                d: n[0],
                fill: "color-mix(in oklab, var(--tpp-navy) 70%, #000)",
                opacity: ".55",
              }),
            }),
            t.jsx("rect", {
              y: "700",
              width: "1600",
              height: "300",
              fill: "url(#" + o + ")",
            }),
            t.jsx("g", {
              children: t.jsx("path", { d: n[1], fill: "var(--tpp-deep)" }),
            }),
          ],
        }),
      t.jsx(P, { uid: r, light: !0, opacity: 0.22 }),
      s && t.jsx(Ht, { seed: e * 101 }),
    ],
  })
}
function ue({ uid: r }) {
  const e = r + "-eg"
  return t.jsxs("svg", {
    className: "tpp-svg tpp-eagle",
    viewBox: "0 0 260 200",
    width: "100%",
    height: "100%",
    "aria-hidden": "true",
    children: [
      t.jsxs("defs", {
        children: [
          t.jsxs("linearGradient", {
            id: e + "-w",
            x1: "0",
            y1: "1",
            x2: ".3",
            y2: "0",
            children: [
              t.jsx("stop", { offset: "0", stopColor: "#6e4c33" }),
              t.jsx("stop", { offset: ".6", stopColor: "#3d2a1d" }),
              t.jsx("stop", { offset: "1", stopColor: "#21160f" }),
            ],
          }),
          t.jsxs("linearGradient", {
            id: e + "-b",
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "1",
            children: [
              t.jsx("stop", { offset: "0", stopColor: "#5a3d29" }),
              t.jsx("stop", { offset: "1", stopColor: "#2c1e14" }),
            ],
          }),
        ],
      }),
      t.jsxs("g", {
        className: "tpp-wing tpp-wing-b",
        children: [
          t.jsx("path", {
            d: "M142 96 C152 66 170 36 204 10 L214 6 L209 17 L222 12 L213 25 L228 22 L215 35 L230 37 L214 46 L226 52 L208 56 C192 70 176 86 160 102 Z",
            fill: "#2a1c13",
          }),
          t.jsx("path", {
            d: "M150 92 C162 70 178 50 200 32 M156 96 C170 80 186 64 206 50",
            stroke: "#7a5a40",
            strokeOpacity: ".5",
            fill: "none",
            strokeWidth: "1.2",
          }),
        ],
      }),
      t.jsx("path", {
        d: "M166 110 L214 112 L222 120 L216 128 L222 134 L210 138 L168 128 Z",
        fill: "#efe9dc",
      }),
      t.jsx("path", {
        d: "M180 116 L214 118 M178 124 L212 132",
        stroke: "#b9b0a0",
        strokeWidth: "1",
      }),
      t.jsx("path", {
        d: "M96 96 C112 84 152 88 174 106 C180 118 170 128 150 130 C126 132 104 122 94 108 Z",
        fill: "url(#" + e + "-b)",
      }),
      t.jsx("path", {
        d: "M138 126 L144 146 L152 144 L147 126 Z M126 124 L128 142 L135 142 L134 124 Z",
        fill: "#d9a441",
      }),
      t.jsx("path", {
        d: "M142 146 l-4 4 M146 146 l0 5 M150 145 l4 4 M128 142 l-4 4 M132 142 l0 5",
        stroke: "#3b2a16",
        strokeWidth: "1.6",
        strokeLinecap: "round",
      }),
      t.jsxs("g", {
        className: "tpp-wing",
        children: [
          t.jsx("path", {
            d: "M124 98 C110 62 86 32 50 10 L40 6 L46 18 L32 15 L42 27 L27 28 L41 37 L28 42 L44 48 L34 56 L54 56 C76 70 96 88 114 106 Z",
            fill: "url(#" + e + "-w)",
          }),
          t.jsx("path", {
            d: "M116 92 C100 70 82 52 58 34 M110 98 C92 82 74 70 52 58 M120 86 C108 64 92 44 72 26",
            stroke: "#9a7756",
            strokeOpacity: ".45",
            fill: "none",
            strokeWidth: "1.2",
          }),
        ],
      }),
      t.jsx("path", {
        d: "M100 98 C92 86 78 82 68 88 C60 92 62 102 72 104 C82 108 94 106 102 104 Z",
        fill: "#f2ede2",
      }),
      t.jsx("path", {
        d: "M86 102 C92 104 98 104 102 102",
        stroke: "#cfc6b4",
        fill: "none",
      }),
      t.jsx("path", {
        d: "M68 88 C58 88 52 96 56 104 C58 99 62 97 67 99 Z",
        fill: "#e0a83c",
      }),
      t.jsx("circle", { cx: "76", cy: "92", r: "1.8", fill: "#1a120c" }),
    ],
  })
}
function hs({ uid: r }) {
  const e = r + "-sq",
    a = g.useMemo(() => {
      const s = O(77)
      let o = ""
      for (let n = 0; n < 46; n++) {
        const p = n / 46,
          d = 150 + p * 70,
          c = 152 - p * 10,
          h = (s() < 0.5 ? -1 : 1) * (0.5 + s() * 0.7) - 0.3,
          u = 16 + s() * 16
        o +=
          "M" +
          f(d) +
          " " +
          f(c) +
          " l" +
          f(Math.cos(h) * u) +
          " " +
          f(Math.sin(h) * u) +
          " "
      }
      return o
    }, [])
  return t.jsxs("svg", {
    className: "tpp-svg tpp-squirrel",
    viewBox: "0 0 220 200",
    width: "100%",
    height: "100%",
    "aria-hidden": "true",
    style: { overflow: "visible" },
    children: [
      t.jsx("defs", {
        children: t.jsxs("linearGradient", {
          id: e + "-t",
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "1",
          children: [
            t.jsx("stop", { offset: "0", stopColor: "#c47a48" }),
            t.jsx("stop", { offset: "1", stopColor: "#7c3f1f" }),
          ],
        }),
      }),
      t.jsx("path", {
        d: "M-30 170 C40 160 110 168 230 146",
        stroke: "#4a3426",
        strokeWidth: "9",
        strokeLinecap: "round",
        fill: "none",
      }),
      t.jsx("path", {
        d: "M60 165 C70 186 66 196 58 210",
        stroke: "#4a3426",
        strokeWidth: "5",
        strokeLinecap: "round",
        fill: "none",
      }),
      t.jsx("path", {
        d: a,
        stroke: "#35523f",
        strokeWidth: "2.2",
        strokeLinecap: "round",
      }),
      t.jsx("path", {
        className: "tpp-tail",
        d: "M140 152 C196 146 214 96 198 58 C186 30 154 22 140 42 C128 60 146 72 158 62 C172 52 178 76 168 96 C156 120 132 126 126 148 Z",
        fill: "url(#" + e + "-t)",
      }),
      t.jsx("path", {
        className: "tpp-tail",
        d: "M150 136 C176 120 190 92 182 66 M160 140 C184 128 198 104 194 76",
        stroke: "#e2b98f",
        strokeOpacity: ".5",
        fill: "none",
        strokeWidth: "1.5",
      }),
      t.jsx("path", {
        d: "M96 156 C84 124 96 94 118 88 C142 82 156 106 152 132 C150 148 140 158 122 160 C108 162 98 160 96 156 Z",
        fill: "#a95f37",
      }),
      t.jsx("path", {
        d: "M102 146 C98 124 106 108 118 106 C122 122 118 142 110 152 Z",
        fill: "#ead6b6",
      }),
      t.jsx("ellipse", {
        cx: "95",
        cy: "116",
        rx: "7",
        ry: "8",
        fill: "#6b4022",
      }),
      t.jsx("path", {
        d: "M92 110 C94 106 100 106 101 110",
        stroke: "#3a2412",
        fill: "none",
        strokeWidth: "1.5",
      }),
      t.jsx("path", {
        d: "M100 120 C104 116 110 118 108 124",
        stroke: "#a95f37",
        strokeWidth: "5",
        strokeLinecap: "round",
        fill: "none",
      }),
      t.jsxs("g", {
        className: "tpp-sq-head",
        children: [
          t.jsx("path", {
            d: "M90 94 C82 76 94 60 112 62 C126 64 132 78 126 92 C120 102 100 106 90 94 Z",
            fill: "#a95f37",
          }),
          t.jsx("path", { d: "M110 64 L116 40 L124 64 Z", fill: "#8b4a27" }),
          t.jsx("path", {
            d: "M116 40 l-3 -8 M116 40 l3 -9 M116 40 l0 -10",
            stroke: "#5a2f17",
            strokeWidth: "1.4",
            strokeLinecap: "round",
          }),
          t.jsx("circle", { cx: "104", cy: "78", r: "3.4", fill: "#1a110a" }),
          t.jsx("circle", { cx: "105.2", cy: "76.8", r: "1", fill: "#fff" }),
          t.jsx("circle", { cx: "88", cy: "88", r: "2.2", fill: "#2a1a10" }),
          t.jsx("path", {
            d: "M92 94 C96 98 102 98 106 96",
            stroke: "#ead6b6",
            fill: "none",
            strokeWidth: "1.5",
          }),
        ],
      }),
      t.jsx("path", {
        d: "M110 160 C112 166 122 166 126 160",
        fill: "#7c3f1f",
      }),
    ],
  })
}
function Dt({ seed: r = 9 }) {
  const e = g.useMemo(() => {
      const s = O(r),
        o = [
          [
            [-10, 30],
            [80, 50],
            [160, 70],
            [310, 150],
          ],
          [
            [120, 62],
            [150, 40],
            [180, 30],
            [215, 22],
          ],
          [
            [200, 108],
            [222, 126],
            [238, 150],
            [248, 188],
          ],
          [
            [60, 45],
            [70, 80],
            [62, 110],
            [48, 140],
          ],
        ],
        p = ["#2c4637", "#37583f", "#22382c", "#466a52", "#2f4c3a"].map(
          (d) => ({ d: "", c: d }),
        )
      for (const [d, c, h, u] of o)
        for (let y = 0; y <= 34; y++) {
          const x = y / 34,
            m = 1 - x,
            L =
              m * m * m * d[0] +
              3 * m * m * x * c[0] +
              3 * m * x * x * h[0] +
              x * x * x * u[0],
            w =
              m * m * m * d[1] +
              3 * m * m * x * c[1] +
              3 * m * x * x * h[1] +
              x * x * x * u[1],
            j =
              3 * m * m * (c[0] - d[0]) +
              6 * m * x * (h[0] - c[0]) +
              3 * x * x * (u[0] - h[0]),
            C =
              3 * m * m * (c[1] - d[1]) +
              6 * m * x * (h[1] - c[1]) +
              3 * x * x * (u[1] - h[1]),
            E = Math.atan2(C, j)
          for (const q of [-1, 1])
            for (let F = 0; F < 2; F++) {
              const U = E + q * (0.55 + s() * 0.6),
                K = 18 + s() * 18,
                lt = p[Math.floor(s() * p.length)]
              lt.d +=
                "M" +
                f(L) +
                " " +
                f(w) +
                " l" +
                f(Math.cos(U) * K) +
                " " +
                f(Math.sin(U) * K) +
                " "
            }
        }
      return {
        twigs: o.map(
          ([d, c, h, u]) =>
            "M" +
            d.join(" ") +
            " C" +
            c.join(" ") +
            " " +
            h.join(" ") +
            " " +
            u.join(" "),
        ),
        needles: p,
      }
    }, [r]),
    a = (s, o, n) =>
      t.jsxs("g", {
        transform: "translate(" + s + " " + o + ") rotate(" + n + ")",
        children: [
          t.jsx("ellipse", { rx: "13", ry: "22", fill: "#8a5a34" }),
          [-14, -6, 2, 10].map((p) =>
            t.jsx(
              "path",
              {
                d: "M-12 " + p + " Q0 " + (p + 7) + " 12 " + p,
                stroke: "#5b3a1f",
                strokeWidth: "1.6",
                fill: "none",
              },
              p,
            ),
          ),
          t.jsx("path", {
            d: "M0 -22 L0 22",
            stroke: "#5b3a1f",
            strokeWidth: "1",
            opacity: ".6",
          }),
        ],
      })
  return t.jsxs("svg", {
    className: "tpp-svg",
    viewBox: "-20 0 340 230",
    width: "100%",
    height: "100%",
    "aria-hidden": "true",
    style: { overflow: "visible" },
    children: [
      e.twigs.map((s, o) =>
        t.jsx(
          "path",
          {
            d: s,
            stroke: "#4a3426",
            strokeWidth: o ? 3.5 : 6,
            strokeLinecap: "round",
            fill: "none",
          },
          o,
        ),
      ),
      e.needles.map((s, o) =>
        t.jsx(
          "path",
          { d: s.d, stroke: s.c, strokeWidth: "2.3", strokeLinecap: "round" },
          o,
        ),
      ),
      a(214, 128, -18),
      a(240, 150, 12),
      a(96, 92, 8),
    ],
  })
}
function ve({ kind: r = "dawn", seed: e = 1 }) {
  const a = kt(g.useId()) + "-sc",
    s = g.useMemo(() => {
      const h = at(st(e * 11 + 1, -20, 420, 150, 90, 0.55, 6), 300),
        u = at(st(e * 11 + 2, -20, 420, 190, 80, 0.55, 6), 300),
        y = at(st(e * 11 + 3, -20, 420, 230, 60, 0.5, 6), 300),
        x = rt(e * 5 + 1, -10, 410, 300, 50, 120, 20),
        m = rt(e * 5 + 2, -10, 410, 230, 26, 56, 14),
        L = O(e * 3),
        w = Array.from({ length: 40 }, () => [
          L() * 400,
          L() * 150,
          0.4 + L() * 1.1,
        ])
      return { r1: h, r2: u, r3: y, t1: x, t2: m, stars: w }
    }, [e]),
    o = (c) => "url(#" + a + c + ")",
    n = (c) =>
      t.jsx("linearGradient", {
        id: a + "s",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        children: c.map(([h, u]) =>
          t.jsx("stop", { offset: h, stopColor: u }, h),
        ),
      })
  let p = null,
    d = null
  return (
    r === "dawn"
      ? ((d = n([
          [0, "#7d86a8"],
          [0.45, "#e9b7a6"],
          [0.75, "#f4d6b8"],
        ])),
        (p = t.jsxs(t.Fragment, {
          children: [
            t.jsx("path", { d: s.r1, fill: "#8e7f9c" }),
            t.jsx("path", { d: s.r2, fill: "#5f6488" }),
            t.jsx("rect", {
              y: "200",
              width: "400",
              height: "40",
              fill: "#f3e2d0",
              opacity: ".35",
            }),
            t.jsx("path", { d: s.r3, fill: "#3c4466" }),
            t.jsx("path", { d: s.t1, fill: "#262c45" }),
          ],
        })))
      : r === "lake"
        ? ((d = n([
            [0, "#b8cbe0"],
            [0.6, "#e9eef3"],
            [1, "#ffffff"],
          ])),
          (p = t.jsxs(t.Fragment, {
            children: [
              t.jsx("path", { d: s.r1, fill: "#c9d3df" }),
              t.jsx("path", { d: s.t2, fill: "#4a5a6e" }),
              t.jsx("rect", {
                y: "228",
                width: "400",
                height: "80",
                fill: "#f4f7fa",
              }),
              t.jsx("ellipse", {
                cx: "200",
                cy: "262",
                rx: "230",
                ry: "26",
                fill: "#a9c5dc",
              }),
              t.jsx("path", {
                d: "M60 262 l40 -6 l30 10 M220 255 l50 8 l40 -5 M150 270 l30 -4",
                stroke: "#e8f1f8",
                strokeWidth: "1.5",
                fill: "none",
              }),
              [120, 160, 200, 250, 290].map((c, h) =>
                t.jsxs(
                  "g",
                  {
                    transform:
                      "translate(" + c + " " + (258 + (h % 2) * 6) + ")",
                    children: [
                      t.jsx("ellipse", { rx: "7", ry: "3.2", fill: "#fff" }),
                      t.jsx("path", {
                        d: "M4 -1 q3 -8 6 -9",
                        stroke: "#fff",
                        strokeWidth: "2",
                        fill: "none",
                      }),
                    ],
                  },
                  c,
                ),
              ),
            ],
          })))
        : r === "sun"
          ? ((d = t.jsxs(t.Fragment, {
              children: [
                n([
                  [0, "#c8a77a"],
                  [0.5, "#f1d39c"],
                  [1, "#e9c58c"],
                ]),
                t.jsxs("radialGradient", {
                  id: a + "sun",
                  children: [
                    t.jsx("stop", { offset: "0", stopColor: "#fff8e2" }),
                    t.jsx("stop", {
                      offset: ".25",
                      stopColor: "#ffe9b0",
                      stopOpacity: ".9",
                    }),
                    t.jsx("stop", {
                      offset: "1",
                      stopColor: "#ffe9b0",
                      stopOpacity: "0",
                    }),
                  ],
                }),
              ],
            })),
            (p = t.jsxs(t.Fragment, {
              children: [
                t.jsx("circle", {
                  cx: "210",
                  cy: "150",
                  r: "120",
                  fill: o("sun"),
                }),
                t.jsx("path", { d: s.t2, fill: "#9c7a55", opacity: ".55" }),
                t.jsx("rect", {
                  y: "228",
                  width: "400",
                  height: "80",
                  fill: "#e4c38f",
                }),
                t.jsx("ellipse", {
                  cx: "210",
                  cy: "250",
                  rx: "60",
                  ry: "8",
                  fill: "#fff4d6",
                  opacity: ".7",
                }),
                t.jsx("path", { d: s.t1, fill: "#6b5137", opacity: ".7" }),
              ],
            })))
          : r === "forest"
            ? ((d = n([
                [0, "#c5ccd6"],
                [1, "#eef1f4"],
              ])),
              (p = t.jsxs(t.Fragment, {
                children: [
                  t.jsx("path", { d: s.t2, fill: "#8d99a8" }),
                  t.jsx("path", { d: s.t1, fill: "#33433f" }),
                  t.jsx("path", {
                    d: s.t1,
                    fill: "none",
                    stroke: "#fff",
                    strokeOpacity: ".75",
                    strokeWidth: "1.4",
                    strokeDasharray: "3 9",
                  }),
                  t.jsx("rect", {
                    y: "290",
                    width: "400",
                    height: "10",
                    fill: "#f5f7f9",
                  }),
                ],
              })))
            : r === "peak"
              ? ((d = n([
                  [0, "#4f7fb8"],
                  [1, "#b8d0ea"],
                ])),
                (p = t.jsxs(t.Fragment, {
                  children: [
                    t.jsx("path", {
                      d: "M60 300 L200 60 L250 120 L280 95 L380 300 Z",
                      fill: "#f6f8fb",
                    }),
                    t.jsx("path", {
                      d: "M200 60 L215 300 L380 300 L280 95 L250 120 Z",
                      fill: "#b6c3d4",
                    }),
                    t.jsx("path", {
                      d: "M200 60 L188 120 M200 60 L230 150 M250 120 L262 190 M280 95 L300 170",
                      stroke: "#57667a",
                      strokeWidth: "2.4",
                      strokeLinecap: "round",
                      opacity: ".6",
                    }),
                    t.jsx("path", { d: s.r3, fill: "#e9eef4" }),
                    t.jsx("path", { d: s.t1, fill: "#2e3e52", opacity: ".9" }),
                  ],
                })))
              : r === "river"
                ? ((d = n([
                    [0, "#a7b6c6"],
                    [1, "#e2d6c2"],
                  ])),
                  (p = t.jsxs(t.Fragment, {
                    children: [
                      t.jsx("path", { d: s.r1, fill: "#8c7a6a" }),
                      t.jsx("path", { d: s.r2, fill: "#a0623c" }),
                      t.jsx("path", { d: s.r3, fill: "#6c4a34" }),
                      t.jsx("path", {
                        d: "M150 300 C190 270 170 250 210 232 C240 220 230 210 260 204",
                        stroke: "#c9dbe8",
                        strokeWidth: "10",
                        fill: "none",
                        strokeLinecap: "round",
                      }),
                    ],
                  })))
                : ((d = t.jsxs(t.Fragment, {
                    children: [
                      n([
                        [0, "#0f1830"],
                        [1, "#2a3b5c"],
                      ]),
                      t.jsxs("linearGradient", {
                        id: a + "au",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                          t.jsx("stop", {
                            offset: "0",
                            stopColor: "#7cf0c4",
                            stopOpacity: "0",
                          }),
                          t.jsx("stop", {
                            offset: ".6",
                            stopColor: "#7cf0c4",
                            stopOpacity: ".55",
                          }),
                          t.jsx("stop", {
                            offset: "1",
                            stopColor: "#7cf0c4",
                            stopOpacity: "0",
                          }),
                        ],
                      }),
                    ],
                  })),
                  (p = t.jsxs(t.Fragment, {
                    children: [
                      s.stars.map(([c, h, u], y) =>
                        t.jsx(
                          "circle",
                          { cx: c, cy: h, r: u, fill: "#fff", opacity: ".8" },
                          y,
                        ),
                      ),
                      t.jsx("path", {
                        d: "M-20 120 C80 40 180 140 260 70 C320 20 380 80 420 50 L420 150 C360 170 300 120 240 160 C160 210 80 120 -20 190 Z",
                        fill: o("au"),
                      }),
                      t.jsx("path", { d: s.r2, fill: "#1d2a45" }),
                      t.jsx("path", { d: s.t1, fill: "#0c1426" }),
                    ],
                  }))),
    t.jsxs("svg", {
      className: "tpp-svg tpp-fill",
      viewBox: "0 0 400 300",
      preserveAspectRatio: "xMidYMid slice",
      "aria-hidden": "true",
      children: [
        t.jsx("defs", { children: d }),
        t.jsx("rect", { width: "400", height: "300", fill: o("s") }),
        p,
      ],
    })
  )
}
function Pt({ src: r, kind: e, seed: a, alt: s }) {
  return t.jsx("div", {
    className: "relative overflow-clip",
    style: { position: "absolute", inset: 0 },
    children: r
      ? t.jsx("img", {
          src: r,
          alt: s || "",
          className: "tpp-fill",
          style: { objectFit: "cover", maxWidth: "none" },
          draggable: !1,
        })
      : t.jsx(ve, { kind: e, seed: a }),
  })
}
function xs() {
  return t.jsxs("svg", {
    className: "tpp-svg tpp-fill",
    viewBox: "0 0 80 100",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
    children: [
      t.jsx("rect", { width: "80", height: "100", fill: "#cfdceb" }),
      t.jsx("path", {
        d: "M0 70 C20 62 50 66 80 60 L80 100 L0 100 Z",
        fill: "#f5f8fb",
      }),
      t.jsx("path", {
        d: "M0 58 l10 -18 l8 12 l10 -22 l12 20 l8 -10 l10 16 l10 -12 l12 18 L80 70 L0 70 Z",
        fill: "#7b8ba0",
        opacity: ".6",
      }),
      t.jsx("path", {
        d: "M22 100 C22 78 30 66 40 66 C50 66 58 78 58 100 Z",
        fill: "#c2392f",
      }),
      t.jsx("path", {
        d: "M40 66 L40 100",
        stroke: "#8f2219",
        strokeWidth: "1.2",
      }),
      t.jsx("path", {
        d: "M56 80 C62 72 64 62 62 54",
        stroke: "#c2392f",
        strokeWidth: "7",
        strokeLinecap: "round",
        fill: "none",
      }),
      t.jsx("circle", { cx: "62", cy: "52", r: "3.5", fill: "#e8c1a0" }),
      t.jsx("circle", { cx: "40", cy: "54", r: "10", fill: "#e8c1a0" }),
      t.jsx("path", {
        d: "M30 52 C30 40 50 40 50 52 C46 47 34 47 30 52 Z",
        fill: "#2e3e5c",
      }),
      t.jsx("circle", { cx: "40", cy: "40", r: "3", fill: "#f2efe7" }),
      t.jsx("path", {
        d: "M31 54 C30 64 34 70 36 72 M49 54 C50 64 46 70 44 72",
        stroke: "#6a4630",
        strokeWidth: "2.5",
        fill: "none",
      }),
      t.jsx("circle", { cx: "36.5", cy: "55", r: "1", fill: "#2a1d14" }),
      t.jsx("circle", { cx: "43.5", cy: "55", r: "1", fill: "#2a1d14" }),
      t.jsx("path", {
        d: "M37 59 Q40 61 43 59",
        stroke: "#a5523e",
        strokeWidth: "1",
        fill: "none",
      }),
    ],
  })
}
function Yt({
  children: r,
  w: e = 70,
  h: a = 86,
  color: s = "#f7f3ea",
  label: o,
}) {
  const n = kt(g.useId()),
    p = [],
    d = 7
  for (let c = d / 2; c < e; c += d)
    p.push(
      t.jsx("circle", { cx: c, cy: 0, r: 2.4 }, "t" + c),
      t.jsx("circle", { cx: c, cy: a, r: 2.4 }, "b" + c),
    )
  for (let c = d / 2; c < a; c += d)
    p.push(
      t.jsx("circle", { cx: 0, cy: c, r: 2.4 }, "l" + c),
      t.jsx("circle", { cx: e, cy: c, r: 2.4 }, "r" + c),
    )
  return t.jsxs("div", {
    style: {
      position: "relative",
      width: e,
      height: a,
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,.25))",
    },
    children: [
      t.jsxs("svg", {
        className: "tpp-svg",
        width: e,
        height: a,
        viewBox: "0 0 " + e + " " + a,
        style: { position: "absolute", inset: 0 },
        "aria-hidden": "true",
        children: [
          t.jsx("defs", {
            children: t.jsxs("mask", {
              id: n,
              children: [
                t.jsx("rect", { width: e, height: a, fill: "#fff" }),
                t.jsx("g", { fill: "#000", children: p }),
              ],
            }),
          }),
          t.jsx("rect", {
            width: e,
            height: a,
            fill: s,
            mask: "url(#" + n + ")",
          }),
        ],
      }),
      t.jsx("div", {
        style: { position: "absolute", inset: 6, overflow: "clip" },
        children: r,
      }),
      o &&
        t.jsx("span", {
          className: "tpp-serif",
          style: {
            position: "absolute",
            left: 8,
            bottom: 7,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".1em",
            color: "#fff",
            textShadow: "0 1px 2px rgba(0,0,0,.4)",
          },
          children: o,
        }),
    ],
  })
}
function ms({ mark: r, since: e }) {
  return t.jsxs("svg", {
    className: "tpp-svg",
    width: "46",
    height: "54",
    viewBox: "0 0 46 54",
    "aria-hidden": "true",
    children: [
      t.jsx("rect", {
        x: "1",
        y: "1",
        width: "44",
        height: "52",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.2",
      }),
      t.jsx("rect", {
        x: "4",
        y: "4",
        width: "38",
        height: "30",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: ".7",
      }),
      t.jsx("path", {
        d: "M7 31 L16 17 L21 24 L27 13 L39 31 Z",
        fill: "currentColor",
        opacity: ".85",
      }),
      t.jsx("path", {
        d: "M27 13 L24 18 L27 17 L30 19 Z M16 17 L14 21 L17 20 Z",
        fill: "#fff",
        opacity: ".9",
      }),
      t.jsx("text", {
        x: "23",
        y: "44",
        textAnchor: "middle",
        fontSize: "8",
        fontWeight: "700",
        letterSpacing: "1.5",
        fill: "currentColor",
        fontFamily: "Georgia,serif",
        children: r,
      }),
      t.jsx("text", {
        x: "23",
        y: "50.5",
        textAnchor: "middle",
        fontSize: "4.2",
        letterSpacing: ".8",
        fill: "currentColor",
        fontFamily: "Georgia,serif",
        children: "EST. " + e,
      }),
    ],
  })
}
function ge({ text: r, date: e }) {
  const a = kt(g.useId())
  return t.jsxs("svg", {
    className: "tpp-svg",
    width: "120",
    height: "78",
    viewBox: "0 0 120 78",
    "aria-hidden": "true",
    style: { color: "#3b4f7a" },
    children: [
      t.jsx("defs", {
        children: t.jsx("path", {
          id: a,
          d: "M14 39 a25 25 0 1 1 50 0 a25 25 0 1 1 -50 0",
        }),
      }),
      t.jsx("circle", {
        cx: "39",
        cy: "39",
        r: "31",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.6",
      }),
      t.jsx("circle", {
        cx: "39",
        cy: "39",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1",
      }),
      t.jsx("text", {
        fontSize: "7.5",
        letterSpacing: "2",
        fill: "currentColor",
        fontFamily: "Georgia,serif",
        fontWeight: "700",
        children: t.jsx("textPath", { href: "#" + a, children: r }),
      }),
      t.jsx("text", {
        x: "39",
        y: "42",
        textAnchor: "middle",
        fontSize: "7",
        fill: "currentColor",
        fontFamily: "Georgia,serif",
        fontWeight: "700",
        children: e,
      }),
      [30, 39, 48].map((s) =>
        t.jsx(
          "path",
          {
            d: "M72 " + s + " q8 -5 16 0 t16 0 t16 0",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.4",
          },
          s,
        ),
      ),
    ],
  })
}
function us() {
  return t.jsxs("svg", {
    className: "tpp-svg",
    width: "64",
    height: "64",
    viewBox: "-32 -32 64 64",
    "aria-hidden": "true",
    children: [
      t.jsx("circle", {
        r: "27",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: ".8",
      }),
      t.jsx("circle", {
        r: "22",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: ".5",
        strokeDasharray: "1 3",
      }),
      t.jsx("path", {
        d: "M0 -26 L5 0 L0 26 L-5 0 Z",
        fill: "currentColor",
        opacity: ".25",
      }),
      t.jsx("path", { d: "M0 -26 L5 0 L-5 0 Z", fill: "currentColor" }),
      t.jsx("path", {
        d: "M-26 0 L0 4 L26 0 L0 -4 Z",
        fill: "currentColor",
        opacity: ".35",
      }),
      t.jsx("text", {
        y: "-29",
        textAnchor: "middle",
        fontSize: "7",
        fontFamily: "Georgia,serif",
        fill: "currentColor",
        style: { fontWeight: 700 },
        children: "N",
      }),
    ],
  })
}
function gs({ seed: r = 4 }) {
  const e = g.useMemo(() => {
    const a = O(r),
      s = [
        [260, 300],
        [1180, 220],
        [820, 760],
      ],
      o = []
    for (const [n, p] of s) {
      const d = [a() * 6.28, a() * 6.28, a() * 6.28]
      for (let c = 1; c <= 11; c++) {
        const h = c * 34,
          u = []
        for (let y = 0; y < 64; y++) {
          const x = (y / 64) * Math.PI * 2,
            m =
              1 +
              0.16 * Math.sin(x * 2 + d[0]) +
              0.08 * Math.sin(x * 3 + d[1] + c * 0.2) +
              0.05 * Math.sin(x * 5 + d[2])
          u.push([n + Math.cos(x) * h * m * 1.25, p + Math.sin(x) * h * m])
        }
        o.push({ d: Zt(u) + " Z", major: c % 4 === 0 })
      }
    }
    return o
  }, [r])
  return t.jsxs("svg", {
    className: "tpp-svg tpp-fill",
    viewBox: "0 0 1600 1000",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
    children: [
      Array.from({ length: 9 }, (a, s) =>
        t.jsx(
          "path",
          {
            d: "M" + (s + 1) * 160 + " 0 V1000 M0 " + (s + 1) * 110 + " H1600",
            stroke: "var(--tpp-ink)",
            strokeOpacity: ".07",
          },
          "g" + s,
        ),
      ),
      e.map((a, s) =>
        t.jsx(
          "path",
          {
            d: a.d,
            fill: "none",
            stroke: "#7a6a52",
            strokeOpacity: a.major ? 0.38 : 0.18,
            strokeWidth: a.major ? 1.6 : 1,
          },
          s,
        ),
      ),
      t.jsx("path", {
        d: "M-20 640 C200 600 300 700 520 660 C700 630 760 520 980 560 C1180 600 1300 470 1640 520",
        fill: "none",
        stroke: "#8fb0c9",
        strokeWidth: "5",
        strokeOpacity: ".55",
        strokeLinecap: "round",
      }),
      t.jsx("path", {
        d: "M1320 760 C1380 700 1500 720 1520 780 C1540 850 1420 880 1360 850 C1310 826 1290 800 1320 760 Z",
        fill: "#a9c5dc",
        fillOpacity: ".45",
        stroke: "#8fb0c9",
      }),
    ],
  })
}
function xt({
  index: r,
  seam: e,
  seed: a,
  label: s,
  last: o,
  setRef: n,
  uid: p,
  upperBg: d,
  upper: c,
  lowerBg: h,
  lower: u,
}) {
  const y = g.useMemo(() => {
    const m = ts(a, 84, 16),
      L = pe(a + 1, 84, 6, 22),
      w = pe(a + 2, 84, 4, 16)
    return {
      upper: Et(m, e),
      upperFib: Et(m, e, L),
      upperShade: Et(
        m,
        e,
        L.map((j) => j + 7),
      ),
      lower: Tt(m, e),
      lowerFib: Tt(m, e, w),
      lowerShade: Tt(
        m,
        e,
        w.map((j) => j + 5),
      ),
    }
  }, [a, e])
  return t.jsx("div", {
    ref: (x) => n(r, x),
    className: "tpp-ch",
    "data-on": r === 0 ? "" : void 0,
    "data-seam": o ? 1 : e,
    role: "region",
    "aria-label": s,
    style: { "--seam": o ? 1 : e, zIndex: 10 - r },
    children: t.jsxs("div", {
      className: "tpp-in",
      children: [
        !o &&
          t.jsxs("div", {
            className: "tpp-lo",
            children: [
              t.jsx("div", {
                className: "tpp-shade",
                style: { clipPath: y.lowerShade },
              }),
              t.jsx("div", {
                className: "tpp-fib",
                style: { clipPath: y.lowerFib },
                children: t.jsx(P, { uid: p, opacity: 0.4 }),
              }),
              t.jsx("div", {
                className: "tpp-sh",
                style: { clipPath: y.lower },
                children: t.jsxs("div", {
                  className: "tpp-box",
                  children: [
                    h,
                    t.jsx("div", { className: "tpp-lb", children: u }),
                  ],
                }),
              }),
            ],
          }),
        t.jsxs("div", {
          className: "tpp-up",
          children: [
            !o &&
              t.jsx("div", {
                className: "tpp-shade",
                style: { clipPath: y.upperShade },
              }),
            !o &&
              t.jsx("div", {
                className: "tpp-fib",
                style: { clipPath: y.upperFib },
                children: t.jsx(P, { uid: p, opacity: 0.4 }),
              }),
            t.jsx("div", {
              className: "tpp-sh",
              style: o ? void 0 : { clipPath: y.upper },
              children: t.jsxs("div", {
                className: "tpp-box",
                children: [
                  d,
                  t.jsx("div", { className: "tpp-ub", children: c }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  })
}
function W({ d: r = 0, r: e = 0, className: a = "", style: s, children: o }) {
  return t.jsx("div", {
    className: "tpp-pop " + a,
    "data-d": r,
    "data-r": e,
    style: s,
    children: o,
  })
}
function je(r, e, a, s) {
  const o = Number(r.dataset.seam) || 1,
    n = r.firstElementChild
  if (!n) return
  const p = n.querySelector(":scope > .tpp-lo"),
    d = n.querySelector(":scope > .tpp-up")
  ;(n.style.transform = a < 1 ? "translateY(" + f((1 - a) * 3) + "%)" : ""),
    d &&
      (d.style.transform =
        e > 0
          ? "translateY(" +
            f(-e * (o * (s + 80) + 70)) +
            "px) rotate(" +
            (-1.4 * e).toFixed(3) +
            "deg)"
          : ""),
    p &&
      (p.style.transform =
        e > 0
          ? "translateY(" +
            f(e * ((1 - o) * (s + 80) + 80)) +
            "px) rotate(" +
            (1 * e).toFixed(3) +
            "deg)"
          : ""),
    r.querySelectorAll(".tpp-pop").forEach((c) => {
      const h = c,
        u = pt((a - (Number(h.dataset.d) || 0)) * 2.6, 0, 1)
      u >= 1
        ? ((h.style.opacity = ""), (h.style.transform = ""))
        : ((h.style.opacity = u.toFixed(3)),
          (h.style.transform =
            "translateY(" +
            f((1 - u) * 46) +
            "px) rotate(" +
            f((1 - u) * (Number(h.dataset.r) || 0)) +
            "deg) scale(" +
            (0.94 + 0.06 * u).toFixed(3) +
            ")"))
    })
}
function ys({
  name: r = "Kedhareswer",
  role: e = "Product designer & front-end developer",
  location: a = "Hyderabad, India",
  since: s = "2019",
  headline: o = ["How to build things", "that feel like home?"],
  intro: n = "Calm, careful products for people who would rather be outside.",
  note: p,
  about: d = he,
  projects: c = de,
  route: h = fe,
  email: u = "hello@example.com",
  links: y = ns,
  labels: x = ["Cover", "About", "Work", "Route", "Write"],
  workTitle: m = "Work — field notes",
  routeTitle: L = "The route so far",
  contactTitle: w = "Write me a postcard",
  palette: j,
  scrollPerChapter: C = 1.4,
  smooth: E = !0,
  snap: q = !0,
  animateIn: F = !0,
  snow: U = !0,
  height: K = "100svh",
  className: lt = "",
}) {
  const v = kt(g.useId()),
    k = {
      navy: "#24375a",
      deep: "#14213a",
      fog: "#d5d0c3",
      paper: "#f2ede2",
      ink: "#26364f",
      accent: "#b4673d",
      tape: "#a9c1d6",
      ...j,
    },
    Q = { ...he, ...d },
    V = c.length ? c : de,
    J = h.length ? h : fe,
    It = as(r),
    wt = g.useRef(null),
    mt = g.useRef(null),
    Y = g.useRef(null),
    Nt = g.useRef([]),
    ct = g.useCallback((i, l) => {
      Nt.current[i] = l
    }, []),
    [Ct, ke] = g.useState(0),
    [we, Ne] = g.useState(!1),
    H = we
  g.useEffect(() => {
    const i = window.matchMedia("(prefers-reduced-motion: reduce)"),
      l = () => Ne(i.matches)
    return (
      l(),
      i.addEventListener("change", l),
      () => i.removeEventListener("change", l)
    )
  }, []),
    g.useEffect(() => {
      var ne
      const i = Nt.current
      if (H) {
        ;(ne = Y.current) == null || ne.setAttribute("data-tone", "dark"),
          i.forEach((S) => {
            S &&
              (je(S, 0, 1, 0),
              S.setAttribute("data-on", ""),
              (S.inert = !1),
              S.removeAttribute("aria-hidden"))
          })
        return
      }
      let l = 0,
        b = 0,
        M = 0,
        R = performance.now(),
        z = -1,
        I = -1,
        B = window.scrollY,
        et = 1,
        G = !1,
        _ = 0
      const $t = () =>
          (Y.current ? Y.current.offsetHeight : window.innerHeight) * C,
        te = () => {
          const S = mt.current
          S && (l = pt(-S.getBoundingClientRect().top / $t(), 0, yt - 1))
        },
        ht = i.map(() => ({ s: -1, p: -1 })),
        ee = (S) => {
          const T = es(S, yt, xe),
            Rt = Y.current ? Y.current.offsetHeight : window.innerHeight
          T.chapters.forEach((D, X) => {
            const bt = i[X]
            if (
              !bt ||
              (D.on
                ? bt.setAttribute("data-on", "")
                : bt.removeAttribute("data-on"),
              !D.on && ht[X].s === 0 && ht[X].p === 0)
            )
              return
            const Ot = D.on ? D.s : 0,
              Ft = D.on ? D.p : 0
            ;(ht[X].s === Ot && ht[X].p === Ft) ||
              ((ht[X] = { s: Ot, p: Ft }), je(bt, Ot, Ft, Rt))
          })
          const Bt = T.split > 0.82 ? T.k + 1 : T.k
          Bt !== I &&
            Y.current &&
            ((I = Bt), Y.current.setAttribute("data-tone", ps[Bt] || "dark")),
            T.active !== z &&
              ((z = T.active),
              i.forEach((D, X) => {
                D &&
                  ((D.inert = X !== z),
                  X !== z
                    ? D.setAttribute("aria-hidden", "true")
                    : D.removeAttribute("aria-hidden"))
              }),
              ke(z))
        },
        se = (S) => {
          const T = Math.min(64, S - R)
          ;(R = S),
            (b = E ? b + (l - b) * (1 - Math.exp(-T / 110)) : l),
            Math.abs(l - b) < 4e-4 && (b = l),
            ee(b),
            (M = b !== l ? requestAnimationFrame(se) : 0)
        },
        At = () => {
          te(), M || ((R = performance.now()), (M = requestAnimationFrame(se)))
        },
        ae = () => {
          if (!q || G) return
          const S = mt.current
          if (!S) return
          const T = ss(l, yt, xe, et)
          if (T === null) return
          const Rt = S.getBoundingClientRect().top + window.scrollY + T * $t()
          window.scrollTo({ top: Math.ceil(Rt) + 1, behavior: "smooth" })
        },
        re = () => {
          const S = window.scrollY
          S !== B && (et = S > B ? 1 : -1),
            (B = S),
            At(),
            window.clearTimeout(_),
            (_ = window.setTimeout(ae, 170))
        },
        oe = () => {
          G = !0
        },
        ie = () => {
          ;(G = !1), window.clearTimeout(_), (_ = window.setTimeout(ae, 260))
        }
      return (
        te(),
        (b = l),
        ee(b),
        addEventListener("scroll", re, { passive: !0 }),
        addEventListener("resize", At),
        addEventListener("touchstart", oe, { passive: !0 }),
        addEventListener("touchend", ie, { passive: !0 }),
        () => {
          cancelAnimationFrame(M),
            window.clearTimeout(_),
            removeEventListener("scroll", re),
            removeEventListener("resize", At),
            removeEventListener("touchstart", oe),
            removeEventListener("touchend", ie)
        }
      )
    }, [H, E, q, C]),
    g.useEffect(() => {
      const i = wt.current
      if (!i) return
      const l = (b, M, R) => {
        const z = document.createElement("canvas")
        z.width = z.height = 128
        const I = z.getContext("2d")
        if (!I) return "none"
        const B = I.createImageData(128, 128),
          et = O(R)
        for (let G = 0; G < B.data.length; G += 4) {
          const _ = et()
          ;(B.data[G] = b[0]),
            (B.data[G + 1] = b[1]),
            (B.data[G + 2] = b[2]),
            (B.data[G + 3] = Math.round(_ * _ * _ * M))
        }
        return I.putImageData(B, 0, 0), "url(" + z.toDataURL() + ")"
      }
      i.style.setProperty("--tpp-gd", l([40, 32, 24], 46, 1)),
        i.style.setProperty("--tpp-gl", l([255, 255, 255], 44, 2))
    }, []),
    g.useEffect(() => {
      const i = wt.current
      if (!i || H) return
      let l = 0,
        b = 0,
        M = 0
      const R = (z) => {
        z.pointerType === "mouse" &&
          ((b = (z.clientX / window.innerWidth) * 2 - 1),
          (M = (z.clientY / window.innerHeight) * 2 - 1),
          l ||
            (l = requestAnimationFrame(() => {
              ;(l = 0),
                i.querySelectorAll(".tpp-ch[data-on] .tpp-par").forEach((I) => {
                  const B = I,
                    et = Number(B.dataset.dp) || 0
                  B.style.transform =
                    "translate3d(" +
                    f(b * et) +
                    "px," +
                    f(M * et * 0.5) +
                    "px,0)"
                })
            })))
      }
      return (
        i.addEventListener("pointermove", R),
        () => {
          i.removeEventListener("pointermove", R), cancelAnimationFrame(l)
        }
      )
    }, [H])
  const Z = g.useCallback(
      (i) => {
        if (H) {
          const R = Nt.current[i]
          R && R.scrollIntoView({ behavior: "auto", block: "start" })
          return
        }
        const l = mt.current,
          b = Y.current
        if (!l || !b) return
        const M =
          l.getBoundingClientRect().top +
          window.scrollY +
          i * b.offsetHeight * C
        window.scrollTo({ top: Math.ceil(M) + 1, behavior: "smooth" })
      },
      [H, C],
    ),
    [Mt, Gt] = g.useState(!1),
    [$, Ce] = g.useState(0),
    [ut, Me] = g.useState({ out: -1, into: -1, n: 0 }),
    [gt, dt] = g.useState(J.length - 1),
    [Lt, Ut] = g.useState(""),
    [St, Le] = g.useState(""),
    [_t, Se] = g.useState(0),
    [zt, qt] = g.useState(!1),
    [Xt, ze] = g.useState(0),
    [qe, Kt] = g.useState(!1),
    Qt = g.useRef(null),
    ot = (i) => {
      const l = V.length,
        b = ce($ + i, l)
      Me((M) => ({ out: i > 0 ? $ : -1, into: i < 0 ? b : -1, n: M.n + 1 })),
        Ce(b)
    },
    We = (i) => {
      Ut(
        "Hi " +
          r.split(" ")[0] +
          `,

I'd love to hear more about ` +
          i.name +
          ". ",
      ),
        qt(!1),
        Z(4)
    },
    Ae = () => {
      var l
      if (!Lt.trim()) {
        ze((b) => b + 1),
          (l = Qt.current) == null || l.focus({ preventScroll: !0 })
        return
      }
      const i =
        Lt.trim() +
        (St.trim()
          ? `

— ` + St.trim()
          : "")
      qt(!0), (window.location.href = rs(u, "A postcard for " + r, i))
    },
    Re = () => {
      var i
      ;(i = navigator.clipboard) == null ||
        i.writeText(u).then(
          () => {
            Kt(!0), window.setTimeout(() => Kt(!1), 1600)
          },
          () => {},
        )
    },
    [N, Be] = g.useState(!1),
    [Wt, Oe] = g.useState(1.8),
    [Fe, Ee] = g.useState(500),
    Vt = g.useRef(null)
  g.useEffect(() => {
    const i = Y.current,
      l = Vt.current
    if (!i) return
    const b = new ResizeObserver(() => {
      Be(i.offsetWidth <= 760),
        l &&
          l.offsetHeight &&
          (Oe(l.offsetWidth / l.offsetHeight), Ee(l.offsetHeight))
    })
    return b.observe(i), l && b.observe(l), () => b.disconnect()
  }, [])
  const ft = g.useMemo(() => {
      const i = J.length
      return J.map((l, b) => {
        const M = i > 1 ? b / (i - 1) : 0.5
        return N
          ? [b % 2 ? 72 : 26, 8 + M * 58]
          : [8 + M * 84, 62 - Math.sin(M * Math.PI * 2.2 + 0.4) * 26]
      })
    }, [J, N]),
    tt = g.useMemo(() => {
      const i = ft.map((b) => [b[0] * Wt, b[1]]),
        l = is(i)
      return { d: os(i), fr: l.fr, total: l.total, w: 100 * Wt }
    }, [ft, Wt]),
    Te = V.length,
    De = new Date().getFullYear(),
    Pe = new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase(),
    A = V[$] || V[0],
    Ye = ["mountain", "eagle", "pine"],
    He = {
      "--tpp-navy": k.navy,
      "--tpp-deep": k.deep,
      "--tpp-fog":
        "color-mix(in oklab, " + k.fog + " 92%, var(--color-background, #fff))",
      "--tpp-paper":
        "color-mix(in oklab, " +
        k.paper +
        " 94%, var(--color-background, #fff))",
      "--tpp-fiber":
        "color-mix(in oklab, #f7f4ee 94%, var(--color-background, #fff))",
      "--tpp-ink": k.ink,
      "--tpp-accent": k.accent,
      "--tpp-tape": k.tape,
      "--tpp-h": K,
    },
    Jt = (i) =>
      i === 0
        ? t.jsx(ve, { kind: "peak", seed: 3 })
        : i === 1
          ? t.jsx("div", {
              className: "tpp-fill",
              style: { background: "#d9cdb4" },
              children: t.jsx("div", {
                style: { position: "absolute", inset: "8% 4%" },
                children: t.jsx(ue, { uid: v + "s" }),
              }),
            })
          : t.jsx("div", {
              className: "tpp-fill",
              style: { background: "#e6ebe4" },
              children: t.jsx("div", {
                style: { position: "absolute", inset: "10% -10% 0 -20%" },
                children: t.jsx(Dt, { seed: 4 }),
              }),
            }),
    Ze = t.jsx(xt, {
      index: 0,
      seam: 0.72,
      seed: 101,
      label: x[0],
      setRef: ct,
      uid: v,
      upperBg: t.jsxs("div", {
        className: "tpp-fill",
        "aria-hidden": "true",
        children: [
          t.jsx(ds, { uid: v }),
          t.jsx(P, { uid: v, light: !0, opacity: 0.18 }),
          t.jsx(P, { uid: v, opacity: 0.3 }),
          U && t.jsx(Ht, { seed: 7, count: 20 }),
        ],
      }),
      upper: t.jsxs("div", {
        className: "tpp-fill",
        children: [
          t.jsxs("div", {
            className:
              "tpp-hero-copy absolute inset-x-0 flex flex-col items-center px-5 text-center",
            style: { top: "34%" },
            children: [
              t.jsx(W, {
                d: 0,
                children: t.jsx("h1", {
                  className: "tpp-h tpp-hero-h",
                  children: o.map((i, l) =>
                    t.jsx(
                      "span",
                      {
                        className: "block " + (F ? "tpp-rise" : ""),
                        style: { "--rd": 0.15 + l * 0.18 + "s" },
                        children: i,
                      },
                      l,
                    ),
                  ),
                }),
              }),
              t.jsx(W, {
                d: 0.15,
                children: t.jsx("p", {
                  className:
                    "mt-5 max-w-[34ch] text-[13px] leading-relaxed sm:text-[15px] " +
                    (F ? "tpp-rise" : ""),
                  style: { color: "#e4e2dc", "--rd": ".55s" },
                  children: n,
                }),
              }),
              t.jsxs(W, {
                d: 0.25,
                className:
                  "mt-7 flex flex-wrap justify-center gap-3 " +
                  (F ? "tpp-rise" : ""),
                style: { "--rd": ".75s" },
                children: [
                  t.jsx("button", {
                    type: "button",
                    className: "tpp-tag",
                    onClick: () => Z(2),
                    children: "View my work",
                  }),
                  t.jsx("button", {
                    type: "button",
                    className: "tpp-tag",
                    "data-ghost": "",
                    style: { color: "#f3eee4" },
                    onClick: () => Z(4),
                    children: "Get in touch",
                  }),
                ],
              }),
            ],
          }),
          t.jsx("div", {
            className: "tpp-par tpp-hero-eagle absolute",
            "data-dp": -14,
            style: {
              right: "7%",
              top: "13%",
              width: "clamp(120px, 17cqw, 250px)",
              aspectRatio: "1.3",
            },
            children: t.jsx("div", {
              className: F ? "tpp-flyin" : "",
              style: { width: "100%", height: "100%" },
              children: t.jsx("div", {
                className: "tpp-glide",
                style: { width: "100%", height: "100%" },
                children: t.jsx(ue, { uid: v }),
              }),
            }),
          }),
          t.jsxs("button", {
            type: "button",
            className: "tpp-note tpp-paper tpp-hero-note",
            onClick: () => Z(2),
            style: {
              right: "4%",
              top: "calc(13% + clamp(96px, 14cqw, 200px))",
              width: "clamp(140px, 14cqw, 200px)",
              transform: "rotate(-4deg)",
            },
            children: [
              t.jsx("span", {
                style: { display: "block", color: "#2f4a76" },
                children: p || Te + " projects worth a slow look",
              }),
              t.jsx("span", {
                className: "tpp-label",
                style: {
                  display: "block",
                  marginTop: 6,
                  fontFamily: "inherit",
                  fontSize: 9,
                  opacity: 0.6,
                },
                children: "selected work",
              }),
            ],
          }),
        ],
      }),
      lowerBg: t.jsx(me, { uid: v, seed: 2, peak: !1, forest: !0 }),
      lower: t.jsxs("div", {
        className:
          "flex h-full items-start justify-between px-[clamp(16px,4cqw,44px)] pt-[clamp(10px,3cqh,30px)]",
        style: { color: k.ink },
        children: [
          t.jsxs("button", {
            type: "button",
            className: "tpp-label flex items-center gap-3",
            onClick: () => Z(1),
            children: [
              t.jsx("span", {
                className: "tpp-hint",
                "aria-hidden": "true",
                children: "↓",
              }),
              t.jsxs("span", {
                children: [
                  "Keep scrolling",
                  t.jsx("span", {
                    className: "tpp-wide-i",
                    children: " — the page tears open",
                  }),
                ],
              }),
            ],
          }),
          t.jsxs("span", {
            className: "tpp-label tpp-wide",
            style: { opacity: 0.65 },
            children: [e, " · ", a],
          }),
        ],
      }),
    }),
    Ie = t.jsxs("div", {
      className: "tpp-paper relative h-full overflow-clip",
      style: { borderRadius: 3 },
      children: [
        t.jsx(P, { uid: v, opacity: 0.35 }),
        t.jsxs("div", {
          className: "tpp-pc-grid relative",
          children: [
            t.jsxs("div", {
              className: "relative min-h-0",
              style: { minHeight: N ? "24cqh" : void 0 },
              children: [
                t.jsx("div", {
                  className: "absolute overflow-clip",
                  style: {
                    left: 0,
                    top: 0,
                    right: "6%",
                    bottom: N ? "8%" : "22%",
                    border: "5px solid " + k.navy,
                    boxShadow: "0 6px 14px rgba(0,0,0,.25)",
                  },
                  children: t.jsx(Pt, {
                    src: Q.photo,
                    kind: "dawn",
                    seed: 4,
                    alt: r,
                  }),
                }),
                t.jsxs("div", {
                  className: "absolute",
                  style: {
                    left: "6%",
                    bottom: N ? "0%" : "8%",
                    width: "42%",
                    aspectRatio: "1.25",
                    transform: "rotate(-4deg)",
                    background: "#fbfaf6",
                    padding: 5,
                    boxShadow: "0 8px 16px rgba(0,0,0,.3)",
                  },
                  children: [
                    t.jsx("div", {
                      className: "relative h-full w-full overflow-clip",
                      children: t.jsx(Pt, { kind: "lake", seed: 6 }),
                    }),
                    t.jsx("span", {
                      className: "tpp-tape",
                      style: {
                        right: -26,
                        top: -6,
                        transform: "rotate(36deg)",
                      },
                    }),
                  ],
                }),
                t.jsxs("svg", {
                  className: "tpp-svg tpp-wide absolute",
                  viewBox: "0 0 200 40",
                  style: { right: "6%", bottom: 0, width: "44%" },
                  "aria-hidden": "true",
                  children: [
                    t.jsx("path", {
                      d: "M0 38 L40 12 L58 24 L84 4 L120 34 L140 22 L170 38",
                      fill: "none",
                      stroke: k.ink,
                      strokeOpacity: ".5",
                      strokeWidth: "1.2",
                    }),
                    t.jsx("path", {
                      d: "M84 4 L80 18 M40 12 L44 24",
                      stroke: k.ink,
                      strokeOpacity: ".35",
                    }),
                  ],
                }),
              ],
            }),
            t.jsx("div", {
              className: "relative",
              style: { background: "rgba(38,54,79,.25)" },
              children: t.jsx("span", {
                className:
                  "tpp-label tpp-wide absolute left-1/2 top-1/2 whitespace-nowrap",
                style: {
                  transform: "translate(-50%,-50%) rotate(-90deg)",
                  fontSize: 8,
                  background: "var(--tpp-paper)",
                  padding: "0 6px",
                  color: k.ink,
                  opacity: 0.8,
                },
                children: "par avion · by air mail",
              }),
            }),
            t.jsxs("div", {
              className: "relative flex min-h-0 flex-col",
              children: [
                t.jsxs("div", {
                  className: "flex items-start justify-between gap-3",
                  children: [
                    t.jsxs("div", {
                      className: "min-w-0",
                      children: [
                        t.jsx("h2", {
                          className: "tpp-h",
                          style: {
                            fontSize: "clamp(22px, min(3cqw, 5cqh), 40px)",
                            color: "#3a5d96",
                            fontWeight: 400,
                          },
                          children: Q.title,
                        }),
                        t.jsx("p", {
                          className:
                            "mt-1 text-[12px] leading-snug sm:text-[13px]",
                          style: { color: k.ink, maxWidth: "24ch" },
                          children: Q.subtitle,
                        }),
                      ],
                    }),
                    t.jsx("div", {
                      className: "shrink-0",
                      style: { transform: "rotate(3deg)" },
                      children: t.jsx(Yt, {
                        w: N ? 52 : 64,
                        h: N ? 64 : 78,
                        label: It,
                        children: Q.portrait
                          ? t.jsx("img", {
                              src: Q.portrait,
                              alt: "",
                              className: "tpp-fill",
                              style: { objectFit: "cover", maxWidth: "none" },
                            })
                          : t.jsx(xs, {}),
                      }),
                    }),
                  ],
                }),
                t.jsx("div", {
                  className:
                    "tpp-rule tpp-hw mt-3 min-h-0 flex-1 overflow-clip",
                  style: { textIndent: "2.5em" },
                  children: Q.text,
                }),
                t.jsxs("div", {
                  className: "mt-2 flex items-center justify-between gap-2",
                  children: [
                    t.jsxs("span", {
                      className: "tpp-hand",
                      style: { color: "#2f4a76", fontSize: 18 },
                      children: ["— ", r],
                    }),
                    t.jsx("button", {
                      type: "button",
                      className: "tpp-label flex items-center gap-2",
                      style: { fontSize: 10, color: k.accent },
                      onClick: () => Gt(!0),
                      children: "Turn over ↻",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    Ge = t.jsxs("div", {
      className: "tpp-paper relative h-full overflow-clip",
      style: { borderRadius: 3 },
      children: [
        t.jsx(P, { uid: v, opacity: 0.35 }),
        t.jsxs("div", {
          className:
            "relative flex h-full flex-col p-[clamp(16px,2.4cqw,30px)]",
          children: [
            t.jsxs("div", {
              className: "flex items-start justify-between gap-4",
              children: [
                t.jsxs("div", {
                  children: [
                    t.jsx("p", {
                      className: "tpp-label",
                      style: { color: k.accent, fontSize: 10 },
                      children: "From the desk of",
                    }),
                    t.jsx("h3", {
                      className: "tpp-h mt-1",
                      style: {
                        fontSize: "clamp(22px, min(3cqw, 5cqh), 38px)",
                        fontWeight: 400,
                      },
                      children: r,
                    }),
                    t.jsx("p", {
                      className: "mt-1 text-[13px]",
                      style: { opacity: 0.75 },
                      children: e,
                    }),
                  ],
                }),
                t.jsx("div", {
                  style: { transform: "rotate(-10deg)", flexShrink: 0 },
                  className: "tpp-wide",
                  children: t.jsx(ge, {
                    text: "· " + a.toUpperCase() + " · " + s + " ",
                    date: s,
                  }),
                }),
              ],
            }),
            t.jsx("dl", {
              className:
                "mt-4 grid min-h-0 flex-1 content-center gap-x-6 gap-y-3",
              style: { gridTemplateColumns: N ? "1fr" : "1fr 1fr" },
              children: (Q.facts || []).map((i) =>
                t.jsxs(
                  "div",
                  {
                    className: "tpp-rule",
                    style: {
                      borderBottom: "1px solid rgba(38,54,79,.18)",
                      paddingBottom: 4,
                    },
                    children: [
                      t.jsx("dt", {
                        className: "tpp-label",
                        style: { fontSize: 9, opacity: 0.6 },
                        children: i.label,
                      }),
                      t.jsx("dd", {
                        className: "tpp-hand m-0",
                        style: {
                          fontSize: "clamp(16px,1.7cqw,22px)",
                          color: "#2f4a76",
                        },
                        children: i.value,
                      }),
                    ],
                  },
                  i.label,
                ),
              ),
            }),
            t.jsx("div", {
              className: "mt-3 flex flex-wrap gap-2",
              children: (Q.skills || []).map((i) =>
                t.jsx("span", { className: "tpp-chip", children: i }, i),
              ),
            }),
            t.jsxs("div", {
              className: "mt-3 flex items-center justify-between",
              children: [
                t.jsx("a", {
                  href: "mailto:" + u,
                  className: "tpp-label",
                  style: { fontSize: 10, color: k.accent },
                  children: u,
                }),
                t.jsx("button", {
                  type: "button",
                  className: "tpp-label",
                  style: { fontSize: 10, color: k.accent },
                  onClick: () => Gt(!1),
                  children: "↺ Front",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    Ue = t.jsx(xt, {
      index: 1,
      seam: 0.86,
      seed: 202,
      label: x[1],
      setRef: ct,
      uid: v,
      upperBg: t.jsx(me, { uid: v, seed: 2 }),
      upper: t.jsxs("div", {
        className: "tpp-fill flex items-center justify-center",
        style: { paddingTop: 56 },
        children: [
          t.jsx(W, {
            d: 0.05,
            r: -4,
            className: "tpp-wide absolute",
            style: { right: "7%", top: "15%", width: "clamp(80px,9cqw,130px)" },
            children: t.jsxs("div", {
              className: "tpp-envelope relative",
              style: { aspectRatio: "1.45", transform: "rotate(8deg)" },
              "aria-hidden": "true",
              children: [
                t.jsx("div", {
                  className: "tpp-letter absolute",
                  style: {
                    left: "10%",
                    right: "10%",
                    top: "-10%",
                    height: "80%",
                    background: "#fbfaf6",
                    boxShadow: "0 2px 4px rgba(0,0,0,.15)",
                  },
                  children: t.jsx("div", {
                    className: "tpp-rule absolute",
                    style: { inset: "18% 12%", fontSize: 6 },
                  }),
                }),
                t.jsxs("svg", {
                  className: "tpp-svg tpp-fill",
                  viewBox: "0 0 145 100",
                  preserveAspectRatio: "none",
                  children: [
                    t.jsx("rect", {
                      y: "20",
                      width: "145",
                      height: "80",
                      fill: "#efe7d6",
                    }),
                    t.jsx("path", {
                      d: "M0 20 L72 66 L145 20 L145 100 L0 100 Z",
                      fill: "#e6dcc6",
                    }),
                    t.jsx("path", {
                      d: "M0 100 L60 58 M145 100 L85 58",
                      stroke: "#cdbf9f",
                    }),
                    t.jsx("rect", {
                      x: "104",
                      y: "72",
                      width: "30",
                      height: "22",
                      fill: "#9fb6cf",
                    }),
                  ],
                }),
              ],
            }),
          }),
          t.jsx(W, {
            d: 0.12,
            r: -3,
            children: t.jsxs("div", {
              className: "tpp-card3d tpp-postcard",
              style: { transform: "rotate(-1.2deg)" },
              children: [
                t.jsxs("div", {
                  className: "tpp-flip",
                  "data-back": Mt ? "" : void 0,
                  children: [
                    t.jsx("div", {
                      "aria-hidden": Mt,
                      style: { minHeight: 0 },
                      children: Ie,
                    }),
                    t.jsx("div", {
                      className: "tpp-back",
                      "aria-hidden": !Mt,
                      style: { minHeight: 0 },
                      children: Ge,
                    }),
                  ],
                }),
                t.jsx("span", {
                  className: "tpp-tape",
                  style: { left: -18, top: 14, transform: "rotate(-38deg)" },
                }),
              ],
            }),
          }),
        ],
      }),
      lowerBg: t.jsx(vt, { uid: v, seed: 5, trees: !1, flakes: !1 }),
      lower: t.jsxs("div", {
        className: "relative h-full",
        children: [
          t.jsx("div", {
            className: "absolute",
            style: {
              left: "-2%",
              top: -30,
              width: "clamp(160px,20cqw,300px)",
              aspectRatio: "1.5",
            },
            children: t.jsx(Dt, { seed: 9 }),
          }),
          t.jsxs("span", {
            className: "tpp-label absolute",
            style: {
              right: "clamp(16px,4cqw,44px)",
              top: "clamp(10px,3cqh,26px)",
              color: "#e8e4da",
            },
            children: ["Next — ", m],
          }),
        ],
      }),
    }),
    _e = V.map((i, l) => {
      const b = V.length,
        M = ce(l - $, b),
        R =
          M === 0
            ? "rotate(-3deg)"
            : M === 1
              ? "translate(7%, 3%) rotate(5deg) scale(.95)"
              : M === 2
                ? "translate(-7%, 5%) rotate(-8deg) scale(.9)"
                : "translate(0, 6%) rotate(2deg) scale(.86)",
        z = ut.out === l ? (ut.n % 2 ? "1" : "2") : void 0,
        I = ut.into === l ? (ut.n % 2 ? "1" : "2") : void 0
      return t.jsxs(
        "div",
        {
          className: "tpp-polaroid",
          "data-f": z,
          "data-in": I,
          "aria-hidden": M !== 0,
          style: { transform: R, zIndex: 20 - M, opacity: M > 2 ? 0 : 1 },
          children: [
            t.jsx("div", {
              className: "relative w-full overflow-clip",
              style: { aspectRatio: "1", background: "#ccc" },
              children: t.jsx(Pt, {
                src: i.image,
                kind:
                  i.scene ||
                  ["dawn", "peak", "lake", "sun", "forest", "river", "night"][
                    l % 7
                  ],
                seed: l + 2,
                alt: i.name,
              }),
            }),
            t.jsx("p", {
              className: "tpp-hand m-0 px-1 pt-3 text-center",
              style: {
                color: "#2f3d55",
                fontSize: "clamp(14px,1.6cqw,21px)",
                lineHeight: 1.1,
              },
              children: i.note || i.name,
            }),
          ],
        },
        l,
      )
    }),
    Xe = t.jsx(xt, {
      index: 2,
      seam: 0.9,
      seed: 303,
      label: x[2],
      setRef: ct,
      uid: v,
      upperBg: t.jsx(vt, { uid: v, seed: 3, flakes: U }),
      upper: t.jsxs("div", {
        className: "tpp-fill flex flex-col",
        style: { paddingTop: "clamp(64px, 10cqh, 96px)", color: "#f3eee4" },
        children: [
          t.jsx("div", {
            className: "absolute",
            style: {
              left: "-3%",
              top: "-4%",
              width: "clamp(150px,18cqw,280px)",
              aspectRatio: "1.5",
              transform: "rotate(10deg)",
            },
            children: t.jsx(Dt, { seed: 13 }),
          }),
          t.jsx(W, {
            d: 0.05,
            className: "tpp-squirrel-wrap absolute",
            style: {
              right: "-1%",
              top: "4%",
              width: "clamp(110px,15cqw,220px)",
              aspectRatio: "1.1",
            },
            children: t.jsx(hs, { uid: v }),
          }),
          t.jsxs(W, {
            d: 0,
            className: "text-center",
            children: [
              t.jsx("h2", {
                className: "tpp-h tpp-sec-h",
                style: { color: "#f3eee4" },
                children: m,
              }),
              t.jsxs("p", {
                className: "tpp-label mt-3",
                style: { opacity: 0.6 },
                children: [
                  String($ + 1).padStart(2, "0"),
                  " / ",
                  String(V.length).padStart(2, "0"),
                ],
              }),
            ],
          }),
          t.jsxs("div", {
            className:
              "relative mx-auto flex w-full min-h-0 flex-1 items-center justify-center gap-[clamp(20px,5cqw,80px)] px-[clamp(16px,5cqw,64px)]",
            style: {
              flexDirection: N ? "column" : "row",
              maxWidth: 1100,
              paddingBottom: N ? 8 : "6cqh",
              gap: N ? 14 : void 0,
            },
            onKeyDown: (i) => {
              i.key === "ArrowRight" && ot(1), i.key === "ArrowLeft" && ot(-1)
            },
            children: [
              t.jsx("svg", {
                className:
                  "tpp-svg tpp-wide pointer-events-none absolute inset-0 h-full w-full",
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                "aria-hidden": "true",
                children: t.jsx("path", {
                  className: "tpp-dash",
                  d: "M30 72 C42 92 50 40 62 46",
                  fill: "none",
                  stroke: "#f3eee4",
                  strokeOpacity: ".55",
                  strokeWidth: "1.4",
                  vectorEffect: "non-scaling-stroke",
                }),
              }),
              t.jsx(W, {
                d: 0.1,
                r: -6,
                children: t.jsxs("button", {
                  type: "button",
                  className: "relative block",
                  "aria-label": "Next project (showing " + A.name + ")",
                  onClick: () => ot(1),
                  style: {
                    width: N
                      ? "min(50cqw, calc(34cqh * .88))"
                      : "min(28cqw, calc(54cqh * .88), 360px)",
                    aspectRatio: "0.86",
                  },
                  children: [
                    _e,
                    t.jsx("span", {
                      className: "tpp-tape",
                      style: {
                        left: "50%",
                        top: -10,
                        marginLeft: -38,
                        transform: "rotate(-4deg)",
                        zIndex: 40,
                      },
                    }),
                  ],
                }),
              }),
              t.jsxs(W, {
                d: 0.22,
                r: 3,
                style: {
                  width: N ? "100%" : "min(420px, 40cqw)",
                  maxWidth: 460,
                },
                children: [
                  t.jsxs("div", {
                    className: "tpp-ncard",
                    "aria-live": "polite",
                    children: [
                      t.jsxs("div", {
                        className: "flex items-baseline justify-between gap-3",
                        children: [
                          t.jsx("h3", {
                            className: "tpp-h",
                            style: {
                              fontSize: "clamp(22px,2.6cqw,34px)",
                              fontWeight: 400,
                              letterSpacing: ".04em",
                            },
                            children: A.name,
                          }),
                          t.jsx("span", {
                            className: "tpp-serif shrink-0",
                            style: { fontSize: 15, opacity: 0.7 },
                            children: A.year,
                          }),
                        ],
                      }),
                      A.role &&
                        t.jsx("p", {
                          className: "tpp-label mt-1",
                          style: { fontSize: 9.5, color: k.accent },
                          children: A.role,
                        }),
                      A.description &&
                        t.jsx("p", {
                          className:
                            "mt-3 text-[13px] leading-relaxed sm:text-[14px]",
                          style: {
                            display: "-webkit-box",
                            WebkitLineClamp: N ? 3 : 5,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          },
                          children: A.description,
                        }),
                      A.tags &&
                        A.tags.length > 0 &&
                        t.jsx("div", {
                          className: "mt-3 flex flex-wrap gap-1.5",
                          children: A.tags.map((i) =>
                            t.jsx(
                              "span",
                              { className: "tpp-chip", children: i },
                              i,
                            ),
                          ),
                        }),
                      t.jsx("div", {
                        className: "mt-4",
                        children: A.url
                          ? t.jsx("a", {
                              href: A.url,
                              target: "_blank",
                              rel: "noreferrer",
                              className: "tpp-label",
                              style: {
                                fontSize: 10,
                                color: k.accent,
                                borderBottom: "1px solid currentColor",
                                paddingBottom: 2,
                              },
                              children: "Visit the site ↗",
                            })
                          : t.jsx("button", {
                              type: "button",
                              className: "tpp-label",
                              style: {
                                fontSize: 10,
                                color: k.accent,
                                borderBottom: "1px solid currentColor",
                                paddingBottom: 2,
                              },
                              onClick: () => We(A),
                              children: "Ask me about it →",
                            }),
                      }),
                    ],
                  }),
                  t.jsxs("div", {
                    className: "mt-4 flex items-center justify-between gap-3",
                    style: { color: "#f3eee4" },
                    children: [
                      t.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          t.jsx("button", {
                            type: "button",
                            className: "tpp-round",
                            "aria-label": "Previous project",
                            onClick: () => ot(-1),
                            children: "←",
                          }),
                          t.jsx("button", {
                            type: "button",
                            className: "tpp-round",
                            "aria-label": "Next project",
                            onClick: () => ot(1),
                            children: "→",
                          }),
                        ],
                      }),
                      t.jsx("div", {
                        className: "flex items-center gap-1.5",
                        role: "group",
                        "aria-label": "Projects",
                        children: V.map((i, l) =>
                          t.jsx(
                            "button",
                            {
                              type: "button",
                              className: "tpp-pip",
                              "aria-label": i.name,
                              "aria-current": l === $,
                              onClick: () => l !== $ && ot(l - $),
                            },
                            l,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      lowerBg: t.jsx(vt, { uid: v, seed: 4, trees: !1, flakes: !1 }),
      lower: t.jsx("div", {
        className: "relative h-full",
        children: t.jsxs("span", {
          className: "tpp-label absolute",
          style: {
            left: "clamp(16px,4cqw,44px)",
            top: "clamp(8px,2cqh,22px)",
            color: "#e8e4da",
            opacity: 0.8,
          },
          children: ["Next — ", L],
        }),
      }),
    }),
    jt = 100 / Math.max(1, Fe),
    it = J[gt] || J[0],
    nt = ft[gt] || [50, 50],
    Ke = N
      ? void 0
      : nt[0] > 58
        ? "calc(" + nt[0] + "% - min(300px,40cqw) - 28px)"
        : "calc(" + nt[0] + "% + 28px)",
    Qe = N ? void 0 : "calc(" + pt(nt[1], 18, 70) + "% - 60px)",
    Ve = t.jsx(xt, {
      index: 3,
      seam: 0.88,
      seed: 404,
      label: x[3],
      setRef: ct,
      uid: v,
      upperBg: t.jsxs("div", {
        className: "tpp-fill",
        "aria-hidden": "true",
        style: { background: "var(--tpp-paper)" },
        children: [t.jsx(gs, {}), t.jsx(P, { uid: v, opacity: 0.45 })],
      }),
      upper: t.jsxs("div", {
        className: "tpp-fill flex flex-col",
        style: { paddingTop: "clamp(64px, 10cqh, 96px)", color: k.ink },
        children: [
          t.jsxs(W, {
            d: 0,
            className:
              "flex items-end justify-between gap-4 px-[clamp(16px,5cqw,64px)]",
            children: [
              t.jsxs("div", {
                children: [
                  t.jsx("p", {
                    className: "tpp-label",
                    style: { color: k.accent },
                    children: "Career map · 2022 – present",
                  }),
                  t.jsx("h2", {
                    className: "tpp-h tpp-sec-h mt-2",
                    children: L,
                  }),
                ],
              }),
              t.jsx("div", {
                className: "tpp-wide",
                style: { color: k.ink, opacity: 0.7 },
                children: t.jsx(us, {}),
              }),
            ],
          }),
          t.jsxs("div", {
            ref: Vt,
            className:
              "relative mx-[clamp(16px,5cqw,64px)] mb-[3cqh] mt-[2cqh] min-h-0 flex-1",
            onKeyDown: (i) => {
              ;(i.key === "ArrowRight" || i.key === "ArrowDown") &&
                dt((l) => Math.min(J.length - 1, l + 1)),
                (i.key === "ArrowLeft" || i.key === "ArrowUp") &&
                  dt((l) => Math.max(0, l - 1))
            },
            children: [
              t.jsxs("svg", {
                className: "tpp-svg tpp-fill",
                viewBox: "0 0 " + f(tt.w) + " 100",
                preserveAspectRatio: "none",
                "aria-hidden": "true",
                style: { overflow: "visible" },
                children: [
                  t.jsx("path", {
                    d: tt.d,
                    fill: "none",
                    stroke: k.ink,
                    strokeOpacity: ".5",
                    strokeWidth: 1.6 * jt,
                    strokeDasharray: f(2 * jt) + " " + f(8 * jt),
                    strokeLinecap: "round",
                  }),
                  t.jsx("path", {
                    className: "tpp-progress",
                    d: tt.d,
                    fill: "none",
                    stroke: k.accent,
                    strokeWidth: 2.6 * jt,
                    strokeLinecap: "round",
                    strokeDasharray: f(tt.total + 1) + " " + f(tt.total + 1),
                    strokeDashoffset: f(tt.total * (1 - (tt.fr[gt] || 0))),
                  }),
                ],
              }),
              t.jsx("span", {
                className: "tpp-walker",
                style: { left: nt[0] + "%", top: nt[1] + "%" },
                "aria-hidden": "true",
              }),
              J.map((i, l) =>
                t.jsx(
                  W,
                  {
                    d: 0.08 + l * 0.05,
                    style: {
                      position: "absolute",
                      left: ft[l][0] + "%",
                      top: ft[l][1] + "%",
                    },
                    children: t.jsxs("button", {
                      type: "button",
                      className: "tpp-pin",
                      "aria-pressed": l === gt,
                      "aria-label": i.year + " — " + i.title,
                      onClick: () => dt(l),
                      onMouseEnter: () => dt(l),
                      onFocus: () => dt(l),
                      style: { left: 0, top: 0 },
                      children: [
                        t.jsx("span", {
                          className: "tpp-pin-y",
                          children: i.year,
                        }),
                        t.jsx("span", { className: "tpp-pin-dot" }),
                      ],
                    }),
                  },
                  l,
                ),
              ),
              t.jsx(W, {
                d: 0.3,
                className: "tpp-stop",
                style: N
                  ? { left: 0, right: 0, bottom: 0 }
                  : { left: Ke, top: Qe },
                children: t.jsxs("div", {
                  className: "tpp-ncard",
                  "aria-live": "polite",
                  style: { transform: "rotate(-1deg)" },
                  children: [
                    t.jsxs("p", {
                      className: "tpp-label",
                      style: { fontSize: 9.5, color: k.accent },
                      children: [it.year, it.place ? " · " + it.place : ""],
                    }),
                    t.jsx("h3", {
                      className: "tpp-serif mt-1",
                      style: {
                        fontSize: "clamp(19px,1.9cqw,25px)",
                        margin: "4px 0 0",
                        fontWeight: 600,
                        lineHeight: 1.15,
                      },
                      children: it.title,
                    }),
                    it.text &&
                      t.jsx("p", {
                        className: "mt-2 text-[13px] leading-relaxed",
                        children: it.text,
                      }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      lowerBg: t.jsx(vt, { uid: v, seed: 6, trees: !1, flakes: !1 }),
      lower: t.jsx("div", {
        className: "relative h-full",
        children: t.jsxs("span", {
          className: "tpp-label absolute",
          style: {
            right: "clamp(16px,4cqw,44px)",
            top: "clamp(8px,2cqh,22px)",
            color: "#e8e4da",
            opacity: 0.8,
          },
          children: ["Last stop — ", w],
        }),
      }),
    }),
    Je = t.jsxs("div", {
      className: "tpp-fill",
      "aria-hidden": "true",
      style: {
        background:
          "linear-gradient(180deg, #0c1528 0%, var(--tpp-deep) 45%, var(--tpp-navy) 100%)",
      },
      children: [
        t.jsxs("svg", {
          className: "tpp-svg tpp-fill",
          viewBox: "0 0 1600 1000",
          preserveAspectRatio: "xMidYMid slice",
          children: [
            t.jsxs("defs", {
              children: [
                t.jsxs("radialGradient", {
                  id: v + "-moon",
                  children: [
                    t.jsx("stop", {
                      offset: "0",
                      stopColor: "#fdf6e3",
                      stopOpacity: ".55",
                    }),
                    t.jsx("stop", {
                      offset: "1",
                      stopColor: "#fdf6e3",
                      stopOpacity: "0",
                    }),
                  ],
                }),
                t.jsxs("linearGradient", {
                  id: v + "-au",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    t.jsx("stop", {
                      offset: "0",
                      stopColor: "#6ee7c0",
                      stopOpacity: "0",
                    }),
                    t.jsx("stop", {
                      offset: ".55",
                      stopColor: "#6ee7c0",
                      stopOpacity: ".32",
                    }),
                    t.jsx("stop", {
                      offset: "1",
                      stopColor: "#6ee7c0",
                      stopOpacity: "0",
                    }),
                  ],
                }),
              ],
            }),
            t.jsx(js, {}),
            t.jsx("g", {
              className: "tpp-aurora",
              children: t.jsx("path", {
                d: "M-100 300 C200 120 420 340 700 200 C950 80 1150 260 1400 140 C1550 70 1650 120 1700 100 L1700 330 C1500 360 1300 260 1100 360 C850 470 650 300 420 400 C200 490 60 380 -100 460 Z",
                fill: "url(#" + v + "-au)",
              }),
            }),
            t.jsx("circle", {
              cx: "1280",
              cy: "170",
              r: "120",
              fill: "url(#" + v + "-moon)",
            }),
            t.jsx("circle", {
              cx: "1280",
              cy: "170",
              r: "34",
              fill: "#f6efdc",
            }),
            t.jsx("circle", { cx: "1268", cy: "162", r: "6", fill: "#e3d9bf" }),
            t.jsx("circle", { cx: "1292", cy: "180", r: "4", fill: "#e3d9bf" }),
            t.jsx("g", {
              children: t.jsx("path", {
                d: at(st(808, -120, 1720, 720, 260, 0.55, 7), 1e3),
                fill: "#1b2944",
              }),
            }),
            t.jsx("g", {
              children: t.jsx("path", {
                d: rt(919, -40, 1640, 1010, 150, 320, 40),
                fill: "#0b1324",
              }),
            }),
          ],
        }),
        t.jsx(P, { uid: v, light: !0, opacity: 0.18 }),
        U && t.jsx(Ht, { seed: 23, count: 22 }),
      ],
    }),
    $e = t.jsx(xt, {
      index: 4,
      seam: 1,
      seed: 505,
      label: x[4],
      last: !0,
      setRef: ct,
      uid: v,
      upperBg: Je,
      upper: t.jsxs("div", {
        className: "tpp-fill flex flex-col items-center",
        style: { paddingTop: "clamp(64px, 10cqh, 96px)", color: "#f3eee4" },
        children: [
          t.jsxs(W, {
            d: 0,
            className: "px-5 text-center",
            children: [
              t.jsx("h2", { className: "tpp-h tpp-sec-h", children: w }),
              t.jsxs("p", {
                className: "tpp-label mt-3",
                style: { opacity: 0.6 },
                children: ["It goes straight to ", u],
              }),
            ],
          }),
          t.jsxs(W, {
            d: 0.12,
            r: -2,
            className: "mt-[3cqh] w-full px-4",
            style: { maxWidth: 760 },
            children: [
              t.jsxs("form", {
                className:
                  "tpp-paper relative overflow-clip " +
                  (Xt ? (Xt % 2 ? "tpp-shake" : "tpp-shake2") : ""),
                style: { borderRadius: 3, transform: "rotate(-.6deg)" },
                onSubmit: (i) => {
                  i.preventDefault(), Ae()
                },
                children: [
                  t.jsx(P, { uid: v, opacity: 0.35 }),
                  t.jsxs("div", {
                    className:
                      "relative grid gap-[clamp(12px,2.4cqw,28px)] p-[clamp(14px,2.4cqw,28px)]",
                    style: {
                      gridTemplateColumns: N ? "1fr" : "1.25fr 1px 1fr",
                    },
                    children: [
                      t.jsxs("label", {
                        className: "relative block",
                        children: [
                          t.jsx("span", {
                            className: "sr-only",
                            children: "Your message",
                          }),
                          t.jsx("div", {
                            className: "tpp-rule",
                            style: {
                              height: N ? "6em" : "clamp(7.5em, 26cqh, 10.5em)",
                              fontSize: "clamp(15px,1.5cqw,20px)",
                            },
                            children: t.jsx("textarea", {
                              ref: Qt,
                              className: "tpp-msg",
                              value: Lt,
                              onChange: (i) => {
                                Ut(i.target.value), qt(!1)
                              },
                              placeholder:
                                "Dear " +
                                r.split(" ")[0] +
                                ", I'd like to talk about a role on our team…",
                            }),
                          }),
                        ],
                      }),
                      !N &&
                        t.jsx("div", {
                          style: { background: "rgba(38,54,79,.22)" },
                        }),
                      t.jsxs("div", {
                        className: "flex min-w-0 flex-col gap-3",
                        children: [
                          t.jsxs("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                              t.jsx("div", {
                                role: "group",
                                "aria-label": "Choose a stamp",
                                className: "flex gap-2",
                                children: Ye.map((i, l) =>
                                  t.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      className: "tpp-stamp-btn",
                                      "aria-pressed": l === _t,
                                      "aria-label": i + " stamp",
                                      onClick: () => Se(l),
                                      children: t.jsx(Yt, {
                                        w: N ? 34 : 40,
                                        h: N ? 42 : 50,
                                        children: Jt(l),
                                      }),
                                    },
                                    i,
                                  ),
                                ),
                              }),
                              t.jsx("div", {
                                style: { transform: "rotate(4deg)" },
                                children: t.jsx(Yt, {
                                  w: N ? 52 : 62,
                                  h: N ? 64 : 76,
                                  label: "POST",
                                  children: Jt(_t),
                                }),
                              }),
                            ],
                          }),
                          t.jsxs("div", {
                            className: "tpp-hw",
                            style: { lineHeight: 1.7 },
                            children: [
                              t.jsxs("div", {
                                style: {
                                  borderBottom: "1px solid rgba(38,54,79,.3)",
                                },
                                children: ["To: ", r],
                              }),
                              t.jsx("div", {
                                className: "tpp-wide",
                                style: {
                                  borderBottom: "1px solid rgba(38,54,79,.3)",
                                },
                                children: a,
                              }),
                            ],
                          }),
                          t.jsxs("label", {
                            className: "block",
                            children: [
                              t.jsx("span", {
                                className: "tpp-label",
                                style: { fontSize: 9, opacity: 0.6 },
                                children: "From",
                              }),
                              t.jsx("input", {
                                className: "tpp-input",
                                type: "email",
                                value: St,
                                onChange: (i) => Le(i.target.value),
                                placeholder: "you@company.com",
                                autoComplete: "email",
                              }),
                            ],
                          }),
                          t.jsxs("div", {
                            className:
                              "mt-auto flex items-center justify-between gap-3",
                            children: [
                              t.jsx("button", {
                                type: "button",
                                className: "tpp-label",
                                style: { fontSize: 9.5, opacity: 0.7 },
                                onClick: Re,
                                children: qe ? "Copied ✓" : "Copy email",
                              }),
                              t.jsx("button", {
                                type: "submit",
                                className: "tpp-tag",
                                style: { background: k.ink, color: "#f3eee4" },
                                children: zt ? "Sent ✓" : "Send postcard",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  zt &&
                    t.jsx("div", {
                      className: "tpp-postmark",
                      style: { right: N ? 0 : 6, top: N ? 8 : 14 },
                      children: t.jsx(ge, {
                        text: "· SENT WITH CARE · " + a.toUpperCase() + " ",
                        date: Pe,
                      }),
                    }),
                ],
              }),
              t.jsx("p", {
                className: "tpp-hand mt-2 text-center",
                style: { color: "#e8e4da", fontSize: 16, minHeight: "1.2em" },
                "aria-live": "polite",
                children: zt
                  ? "Opening your mail app. Thanks for reaching out!"
                  : "",
              }),
            ],
          }),
          t.jsx(W, {
            d: 0.25,
            className: "mt-[1.5cqh] flex flex-wrap justify-center gap-3 px-4",
            children: y.map((i) =>
              t.jsx(
                "a",
                {
                  href: i.url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "tpp-luggage",
                  children: i.label,
                },
                i.url,
              ),
            ),
          }),
          t.jsxs("div", {
            className:
              "mt-auto flex w-full items-center justify-between gap-3 px-[clamp(16px,4cqw,44px)] pb-4 text-[11px]",
            style: { color: "#d6d3ca" },
            children: [
              t.jsxs("span", {
                children: [
                  "© ",
                  De,
                  " ",
                  r,
                  " · made with paper, snow & patience",
                ],
              }),
              t.jsx("button", {
                type: "button",
                className: "tpp-label",
                style: { fontSize: 10 },
                onClick: () => Z(0),
                children: "Back to the top ↑",
              }),
            ],
          }),
        ],
      }),
    })
  return t.jsxs("div", {
    ref: wt,
    className: "tpp-root " + lt,
    "data-mode": H ? "stack" : "pin",
    style: He,
    children: [
      t.jsx("style", { children: ls }),
      t.jsx("div", {
        ref: mt,
        className: "tpp-track",
        style: {
          height: H
            ? "auto"
            : "calc(" + K + " * " + f(1 + (yt - 1) * C + 0.35) + ")",
        },
        children: t.jsxs("div", {
          ref: Y,
          className: "tpp-stage",
          "data-tone": "dark",
          style: { height: H ? "auto" : K },
          children: [
            Ze,
            Ue,
            Xe,
            Ve,
            $e,
            t.jsxs("nav", {
              className: "tpp-nav",
              "aria-label": "Chapters",
              children: [
                t.jsx("button", {
                  type: "button",
                  className: "tpp-brand",
                  onClick: () => Z(0),
                  children: r,
                }),
                t.jsx("div", {
                  className: "tpp-links",
                  children: x.map((i, l) =>
                    t.jsx(
                      "button",
                      {
                        type: "button",
                        className: "tpp-link",
                        "aria-current": l === Ct,
                        onClick: () => Z(l),
                        children: i,
                      },
                      i,
                    ),
                  ),
                }),
                t.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    t.jsxs("span", {
                      className: "tpp-count",
                      "aria-hidden": "true",
                      children: [String(Ct + 1).padStart(2, "0"), " / 05"],
                    }),
                    t.jsx("button", {
                      type: "button",
                      "aria-label": r + " — back to the cover",
                      onClick: () => Z(0),
                      children: t.jsx(ms, { mark: It, since: s }),
                    }),
                  ],
                }),
              ],
            }),
            !H &&
              t.jsx("div", {
                className: "tpp-rail",
                role: "group",
                "aria-label": "Chapter progress",
                children: x.map((i, l) =>
                  t.jsx(
                    "button",
                    {
                      type: "button",
                      className: "tpp-dot",
                      "aria-label": i,
                      "aria-current": l === Ct,
                      onClick: () => Z(l),
                    },
                    i,
                  ),
                ),
              }),
          ],
        }),
      }),
    ],
  })
}
function js() {
  const r = g.useMemo(() => {
    const e = O(42)
    return Array.from({ length: 110 }, () => ({
      x: e() * 1600,
      y: e() * 620,
      s: 0.5 + e() * 1.6,
      d: e() * 3,
    }))
  }, [])
  return t.jsx("g", {
    children: r.map((e, a) =>
      t.jsx(
        "circle",
        {
          className: a % 4 ? void 0 : "tpp-twinkle",
          cx: e.x,
          cy: e.y,
          r: e.s,
          fill: "#fff",
          opacity: ".75",
          style: { animationDelay: -e.d + "s" },
        },
        a,
      ),
    ),
  })
}
export { ys as TornPostcardPortfolio }
export default ys

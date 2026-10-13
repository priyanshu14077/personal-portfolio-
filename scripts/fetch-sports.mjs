// Builds src/data/sports.json for /now from Wikimedia Commons: freely licensed photos and video, no API key.
// Files are pinned by their Commons title, so the gallery shows exactly what was chosen.
// To add one: find it on commons.wikimedia.org, copy its "File:..." title into the list below, then run: npm run sports
import { writeFileSync } from "node:fs"

const API = "https://commons.wikimedia.org/w/api.php"
// Wikimedia asks every client to identify itself.
const UA = "priyanshu-portfolio/1.0 (https://github.com/priyanshu14077/personal-portfolio-)"
const OPEN = /^(CC BY(-SA)? [\d.]+|CC0|Public domain|PD|Attribution|No restrictions)/i

const SPORTS = [
  {
    id: "badminton",
    name: "Badminton",
    note: "I play often, and I'm a big fan of the sport.",
    photos: [
      "File:Smash Return (7758861620).jpg",
      "File:Badminton at the 2012 Summer Olympics (8000978216).jpg",
      "File:Badminton at the 2012 Summer Olympics 9180.jpg",
      "File:Badminton 2012 Olympics.jpg",
      "File:Badminton at the 2012 Summer Olympics 9084.jpg",
      "File:Ankara - BWF World Senior Badminton Championships - very strong Danish Sinles player, Age class ?? (11078024235).jpg"
    ],
    videos: [
      "File:中国(福州)羽毛球公开赛落幕 中国选手夺女单、混双两冠.webm",
      "File:Wang Zhiyi triumph in all-Chinese China Open finals I China Open 2025.webm"
    ],
  },
  {
    id: "cricket",
    name: "Cricket",
    note: "I play often.",
    photos: [
      "File:Virat Kohli Batting.jpg",
      "File:2015 CWC I v UAE 02-28 Kohli (12).JPG",
      "File:England v India at the SWALEC Stadium Cardiff 2014.JPG",
      "File:Hertfordshire County Cricket Club v Berkshire County Cricket Club at Radlett, Herts, England 049.jpg",
      "File:Church Times Cricket Cup final 2019, Diocese of London v Dioceses of Carlisle, Blackburn and Durham 22.jpg",
      "File:Eden Gardens Cricket Stadium, Kolkata.jpg"
    ],
    videos: [
      "File:Aythorpe Roding CC v Terling CC, Essex, England Video 6 full toss beamer hit to on side for run.webm"
    ],
  },
  {
    id: "basketball",
    name: "Basketball",
    note: "I play often, and I'm a big Luka Dončić fan.",
    photos: [
      "File:Luka Doncic (51176525298).jpg",
      "File:Luka Doncic (51177393035).jpg",
      "File:Luka Doncic (51177393625).jpg",
      "File:Luka Doncic (51916936450).jpg",
      "File:Luka Doncic (51177079284).jpg",
      "File:NBA All-Star Game 2010 Cowboys Stadium.jpg"
    ],
    videos: [],
  },
]

const strip = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, " ").trim()

async function lookup(titles) {
  if (titles.length === 0) return new Map()
  const params = new URLSearchParams({
    action: "query", format: "json", formatversion: "2", titles: titles.join("|"),
    prop: "imageinfo|videoinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1600", viprop: "derivatives",
  })
  const res = await fetch(`${API}?${params}`, { headers: { "user-agent": UA } })
  if (!res.ok) throw new Error(`Commons ${res.status}`)
  const { query } = await res.json()
  // Commons may normalise titles (for example .JPG); map them back to what was asked for.
  const alias = new Map((query.normalized ?? []).map((n) => [n.to, n.from]))
  return new Map((query.pages ?? []).map((p) => [alias.get(p.title) ?? p.title, p]))
}

function credit(page, kind) {
  const info = page.imageinfo?.[0]
  if (!info) return null
  const m = info.extmetadata ?? {}
  const license = strip(m.LicenseShortName?.value)
  if (!OPEN.test(license)) throw new Error(`${page.title} is ${license || "unlicensed"}, not an open licence`)
  const base = {
    type: kind,
    id: page.title,
    alt: strip(m.ImageDescription?.value || m.ObjectName?.value || page.title.replace(/^File:|\.\w+$/g, "")).slice(0, 160),
    credit: strip(m.Artist?.value).slice(0, 80) || "Unknown author",
    license,
    licenseUrl: m.LicenseUrl?.value || "",
    url: info.descriptionurl,
  }
  if (kind === "photo") return { ...base, src: info.thumburl, thumb: info.thumburl.replace(/\/1600px-/, "/480px-") }
  // Stream a 480p transcode rather than the original upload, which can run to hundreds of megabytes.
  const derivatives = page.videoinfo?.[0]?.derivatives ?? []
  const pick = (re) => derivatives.find((d) => re.test(d.src))?.src
  const sources = [pick(/\.480p\.vp9\.webm/), pick(/\.360p\.mpeg4\.mov/)].filter(Boolean)
  return { ...base, src: sources[0] ?? info.url, sources, thumb: info.thumburl }
}

const result = []
for (const s of SPORTS) {
  const pages = await lookup([...s.photos, ...s.videos])
  const get = (t, kind) => {
    const p = pages.get(t)
    if (!p || p.missing) throw new Error(`Not found on Commons: ${t}`)
    return credit(p, kind)
  }
  const photos = s.photos.map((t) => get(t, "photo")).filter(Boolean)
  const videos = s.videos.map((t) => get(t, "video")).filter(Boolean)
  const media = []
  for (let i = 0; media.length < photos.length + videos.length; i++) {
    if (photos[i * 2]) media.push(photos[i * 2])
    if (videos[i]) media.push(videos[i])
    if (photos[i * 2 + 1]) media.push(photos[i * 2 + 1])
  }
  console.log(`${s.name}: ${photos.length} photos, ${videos.length} videos`)
  result.push({ id: s.id, name: s.name, note: s.note, media })
}
writeFileSync(
  new URL("../src/data/sports.json", import.meta.url),
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), source: "Wikimedia Commons", sports: result }, null, 2) + "\n",
)

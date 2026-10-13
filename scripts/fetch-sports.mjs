// Builds src/data/sports.json from Pexels: photos and short videos for each sport on /now.
// Needs PEXELS_API_KEY in the environment or in .env.local (gitignored). Run: npm run sports
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const envFile = new URL("../.env.local", import.meta.url)
if (!process.env.PEXELS_API_KEY && existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*PEXELS_API_KEY\s*=\s*(.+?)\s*$/)
    if (m) process.env.PEXELS_API_KEY = m[1].replace(/^["']|["']$/g, "")
  }
}
const KEY = process.env.PEXELS_API_KEY
if (!KEY) {
  console.error("Set PEXELS_API_KEY in .env.local first (free key: https://www.pexels.com/api/).")
  process.exit(1)
}

// Edit the searches to change what each sport shows.
const SPORTS = [
  { id: "badminton", name: "Badminton", note: "I play often, and I'm a big fan of the sport.", photos: "badminton", videos: "badminton" },
  { id: "cricket", name: "Cricket", note: "I play often.", photos: "cricket match", videos: "cricket" },
  { id: "basketball", name: "Basketball", note: "I play often, and I'm a big Luka Dončić fan.", photos: "basketball game", videos: "basketball" },
]
const PHOTOS = 6
const VIDEOS = 2

async function pexels(path) {
  const res = await fetch(`https://api.pexels.com${path}`, { headers: { Authorization: KEY } })
  if (!res.ok) throw new Error(`Pexels ${res.status} on ${path}: ${await res.text()}`)
  return res.json()
}

/** The smallest MP4 that is still at least 960px wide, so the page stays light. */
function pickFile(files) {
  const mp4 = files.filter((f) => f.file_type === "video/mp4" && f.width)
  const good = mp4.filter((f) => f.width >= 960).sort((a, b) => a.width - b.width)
  return good[0] ?? mp4.sort((a, b) => b.width - a.width)[0]
}

const out = []
for (const s of SPORTS) {
  const p = await pexels(`/v1/search?query=${encodeURIComponent(s.photos)}&orientation=landscape&per_page=${PHOTOS}`)
  const v = await pexels(`/v1/videos/search?query=${encodeURIComponent(s.videos)}&orientation=landscape&size=medium&per_page=${VIDEOS * 3}`)
  const photos = p.photos.map((x) => ({
    type: "photo",
    id: x.id,
    src: x.src.large2x,
    thumb: x.src.medium,
    alt: x.alt || `${s.name} photo`,
    credit: x.photographer,
    creditUrl: x.photographer_url,
    url: x.url,
  }))
  const videos = v.videos
    .map((x) => ({ x, file: pickFile(x.video_files) }))
    .filter(({ file }) => file)
    .slice(0, VIDEOS)
    .map(({ x, file }) => ({
      type: "video",
      id: x.id,
      src: file.link,
      thumb: x.image,
      alt: `${s.name} video`,
      credit: x.user?.name ?? "Pexels",
      creditUrl: x.user?.url ?? "https://www.pexels.com",
      url: x.url,
    }))
  // Lead with a video when there is one, then alternate.
  const media = []
  for (let i = 0; media.length < photos.length + videos.length; i++) {
    if (videos[i]) media.push(videos[i])
    if (photos[i * 2]) media.push(photos[i * 2])
    if (photos[i * 2 + 1]) media.push(photos[i * 2 + 1])
  }
  console.log(`${s.name}: ${photos.length} photos, ${videos.length} videos`)
  out.push({ id: s.id, name: s.name, note: s.note, media })
}
writeFileSync(new URL("../src/data/sports.json", import.meta.url), JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), sports: out }, null, 2) + "\n")

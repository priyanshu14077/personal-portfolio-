// Builds src/data/radio.json from the playlists in src/data/radio-stations.json.
// Reads each public playlist page for its tracks, then keeps only tracks YouTube allows to embed
// (its oEmbed endpoint answers 401 for videos whose owner disabled embedding). Run: npm run radio
import { readFileSync, writeFileSync } from "node:fs"

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
const stations = JSON.parse(readFileSync(new URL("../src/data/radio-stations.json", import.meta.url)))

function tracksFrom(data) {
  const out = []
  const walk = (o) => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== "object") return
    if (o.playlistVideoRenderer) {
      const r = o.playlistVideoRenderer
      out.push({ id: r.videoId, title: r.title?.runs?.map((x) => x.text).join("") ?? "", artist: r.shortBylineText?.runs?.map((x) => x.text).join("") ?? "" })
    } else if (o.lockupViewModel?.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      const l = o.lockupViewModel
      const meta = l.metadata?.lockupMetadataViewModel
      const rows = meta?.metadata?.contentMetadataViewModel?.metadataRows ?? []
      const artist = rows[0]?.metadataParts?.[0]?.text?.content ?? ""
      out.push({ id: l.contentId, title: meta?.title?.content ?? "", artist })
    }
    Object.values(o).forEach(walk)
  }
  walk(data)
  return [...new Map(out.filter((t) => t.id).map((t) => [t.id, t])).values()]
}

async function embeddable(id) {
  const r = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`)
  if (r.status !== 200) return null
  const j = await r.json()
  return { title: j.title, artist: (j.author_name ?? "").replace(/ - Topic$/, "") }
}

const result = []
for (const s of stations) {
  const html = await (await fetch(`https://www.youtube.com/playlist?list=${s.playlist}`, { headers: { "user-agent": UA, "accept-language": "en-US" } })).text()
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)
  const found = m ? tracksFrom(JSON.parse(m[1])) : []
  const tracks = []
  for (let i = 0; i < found.length; i += 8) {
    const batch = await Promise.all(found.slice(i, i + 8).map(async (t) => ({ t, ok: await embeddable(t.id) })))
    for (const { t, ok } of batch) if (ok) tracks.push({ id: t.id, title: t.title || ok.title, artist: (t.artist || ok.artist).replace(/ - Topic$/, "") })
  }
  console.log(`${s.freq} ${s.name}: ${tracks.length}/${found.length} tracks embeddable`)
  result.push({ ...s, tracks })
}
writeFileSync(new URL("../src/data/radio.json", import.meta.url), JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), stations: result }, null, 2) + "\n")

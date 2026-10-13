/** Three small illustrated stubs in the site's postcard style, one per sport. */

function Shuttlecock() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <g transform="rotate(-28 60 60)">
        <path d="M44 22 L76 22 L68 74 L52 74 Z" fill="#f2ede2" stroke="#26364f" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M52 22 L55 74 M60 22 L60 74 M68 22 L65 74" stroke="#26364f" strokeOpacity="0.45" strokeWidth="1.6" />
        <path d="M46 38 H74 M48 54 H72" stroke="#a9c1d6" strokeWidth="2.4" />
        <ellipse cx="60" cy="84" rx="13" ry="12" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
        <path d="M49 78 H71" stroke="#26364f" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

function CricketBat() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <g transform="rotate(35 60 60)">
        <rect x="56" y="10" width="8" height="30" rx="3" fill="#26364f" />
        <path d="M56 18 H64 M56 24 H64 M56 30 H64" stroke="#a9c1d6" strokeWidth="1.6" />
        <path d="M50 40 H70 L68 104 Q60 110 52 104 Z" fill="#e6dfcf" stroke="#26364f" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M60 46 V100" stroke="#26364f" strokeOpacity="0.25" strokeWidth="2" />
      </g>
      <circle cx="30" cy="88" r="11" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
      <path d="M22 82 Q30 88 38 94" fill="none" stroke="#f2ede2" strokeWidth="1.8" strokeDasharray="2.5 2.5" />
    </svg>
  )
}

function Basketball() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <circle cx="54" cy="58" r="34" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
      <path d="M20 58 H88 M54 24 V92" stroke="#26364f" strokeWidth="2.2" />
      <path d="M30 34 Q48 58 30 82 M78 34 Q60 58 78 82" fill="none" stroke="#26364f" strokeWidth="2.2" />
      <g transform="rotate(8 92 92)">
        <rect x="78" y="78" width="30" height="24" rx="4" fill="#f2ede2" stroke="#26364f" strokeWidth="2" />
        <text x="93" y="96" textAnchor="middle" fontFamily="Newsreader, Georgia, serif" fontSize="16" fill="#26364f">77</text>
      </g>
    </svg>
  )
}

const sports = [
  { name: "Badminton", note: "I play often, and I'm a big fan of the sport.", art: <Shuttlecock /> },
  { name: "Cricket", note: "I play often.", art: <CricketBat /> },
  { name: "Basketball", note: "I play often, and I'm a big Luka Dončić fan.", art: <Basketball /> },
]

export function Sports() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {sports.map((s) => (
        <li key={s.name} className="relative overflow-hidden rounded-md border border-dashed border-ink/30 bg-paper p-5 shadow-[0_12px_28px_-22px_rgba(20,33,58,0.5)]">
          {/* Ticket-stub notches */}
          <span aria-hidden="true" className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border border-dashed border-ink/30 bg-paper" />
          <span aria-hidden="true" className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border border-dashed border-ink/30 bg-paper" />
          <div className="flex items-center gap-4 pl-2">
            {s.art}
            <div>
              <p className="font-display text-[24px] leading-tight text-ink">{s.name}</p>
              <p className="mt-1 text-[15px] leading-[1.5] text-ink/75">{s.note}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

import type * as React from "react"

export type PostcardScene = "dawn" | "peak" | "lake" | "sun" | "forest" | "river" | "night"

export interface PostcardProject {
  name: string
  year: string
  role: string
  description: string
  tags?: string[]
  url?: string
  /** Handwritten caption under the polaroid. Falls back to `name`. */
  note?: string
  /** Illustrated scene when there is no `image`. */
  scene?: PostcardScene
  image?: string
}

export interface PostcardStop {
  /** Shown on the map pin and as the card heading. */
  org?: string
  /** Date label on the pin, e.g. "Oct 2025". */
  year: string
  /** Role, shown under `org` on the card. */
  title: string
  place: string
  text: string
}

export interface PostcardAbout {
  title?: string
  subtitle?: string
  text?: string
  facts?: { label: string; value: string }[]
  skills?: string[]
}

export interface PostcardPalette {
  navy?: string
  deep?: string
  fog?: string
  paper?: string
  ink?: string
  accent?: string
  tape?: string
}

export interface TornPostcardPortfolioProps {
  name?: string
  role?: string
  location?: string
  since?: string
  headline?: [string, string] | string[]
  intro?: string
  /** Handwritten note on the cover. */
  note?: string
  about?: PostcardAbout
  projects?: PostcardProject[]
  route?: PostcardStop[]
  email?: string
  links?: { label: string; url: string }[]
  /** Exactly five: cover, about, work, route, contact. */
  labels?: string[]
  workTitle?: string
  routeTitle?: string
  contactTitle?: string
  palette?: PostcardPalette
  scrollPerChapter?: number
  smooth?: boolean
  snap?: boolean
  animateIn?: boolean
  snow?: boolean
  height?: string
  className?: string
}

export declare function TornPostcardPortfolio(props: TornPostcardPortfolioProps): React.JSX.Element
export default TornPostcardPortfolio

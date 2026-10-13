import type { ThemeRegistrationRaw } from "shiki"

// rehype-pretty-code recognises a theme object by its `tokenColors`; shiki's type wants `settings`.
type Theme = Omit<ThemeRegistrationRaw, "settings"> & { tokenColors: NonNullable<ThemeRegistrationRaw["tokenColors"]> }

// Syntax colours for code blocks, built only from the site's palette in src/index.css:
// code sits on `deep`, plain text is `paper`, keywords `tape`, strings `accent`,
// functions `paper-dim`, types and numbers `tape` at 70%, comments `fog` at 60%.
const deep = "#14213a"
const paper = "#f2ede2"
const paperDim = "#e6dfcf"
const fog = "#d5d0c3"
const tape = "#a9c1d6"
const accent = "#b4673d"

export const codeTheme = {
  name: "postcard-night",
  type: "dark",
  colors: { "editor.background": deep, "editor.foreground": paper },
  tokenColors: [
    { settings: { background: deep, foreground: paper } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: `${fog}99`, fontStyle: "italic" } },
    {
      scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.control"],
      settings: { foreground: tape },
    },
    { scope: ["string", "string.quoted", "string.template", "constant.other.symbol"], settings: { foreground: accent } },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call", "entity.name.tag", "entity.other.attribute-name"],
      settings: { foreground: paperDim },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "meta.type",
      ],
      settings: { foreground: `${tape}b3` },
    },
    { scope: ["variable", "variable.parameter", "punctuation", "meta.brace"], settings: { foreground: paper } },
    { scope: ["markup.heading"], settings: { foreground: tape, fontStyle: "bold" } },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
  ],
} satisfies Theme

import { useEffect } from "react"

const SITE_TITLE = "Priyanshu Kumar Singh"

/** Sets the tab title and meta description for the current route, restoring the site defaults on unmount. */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = `${title} · ${SITE_TITLE}`
    if (meta && description) meta.content = description
    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) meta.content = previousDescription
    }
  }, [title, description])
}

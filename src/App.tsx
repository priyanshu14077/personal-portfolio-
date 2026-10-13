import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"

// Each page is its own chunk: the home page carries the heavy scroll story, the blog pages stay light.
const HomePage = lazy(() => import("@/pages/home"))
const BlogIndexPage = lazy(() => import("@/pages/blog-index"))
const BlogTagPage = lazy(() => import("@/pages/blog-tag"))
const BlogPostPage = lazy(() => import("@/pages/blog-post"))
const NotFoundPage = lazy(() => import("@/pages/not-found"))

/** Starts every new page at the top; in-page hash links keep their target. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-svh bg-deep" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/tags/:tag" element={<BlogTagPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

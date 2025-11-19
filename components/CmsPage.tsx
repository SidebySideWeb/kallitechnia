"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useEffect, useRef, useState } from "react"
import { fetchPage, type Page } from "@/lib/api"
import { BlockRenderer } from "@/components/blocks/BlockRenderer"

interface CmsPageProps {
  slug: string
  fallback?: React.ReactNode
}

export function CmsPage({ slug, fallback }: CmsPageProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const observeElements = () => {
      const elements = document.querySelectorAll(".fade-in-section")
      elements.forEach((el) => observerRef.current?.observe(el))
    }

    observeElements()

    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [page])

  useEffect(() => {
    async function loadPage() {
      try {
        const pageData = await fetchPage(slug)
        if (pageData) {
          // Debug: Log page data structure
          if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.log(`[CmsPage] Loaded page "${slug}":`, pageData)
            console.log(`[CmsPage] Blocks:`, pageData.blocks)
          }
          setPage(pageData)
        } else {
          console.warn(`[CmsPage] Page "${slug}" not found in CMS`)
        }
      } catch (error) {
        console.error(`[CmsPage] Failed to load page "${slug}":`, error)
      } finally {
        setLoading(false)
      }
    }
    loadPage()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  try {
    // Only use CMS content if it exists and has valid blocks
    const hasValidCmsContent = page?.blocks && Array.isArray(page.blocks) && page.blocks.length > 0
    
    return (
      <div className="min-h-screen">
        <Navigation />
        {hasValidCmsContent ? (
          <BlockRenderer blocks={page.blocks} />
        ) : (
          // Always show fallback if CMS content is not available or invalid
          fallback || (
            <div className="container mx-auto px-4 py-20">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">
                {page?.headline || page?.title || "Page"}
              </h1>
              {page?.title && page.title !== (page.headline || page.title) && (
                <p className="text-xl text-muted-foreground mb-8">{page.title}</p>
              )}
            </div>
          )
        )}
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('[CmsPage] Error rendering page:', error, { slug, page })
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Error Loading Page</h1>
            <p className="text-red-700 mb-4">
              There was an error loading this page. Please check the CMS content.
            </p>
            {fallback && <div className="mt-4">{fallback}</div>}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}


"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useEffect, useRef, useState } from "react"
import { fetchPage, type Page } from "@/lib/api"
import { BlockRenderer } from "@/components/blocks/BlockRenderer"
import { use } from "react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function DynamicPage({ params }: PageProps) {
  const { slug } = use(params)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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
        if (!pageData) {
          setNotFound(true)
        } else {
          setPage(pageData)
        }
      } catch (error) {
        console.error("Failed to load page:", error)
        setNotFound(true)
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

  if (notFound || !page) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      {page.blocks && page.blocks.length > 0 ? (
        <BlockRenderer blocks={page.blocks} />
      ) : (
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">
            {page.headline || page.title}
          </h1>
          {page.title && page.title !== (page.headline || page.title) && (
            <p className="text-xl text-muted-foreground mb-8">{page.title}</p>
          )}
        </div>
      )}
      <Footer />
    </div>
  )
}


import { headers } from "next/headers"

import Footer from "@/components/Footer"
import { mapKalitechniaTerms } from "@/lib/page-content"
import { createKalitechniaClient, fetchFooterData, fetchPageContent } from "@/lib/server/content"

export default async function TermsPage() {
  const headersList = await headers()
  const hostname = headersList.get("host") ?? undefined
  const client = await createKalitechniaClient(hostname)

  const [page, footerData] = await Promise.all([
    fetchPageContent(client, "kalitechnia-terms", 2),
    fetchFooterData(client),
  ])

  const data = mapKalitechniaTerms(page)

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-secondary py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-white blur-3xl animate-pulse"
            style={{ animationDelay: "1.2s" }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-balance text-5xl font-bold text-white drop-shadow-lg md:text-6xl">{data.heroTitle}</h1>
          <p className="mt-6 text-lg text-white/80">Τελευταία ενημέρωση: {data.lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-4 py-16">
        {data.sections.map((section, index) => (
          <article key={`${section.heading}-${index}`} className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">{section.heading}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </section>

      <Footer data={footerData} />
    </div>
  )
}



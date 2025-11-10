import Image from "next/image"
import { headers } from "next/headers"

import Footer from "@/components/Footer"
import { mapKalitechniaAbout } from "@/lib/page-content"
import { createKalitechniaClient, extractSections, fetchFooterData, fetchPageContent } from "@/lib/server/content"

export default async function AboutPage() {
  const headersList = await headers()
  const hostname = headersList.get("host") ?? undefined

  const client = await createKalitechniaClient(hostname)
  const [page, footerData] = await Promise.all([
    fetchPageContent(client, "kalitechnia-about", 2),
    fetchFooterData(client),
  ])

  const content = extractSections(page)
  const data = mapKalitechniaAbout(content)

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-accent via-primary to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance animate-fade-in-up text-white drop-shadow-lg">
              {data.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {data.introParagraphs.map((paragraph, index) => (
              <p key={index} className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="py-8">
              <p className="text-2xl md:text-3xl font-semibold text-primary italic transition-transform duration-300 hover:scale-105">
                {data.quote}
              </p>
            </div>
            <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <p className="text-xl md:text-2xl font-bold text-white">{data.mottoTitle}</p>
              {data.mottoLines.map((line, index) => (
                <p key={index} className="text-2xl md:text-3xl font-bold text-white mt-4">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 hover:scale-105 transition-transform">
              {data.artSection.title}
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-secondary">{data.artSection.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground">
            {data.artSection.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="text-xl font-semibold text-primary text-center py-6">
              Η γυμναστική δεν είναι απλώς άσκηση – είναι έκφραση, ρυθμός, παρουσία.
              <br />
              Είναι Καλλιτεχνία.
            </p>
          </div>
        </div>
      </section>

      {data.storySections.map((section, sectionIndex) => (
        <section
          key={section.title}
          className={`py-20 ${sectionIndex % 2 === 0 ? "bg-background" : "bg-white"}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div
                  className={`relative h-[500px] rounded-2xl overflow-hidden shadow-lg group ${
                    section.imagePosition === "right" ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Image
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div
                  className={`space-y-6 ${section.imagePosition === "right" ? "md:order-1" : "md:order-2"}`}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-balance transition-colors hover:text-secondary">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">
              {data.spaces.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.spaces.items.map((space) => (
                <div
                  key={space.title}
                  className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <Image
                    src={space.image || "/placeholder.svg"}
                    alt={space.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white font-medium">{space.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </div>
  )
}


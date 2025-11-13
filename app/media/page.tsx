import Image from "next/image"
import { Download, Facebook, Instagram, Youtube } from "lucide-react"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mapKalitechniaMedia } from "@/lib/page-content"
import { extractSections, fetchFooterData, fetchPageContent } from "@/lib/server/content"

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={props.className}>
      <path d="M20 6.5c-1.1-.3-2.1-.9-2.8-1.7-.6-.7-1-1.6-1.1-2.6H13v12.7c0 1.9-1.5 3.4-3.3 3.4-1.8 0-3.4-1.5-3.4-3.4 0-1.8 1.6-3.3 3.4-3.3.4 0 .8.1 1.2.2V9c-.4-.1-.8-.1-1.2-.1-3.6 0-6.5 2.9-6.5 6.5S6 22 9.6 22c3.6 0 6.4-2.9 6.4-6.5V9.7c1.3 1 2.9 1.7 4.6 1.8V6.9c-.2 0-.4 0-.6-.1z" />
    </svg>
  ),
}

export default async function MediaPage() {
  const [page, footerData] = await Promise.all([fetchPageContent("kallitechnia-media", 2), fetchFooterData()])

  const content = extractSections(page)
  const data = mapKalitechniaMedia(content)

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-secondary py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-10 h-72 w-72 animate-pulse rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-balance text-5xl font-bold text-white drop-shadow-lg md:text-6xl">{data.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90 drop-shadow-md">{data.hero.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Επίσημα Λογότυπα</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.logos.map((logo, index) => (
              <Card key={`${logo.title}-${index}`} className="p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="mb-4 flex min-h-[200px] items-center justify-center rounded-lg bg-muted p-8">
                  <Image src={logo.image || "/placeholder.svg"} alt={logo.title} width={220} height={120} className="h-auto max-w-full" />
                </div>
                <h3 className="text-lg font-semibold">{logo.title}</h3>
                {Array.isArray(logo.formats) && logo.formats.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {logo.formats.map((format, formatIndex) => (
                      <Button
                        key={`${logo.title}-format-${formatIndex}`}
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        asChild
                      >
                        <a href={logo.downloadUrl ?? logo.image ?? "#"} download>
                          <Download className="mr-2 h-4 w-4" />
                          {format}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Φωτογραφίες</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.photos.map((photo, index) => (
              <div key={`${photo.title}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex w-full items-center justify-between p-4 text-white">
                    <span className="font-medium">{photo.title}</span>
                    <Button variant="secondary" size="sm" asChild>
                      <a href={photo.downloadUrl ?? photo.image ?? "#"} download>
                        <Download className="mr-2 h-4 w-4" />
                        Λήψη
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Banners</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.banners.map((banner, index) => (
              <Card key={`${banner.title}-${index}`} className="overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/9]">
                  <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{banner.title}</h3>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <a href={banner.downloadUrl ?? banner.image ?? "#"} download>
                      <Download className="mr-2 h-4 w-4" />
                      Λήψη
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Ακολουθήστε μας</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.socials.map((social, index) => {
              const Icon = socialIcons[social.icon as keyof typeof socialIcons] ?? socialIcons.facebook
              return (
                <Card
                  key={`${social.platform}-${index}`}
                  className="flex flex-col items-center justify-center gap-4 p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold">{social.platform}</h3>
                  <Button variant="outline" size="sm" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      Επισκεφθείτε
                    </a>
                  </Button>
                </Card>
              )
            })}
          </div>
        </section>
      </div>

      <Footer data={footerData} />
    </div>
  )
}


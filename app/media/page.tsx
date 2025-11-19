"use client"

import { CmsPage } from "@/components/CmsPage"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Download, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function MediaPageFallback() {
  const logos = [
    {
      title: "Λογότυπο Κύριο",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png",
      formats: ["PNG", "SVG"],
    },
  ]

  const photos = [
    {
      title: "Παράσταση με Καρδιές",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg",
    },
    {
      title: "Δραματική Παράσταση",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg",
    },
    {
      title: "Ατμοσφαιρική Παράσταση",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg",
    },
    {
      title: "Συγχρονισμένες Κινήσεις",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg",
    },
    {
      title: "Παράσταση με Φώτα",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg",
    },
    {
      title: "UV Παράσταση",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg",
    },
  ]

  const banners = [
    {
      title: "Κυματιστό Banner",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/503CB8FC-1A4E-4DD7-8E71-01239C3390BF.png-kKnLsmzgkUfG8nhQNxqb022nHJnt3l.jpeg",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="relative bg-gradient-to-br from-accent via-primary to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-fade-in-up">Media</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Κατεβάστε επίσημο υλικό του συλλόγου και ακολουθήστε μας στα social media
          </p>
        </div>
      </section>
      {/* End of updated hero section */}

      <div className="container mx-auto px-4 py-16">
        {/* Official Logos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Επίσημα Λογότυπα</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logos.map((logo, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="bg-muted rounded-lg p-8 mb-4 flex items-center justify-center min-h-[200px]">
                  <Image
                    src={logo.image || "/placeholder.svg"}
                    alt={logo.title}
                    width={200}
                    height={100}
                    className="max-w-full h-auto"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-3">{logo.title}</h3>
                <div className="flex gap-2">
                  {logo.formats.map((format) => (
                    <Button key={format} variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      {format}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Photos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Φωτογραφίες</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <p className="text-white font-medium mb-2">{photo.title}</p>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Λήψη
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Banners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((banner, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9]">
                  <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{banner.title}</h3>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Λήψη
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-8">Ακολουθήστε μας</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Facebook className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Facebook</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Επισκεφθείτε
                </a>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instagram</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Επισκεφθείτε
                </a>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">TikTok</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  Επισκεφθείτε
                </a>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">YouTube</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Επισκεφθείτε
                </a>
              </Button>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default function MediaPage() {
  return <CmsPage slug="media" fallback={<MediaPageFallback />} />
}

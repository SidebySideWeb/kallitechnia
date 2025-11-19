"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { fetchLatestPosts, fetchHomepage, getImageUrl, type Post, type Page } from "@/lib/api"
import { BlockRenderer } from "@/components/blocks/BlockRenderer"

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [homepage, setHomepage] = useState<Page | null>(null)
  const [loadingHomepage, setLoadingHomepage] = useState(true)

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

    // Re-observe elements when homepage blocks are loaded
    const observeElements = () => {
      const elements = document.querySelectorAll(".fade-in-section")
      elements.forEach((el) => observerRef.current?.observe(el))
    }

    // Initial observation
    observeElements()

    // Re-observe after a short delay to catch dynamically rendered blocks
    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [homepage])

  // Fetch homepage from CMS
  useEffect(() => {
    async function loadHomepage() {
      try {
        const homepageData = await fetchHomepage()
        setHomepage(homepageData)
      } catch (error) {
        console.error("Failed to load homepage:", error)
      } finally {
        setLoadingHomepage(false)
      }
    }
    loadHomepage()
  }, [])

  // Fetch latest posts from CMS
  useEffect(() => {
    async function loadPosts() {
      try {
        const latestPosts = await fetchLatestPosts(3)
        setPosts(latestPosts)
      } catch (error) {
        console.error("Failed to load posts:", error)
      } finally {
        setLoadingPosts(false)
      }
    }
    loadPosts()
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Render CMS Blocks if homepage exists */}
      {!loadingHomepage && homepage?.blocks && homepage.blocks.length > 0 ? (
        <BlockRenderer blocks={homepage.blocks} />
      ) : (
        <>
          {/* Fallback: Static Hero Section */}
          <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg"
            alt="Προπόνηση γυμναστικής"
            fill
            className="object-cover animate-ken-burns"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-balance">
              Η Γυμναστική είναι δύναμη, χαρά, δημιουργία.
            </h1>
            <Button
              size="lg"
              className="bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-all text-lg px-8 shadow-lg"
            >
              <Link href="/programs">Δες τα Τμήματά μας</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Καλωσόρισμα από την Ιδρύτρια */}
      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg"
                alt="Ελένη Δαρδαμάνη - Ιδρύτρια"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-medium mb-6 text-balance hover:text-primary transition-colors">
                Καλώς ήρθατε στην Καλλιτεχνία!
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Είμαι η Ελένη Δαρδαμάνη, ιδρύτρια του συλλόγου μας. Με πάθος και αφοσίωση, δημιουργήσαμε έναν χώρο όπου
                κάθε παιδί μπορεί να εκφραστεί, να αναπτυχθεί και να λάμψει μέσα από τη γυμναστική.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Η Καλλιτεχνία δεν είναι απλώς ένας σύλλογος - είναι μια οικογένεια που υποστηρίζει κάθε αθλητή στο
                ταξίδι του προς την αριστεία.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Ελάτε να γνωρίσετε τον κόσμο της γυμναστικής μαζί μας!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Τα Τμήματά μας */}
      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance">Τα Τμήματά μας</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Προσφέρουμε προγράμματα για όλες τις ηλικίες και τα επίπεδα
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="border-2 hover:border-primary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg"
                  alt="Καλλιτεχνική Γυμναστική"
                  fill
                  className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-3">Καλλιτεχνική</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Αναπτύξτε δύναμη, ευλυγισία και χάρη μέσα από την καλλιτεχνική γυμναστική
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary hover:text-white transition-all"
                  asChild
                >
                  <Link href="/programs#kallitexniki">Μάθετε Περισσότερα</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-2 hover:border-secondary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6340%20%281%29-6T0A1KQPyDVi8Gr7ev3c5o4qGRiEuW.jpeg"
                  alt="Ρυθμική Γυμναστική"
                  fill
                  className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-3">Ρυθμική</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Συνδυάστε χορό, μουσική και γυμναστική με όργανα όπως κορδέλα και μπάλα
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-secondary hover:text-white transition-all"
                  asChild
                >
                  <Link href="/programs#rythmiki">Μάθετε Περισσότερα</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-2 hover:border-accent transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg"
                  alt="Προαγωνιστικά Τμήματα"
                  fill
                  className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-3">Προαγωνιστικά</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Εντατική προετοιμασία για αθλητές που στοχεύουν σε αγώνες και διακρίσεις
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-accent hover:text-white transition-all"
                  asChild
                >
                  <Link href="/programs#proagonistika">Μάθετε Περισσότερα</Link>
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-2 hover:border-primary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg"
                  alt="Παιδικά Τμήματα"
                  fill
                  className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-3">Παιδικά</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Εισαγωγή στη γυμναστική για παιδιά 4-7 ετών με παιχνίδι και διασκέδαση
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary hover:text-white transition-all"
                  asChild
                >
                  <Link href="/programs#paidika">Μάθετε Περισσότερα</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">Οι Στιγμές μας</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Ζήστε τη μαγεία των παραστάσεων και των προπονήσεών μας
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg"
                alt="UV Performance"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-medium mb-2 leading-relaxed">UV Παράσταση</h3>
                  <p className="text-sm">Μοναδικές στιγμές στη σκηνή</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6068%20%281%29-Vk2nWKd2qSVzRl2ldqmb919zO5TCf9.jpeg"
                alt="Group Performance"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-medium mb-2 leading-relaxed">Ομαδική Παράσταση</h3>
                  <p className="text-sm">Συγχρονισμός και αρμονία</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg"
                alt="Young Performers"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-medium mb-2 leading-relaxed">Νεαρές Αθλήτριες</h3>
                  <p className="text-sm">Το μέλλον της γυμναστικής</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Νέα & Ανακοινώσεις */}
      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium mb-2 text-balance">Νέα & Ανακοινώσεις</h2>
              <p className="text-muted-foreground text-lg">Μείνετε ενημερωμένοι με τα τελευταία μας νέα</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="hidden md:flex bg-transparent hover:scale-105 transition-transform"
            >
              <Link href="/news">
                Όλα τα Νέα
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {loadingPosts ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-2xl overflow-hidden p-0 gap-0 animate-pulse">
                  <div className="relative h-56 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-3 w-32" />
                    <div className="h-6 bg-muted rounded mb-3 w-full" />
                    <div className="h-4 bg-muted rounded mb-2 w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = getImageUrl(post.featuredImage)
                const publishedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("el-GR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""

                return (
                  <Card
                    key={post.id}
                    className="rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-0 gap-0"
                  >
                    {imageUrl && (
                      <div className="relative h-56 overflow-hidden group">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      {publishedDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>{publishedDate}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-medium mb-3 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                      )}
                      <Button variant="link" className="p-0 hover:translate-x-2 transition-transform" asChild>
                        <Link href={`/news/${post.slug}`}>
                          Διαβάστε περισσότερα
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Δεν υπάρχουν διαθέσιμα νέα αυτή τη στιγμή.</p>
            </div>
          )}
          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild>
              <Link href="/news">
                Όλα τα Νέα
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Χορηγοί */}
      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">Οι Υποστηρικτές μας</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Ευχαριστούμε θερμά τους υποστηρικτές μας</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 flex items-center justify-center h-32 hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-primary cursor-pointer"
              >
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-semibold text-muted-foreground">Χορηγός {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="gradient-purple-orange rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-medium mb-6 text-balance animate-fade-in-up leading-relaxed">
                Έλα κι εσύ στην οικογένεια της Καλλιτεχνίας!
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Ξεκινήστε το ταξίδι σας στον κόσμο της γυμναστικής. Προσφέρουμε δωρεάν δοκιμαστικό μάθημα!
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 hover:scale-110 transition-all duration-300 text-lg px-8 shadow-2xl"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Επικοινώνησε μαζί μας
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

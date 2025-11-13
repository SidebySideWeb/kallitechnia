import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mapKalitechniaNewsList } from "@/lib/page-content"
import { extractSections, fetchFooterData, fetchPageContent, fetchPosts } from "@/lib/server/content"
import { isRecord } from "@/lib/utils"

export default async function NewsPage() {
  const [page, footerData, posts] = await Promise.all([
    fetchPageContent("kallitechnia-news", 2),
    fetchFooterData(),
    fetchPosts({ limit: 36 }),
  ])

  const content = extractSections(page)
  const postsList = Array.isArray(posts) ? posts.map((doc) => (isRecord(doc) ? doc : {})) : []
  const data = mapKalitechniaNewsList(content, postsList)

  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-balance text-5xl font-bold text-white drop-shadow-lg md:text-7xl">{data.hero.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-white/95 drop-shadow">{data.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.posts.map((post, index) => (
              <Card
                key={`${post.slug}-${post.id}-${index}`}
                className="group overflow-hidden rounded-2xl border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <CardTitle className="text-balance text-2xl leading-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="line-clamp-4 text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center text-base font-semibold text-primary transition-colors hover:text-secondary"
                  >
                    Περισσότερα
                    <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}

            {data.posts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-muted-foreground/30 bg-muted/20 px-6 py-20 text-center">
                <p className="text-lg text-muted-foreground">Δεν υπάρχουν δημοσιεύσεις αυτή τη στιγμή.</p>
                <p className="mt-2 text-sm text-muted-foreground/80">Επιστρέψτε σύντομα για περισσότερα νέα.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </div>
  )
}

function formatDate(value: string | undefined) {
  if (!value) return ""
  const parsed = Date.parse(value)
  if (!Number.isNaN(parsed)) {
    return new Intl.DateTimeFormat("el-GR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(parsed))
  }
  return value
}


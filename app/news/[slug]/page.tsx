import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, User } from "lucide-react"

import Footer from "@/components/Footer"
import { mapKalitechniaNewsPost } from "@/lib/page-content"
import { fetchFooterData, fetchPostBySlug } from "@/lib/server/content"

type NewsPostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params

  const [postDoc, footerData] = await Promise.all([fetchPostBySlug(slug), fetchFooterData()])
  const post = mapKalitechniaNewsPost(postDoc)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <section className="relative max-h-[650px] min-h-[400px] overflow-hidden">
        {post.heroImage ? (
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary via-secondary to-accent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-balance text-4xl font-bold text-white drop-shadow-lg md:text-6xl">{post.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.date)}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-3xl text-foreground prose-headings:text-primary prose-a:text-accent">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </div>
      </article>

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


"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { KalitechniaHomepageData } from "@/lib/content-mappers"

interface HomePageClientProps {
  data: KalitechniaHomepageData
}

export default function HomePageClient({ data }: HomePageClientProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)

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

    const elements = document.querySelectorAll(".fade-in-section")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.hero.backgroundImage}
            alt={data.hero.headline}
            fill
            className="object-cover animate-ken-burns"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              {data.hero.headline}
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">{data.hero.subheadline}</p>
            <Button
              size="lg"
              className="bg-secondary px-8 text-lg text-white shadow-lg transition-all hover:scale-105 hover:bg-secondary/90"
              asChild
            >
              <Link href={data.hero.ctaHref}>{data.hero.ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="fade-in-section opacity-0 bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-xl md:h-[500px]">
              <Image
                src={data.welcome.image}
                alt={data.welcome.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="space-y-4">
              <h2 className="text-balance text-4xl font-bold transition-colors hover:text-primary md:text-5xl">
                {data.welcome.title}
              </h2>
              {data.welcome.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="fade-in-section opacity-0 bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-balance text-center text-4xl font-bold md:text-5xl">{data.programs.title}</h2>
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            {data.programs.subtitle}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.programs.items.map((item, index) => (
              <Card
                key={`${item.title}-${index}`}
                className="group animate-fade-in-up overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{item.description}</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent transition-all hover:bg-primary hover:text-white"
                    asChild
                  >
                    <Link href={item.linkHref}>{item.linkLabel}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="fade-in-section opacity-0 bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-balance text-center text-4xl font-bold md:text-5xl">{data.gallery.title}</h2>
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            {data.gallery.subtitle}
          </p>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {data.gallery.items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                    {item.caption && <p className="text-sm">{item.caption}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="fade-in-section opacity-0 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-balance text-4xl font-bold md:text-5xl">{data.news.title}</h2>
              <p className="text-lg text-muted-foreground">{data.news.subtitle}</p>
            </div>
            <Button variant="outline" asChild className="hidden bg-transparent transition-transform hover:scale-105 md:flex">
              <Link href="/news">
                Όλα τα Νέα
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {data.news.items.map((item, index) => (
              <Card
                key={`${item.title}-${index}`}
                className="overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="group relative h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors hover:text-primary">{item.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{item.summary}</p>
                  <Button variant="link" className="p-0 transition-transform hover:translate-x-2" asChild>
                    <Link href={item.href}>
                      Διαβάστε περισσότερα
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/news">
                Όλα τα Νέα
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="fade-in-section opacity-0 bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-balance text-center text-4xl font-bold md:text-5xl">{data.sponsors.title}</h2>
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            {data.sponsors.subtitle}
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
            {data.sponsors.items.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-transparent bg-white p-6 transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-xl"
              >
                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 h-12 w-12 text-primary animate-pulse" />
                  <p className="text-sm font-semibold text-muted-foreground">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="fade-in-section opacity-0 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-purple-orange relative overflow-hidden rounded-3xl p-12 text-center text-white transition-transform duration-500 hover:scale-[1.02] md:p-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-white blur-3xl" />
              <div
                className="absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-white blur-3xl"
                style={{ animationDelay: '1s' }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-balance text-4xl font-bold md:text-5xl">{data.cta.title}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed">{data.cta.subtitle}</p>
              <Button
                size="lg"
                className="mt-8 px-8 text-lg text-primary shadow-2xl transition-all duration-300 hover:scale-110"
                asChild
              >
                <Link href={data.cta.buttonHref} className="flex items-center gap-2 text-primary">
                  {data.cta.buttonLabel}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

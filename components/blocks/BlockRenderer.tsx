"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getImageUrl } from "@/lib/api"

interface BlockRendererProps {
  blocks?: any[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (!block.blockType) return null

        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={block.id || index} block={block} />
          case "imageText":
            return <ImageTextBlock key={block.id || index} block={block} />
          case "cardGrid":
            return <CardGridBlock key={block.id || index} block={block} />
          case "programs":
            return <ProgramsBlock key={block.id || index} block={block} />
          case "imageGallery":
            return <ImageGalleryBlock key={block.id || index} block={block} />
          case "sponsors":
            return <SponsorsBlock key={block.id || index} block={block} />
          case "richText":
            return <RichTextBlock key={block.id || index} block={block} />
          default:
            console.warn(`Unknown block type: ${block.blockType}`)
            return null
        }
      })}
    </>
  )
}

function HeroBlock({ block }: { block: any }) {
  const imageUrl = getImageUrl(block.backgroundImage)
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const ctaLabel = block.ctaLabel
  const ctaUrl = block.ctaUrl || "/"

  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover animate-ken-burns"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        </div>
      )}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl text-white animate-fade-in-up">
          {title && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-balance">
              {title}
            </h1>
          )}
          {subtitle && <p className="text-xl mb-6">{subtitle}</p>}
          {ctaLabel && (
            <Button
              size="lg"
              className="bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-all text-lg px-8 shadow-lg"
              asChild
            >
              <Link href={ctaUrl}>{ctaLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

function ImageTextBlock({ block }: { block: any }) {
  const imageUrl = getImageUrl(block.image)
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const content = block.content
  const imagePosition = block.imagePosition || "left"

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${
            imagePosition === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {imageUrl && (
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="space-y-4">
            {title && (
              <h2 className="text-4xl md:text-5xl font-medium mb-6 text-balance hover:text-primary transition-colors">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                {subtitle}
              </p>
            )}
            {content && (
              <div className="text-lg leading-relaxed text-muted-foreground prose prose-lg max-w-none">
                {/* Rich text content would need a proper renderer */}
                <p>{JSON.stringify(content)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CardGridBlock({ block }: { block: any }) {
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const cards = block.cards || []

  return (
    <section className="py-20 bg-background fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card: any, index: number) => {
            const imageUrl = getImageUrl(card.image)
            return (
              <Card
                key={card.id || index}
                className="border-2 hover:border-primary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={card.title || ""}
                      fill
                      className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  </div>
                )}
                <CardContent className="p-6">
                  {card.title && (
                    <h3 className="text-2xl font-medium mb-3">{card.title}</h3>
                  )}
                  {card.description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {card.description}
                    </p>
                  )}
                  {card.buttonLabel && card.buttonUrl && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent hover:bg-primary hover:text-white transition-all"
                      asChild
                    >
                      <Link href={card.buttonUrl}>{card.buttonLabel}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProgramsBlock({ block }: { block: any }) {
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const programs = block.programs || []

  return (
    <section className="py-20 bg-background fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program: any, index: number) => {
            const imageUrl = getImageUrl(program.image)
            return (
              <Card
                key={program.id || index}
                className="border-2 hover:border-primary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={program.title || ""}
                      fill
                      className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  </div>
                )}
                <CardContent className="p-6">
                  {program.title && (
                    <h3 className="text-2xl font-medium mb-3">{program.title}</h3>
                  )}
                  {program.description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ImageGalleryBlock({ block }: { block: any }) {
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const images = block.images || []

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image: any, index: number) => {
            const imageUrl = getImageUrl(image.image)
            if (!imageUrl) return null
            return (
              <div
                key={image.id || index}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={image.caption || title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {image.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-medium mb-2 leading-relaxed">
                        {image.caption}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SponsorsBlock({ block }: { block: any }) {
  const title = block.title || ""
  const subtitle = block.subtitle || ""
  const sponsors = block.sponsors || []

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-center text-muted-foreground text-lg mb-12">
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
          {sponsors.map((sponsor: any, index: number) => {
            const logoUrl = getImageUrl(sponsor.logo)
            return (
              <div
                key={sponsor.id || index}
                className="bg-white rounded-xl p-6 flex items-center justify-center h-32 hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-primary cursor-pointer"
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={sponsor.name || "Sponsor"}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {sponsor.name || `Sponsor ${index + 1}`}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RichTextBlock({ block }: { block: any }) {
  const content = block.content

  if (!content) return null

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {/* Rich text content would need a proper renderer like @payloadcms/richtext-slate */}
          <p>{JSON.stringify(content)}</p>
        </div>
      </div>
    </section>
  )
}


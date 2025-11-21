"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react"
import { getImageUrl } from "@/lib/api"
import { DEFAULT_IMAGES, DEFAULT_CONTENT } from "@/lib/defaults"
import { ContactDetailsBlock as ContactDetailsBlockComponent } from "./ContactDetailsBlock"

interface BlockRendererProps {
  blocks?: any[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  // Debug: Log blocks structure
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[BlockRenderer] Rendering blocks:', blocks)
  }

  return (
    <>
      {blocks.map((block, index) => {
        try {
          if (!block || typeof block !== 'object') {
            console.warn(`[BlockRenderer] Invalid block at index ${index}:`, block)
            return null
          }

          if (!block.blockType) {
            console.warn(`[BlockRenderer] Block at index ${index} has no blockType:`, block)
            return null
          }

          const blockKey = block.id || `block-${index}`

          switch (block.blockType) {
            case "hero":
              return <HeroBlock key={blockKey} block={block} />
            case "imageText":
              return <ImageTextBlock key={blockKey} block={block} />
            case "cardGrid":
              return <CardGridBlock key={blockKey} block={block} />
            case "programs":
              return <ProgramsBlock key={blockKey} block={block} />
            case "imageGallery":
              return <ImageGalleryBlock key={blockKey} block={block} />
            case "sponsors":
              return <SponsorsBlock key={blockKey} block={block} />
            case "richText":
              return <RichTextBlock key={blockKey} block={block} />
            case "ctaBanner":
              return <CtaBannerBlock key={blockKey} block={block} />
            case "contactDetails":
              return <ContactDetailsBlockComponent key={blockKey} block={block} />
            default:
              console.warn(`[BlockRenderer] Unknown block type: ${block.blockType}`, block)
              return null
          }
        } catch (error) {
          console.error(`[BlockRenderer] Error rendering block at index ${index}:`, error, block)
          // Return a placeholder instead of breaking the entire page
          return (
            <div key={`error-${index}`} className="container mx-auto px-4 py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  Error rendering block. Please check the CMS content.
                </p>
              </div>
            </div>
          )
        }
      })}
    </>
  )
}

function HeroBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[HeroBlock] Invalid block data:', block)
      return null
    }

    // Use CMS image or fallback to default
    const cmsImageUrl = getImageUrl(block.backgroundImage)
    const imageUrl = cmsImageUrl || DEFAULT_IMAGES.hero
    
    // Use CMS title or null (don't show if empty)
    const title = block.title || null
    
    const content = block.content
    const buttonLabel = block.buttonLabel || block.ctaLabel
    const buttonUrl = block.buttonUrl || block.ctaUrl || DEFAULT_CONTENT.hero.buttonUrl

    return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title || "Hero"}
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
          {title && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-6 text-balance">
              {title}
            </h1>
          )}
          {content && (
            <div className="text-xl mb-6 prose prose-invert max-w-none">
              {renderLexicalContent(content) || (
                <div className="whitespace-pre-wrap">
                  {extractTextFromLexical(content)}
                </div>
              )}
            </div>
          )}
          {buttonLabel && (
            <Button
              size="lg"
              className="bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-all text-lg px-8 shadow-lg"
              asChild
            >
              <Link href={buttonUrl}>{buttonLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
    )
  } catch (error) {
    console.error('[HeroBlock] Error rendering:', error, block)
    return null
  }
}

/**
 * Extract text content from Lexical editor JSON structure
 */
export function extractTextFromLexical(content: any): string {
  if (!content || typeof content !== 'object') {
    return ''
  }

  // Handle Lexical editor format
  if (content.root && content.root.children) {
    const extractText = (node: any): string => {
      if (!node) return ''
      
      // If node has text property, return it
      if (node.text) {
        return node.text
      }
      
      // If node has children, recursively extract text
      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }
      
      return ''
    }
    
    return content.root.children.map(extractText).join('\n\n')
  }
  
  // Fallback: if it's already a string, return it
  if (typeof content === 'string') {
    return content
  }
  
  return ''
}

/**
 * Render paragraphs from Lexical content
 */
export function renderLexicalContent(content: any) {
  if (!content || typeof content !== 'object') {
    return null
  }

  if (content.root && content.root.children) {
    return (
      <>
        {content.root.children.map((node: any, index: number) => {
          if (node.type === 'paragraph' && node.children) {
            const text = node.children
              .filter((child: any) => child.type === 'text' && child.text)
              .map((child: any) => child.text)
              .join('')
            
            if (text) {
              return (
                <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {text}
                </p>
              )
            }
          }
          return null
        })}
      </>
    )
  }
  
  return null
}

function ImageTextBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[ImageTextBlock] Invalid block data:', block)
      return null
    }
    
    // Use CMS image or fallback to default
    const cmsImageUrl = getImageUrl(block.image)
    const imageUrl = cmsImageUrl || DEFAULT_IMAGES.welcome
    
    // Debug logging
    if (!cmsImageUrl) {
      console.warn('[ImageTextBlock] No CMS image found, using fallback:', {
        blockImage: block.image,
        fallbackUrl: DEFAULT_IMAGES.welcome
      })
    }
    
    // Use CMS title or null (don't show if empty)
    const title = block.title || null
    
    // Use CMS content or null (don't show if empty)
    const content = block.content || null
    
    const imagePosition = block.imagePosition || "left"
    const buttonLabel = block.buttonLabel
    const buttonUrl = block.buttonUrl || "/"

    return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${
            imagePosition === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image container - always render, even if image fails */}
          <div className="relative h-[400px] md:h-[500px] w-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl group bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title || "Welcome"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={imageUrl.startsWith('http') && !imageUrl.includes('vercel-storage')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {title && (
              <h2 className="text-4xl md:text-5xl font-medium mb-6 text-balance hover:text-primary transition-colors">
                {title}
              </h2>
            )}
            {content && (
              <div className="text-lg leading-relaxed text-muted-foreground prose prose-lg max-w-none mb-4">
                {renderLexicalContent(content) || (
                  <div className="whitespace-pre-wrap">
                    {extractTextFromLexical(content)}
                  </div>
                )}
              </div>
            )}
            {buttonLabel && (
              <Button
                variant="outline"
                className="mt-4"
                asChild
              >
                <Link href={buttonUrl}>{buttonLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
    )
  } catch (error) {
    console.error('[ImageTextBlock] Error rendering:', error, block)
    return null
  }
}

function CardGridBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[CardGridBlock] Invalid block data:', block)
      return null
    }
    
    // Use CMS title/subtitle or fallback to defaults
    const title = block.title || DEFAULT_CONTENT.programs.title
    const subtitle = block.subtitle || DEFAULT_CONTENT.programs.subtitle
    const content = block.content
    const cards = block.cards || []
    const buttonLabel = block.buttonLabel
    const buttonUrl = block.buttonUrl || "/"

    return (
    <section className="py-20 bg-background fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance">
          {title}
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card: any, index: number) => {
            // Use CMS image or fallback to default program images
            const cmsImageUrl = getImageUrl(card.image)
            const defaultImages = Object.values(DEFAULT_IMAGES.programs)
            const fallbackImage = defaultImages[index % defaultImages.length] || DEFAULT_IMAGES.programs.artistic
            const imageUrl = cmsImageUrl || fallbackImage
            
            return (
              <Card
                key={card.id || index}
                className="border-2 hover:border-primary transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl overflow-hidden group animate-fade-in-up p-0 gap-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                <CardContent className="p-6">
                  {card.title && (
                    <h3 className="text-2xl font-medium mb-3">{card.title}</h3>
                  )}
                  {card.content && (
                    <div className="text-muted-foreground leading-relaxed mb-4 prose prose-sm">
                      {renderLexicalContent(card.content) || (
                        <div className="whitespace-pre-wrap">
                          {extractTextFromLexical(card.content)}
                        </div>
                      )}
                    </div>
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
        {buttonLabel && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <Link href={buttonUrl}>{buttonLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
    )
  } catch (error) {
    console.error('[CardGridBlock] Error rendering:', error, block)
    return null
  }
}

function ProgramsBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[ProgramsBlock] Invalid block data:', block)
      return null
    }
    
    const programs = block.programs || []

    return (
      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4 max-w-6xl">
          {programs.map((program: any, index: number) => {
            const imageUrl = getImageUrl(program.image)
            const timetable = program.timetable || {}
            const schedule = timetable.schedule || []
            const coach = program.coach || {}
            const coachPhotoUrl = getImageUrl(coach.photo)
            
            return (
              <div key={program.id || index} className="mb-20 last:mb-0">
                {/* Program Header */}
                <div className="mb-8">
                  {program.title && (
                    <h2 className="text-4xl md:text-5xl font-medium mb-4 text-balance">
                      {program.title}
                    </h2>
                  )}
                  {program.content && (
                    <div className="text-muted-foreground text-lg leading-relaxed prose prose-lg max-w-none mb-6">
                      {renderLexicalContent(program.content) || (
                        <div className="whitespace-pre-wrap">
                          {extractTextFromLexical(program.content)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Program Image */}
                {imageUrl && (
                  <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={imageUrl}
                      alt={program.title || ""}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </div>
                )}

                {/* Timetable */}
                {schedule.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-medium mb-4">
                      {timetable.title || "Εβδομαδιαίο Πρόγραμμα"}
                    </h3>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-primary/10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ημέρα</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ώρα</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Επίπεδο</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {schedule.map((entry: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-gray-900">{entry.day}</td>
                              <td className="px-6 py-4 text-sm text-gray-900">{entry.time}</td>
                              <td className="px-6 py-4 text-sm text-gray-900">{entry.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Button */}
                {program.buttonLabel && program.buttonUrl && (
                  <div className="mb-8">
                    <Button variant="outline" size="lg" asChild>
                      <Link href={program.buttonUrl}>{program.buttonLabel}</Link>
                    </Button>
                  </div>
                )}

                {/* Coach Section */}
                {coach.name && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-medium mb-6">
                      {coach.title || "Προπονητής/τρια"}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {coachPhotoUrl && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={coachPhotoUrl}
                            alt={coach.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-xl font-medium mb-2">{coach.name}</h4>
                        {coach.bio && (
                          <div className="text-muted-foreground prose prose-sm max-w-none">
                            {renderLexicalContent(coach.bio) || (
                              <div className="whitespace-pre-wrap">
                                {extractTextFromLexical(coach.bio)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    )
  } catch (error) {
    console.error('[ProgramsBlock] Error rendering:', error, block)
    return null
  }
}

function ImageGalleryBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[ImageGalleryBlock] Invalid block data:', block)
      return null
    }
    
    // Use CMS title/subtitle or fallback to defaults
    const title = block.title || DEFAULT_CONTENT.programs.title
    const subtitle = block.subtitle || DEFAULT_CONTENT.programs.subtitle
    const content = block.content
    const images = block.images || []
    // No buttons for moments/gallery section

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">
          {title}
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {content && (
          <div className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto prose prose-lg">
            {renderLexicalContent(content) || (
              <div className="whitespace-pre-wrap">
                {extractTextFromLexical(content)}
              </div>
            )}
          </div>
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
                {(image.title || image.caption) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 text-white">
                      {image.title && (
                        <h3 className="text-2xl font-medium mb-2 leading-relaxed">
                          {image.title}
                        </h3>
                      )}
                      {image.caption && (
                        <p className="text-sm">{image.caption}</p>
                      )}
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
  } catch (error) {
    console.error('[ImageGalleryBlock] Error rendering:', error, block)
    return null
  }
}

function SponsorsBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[SponsorsBlock] Invalid block data:', block)
      return null
    }
    
    // Use CMS title/subtitle or fallback to defaults
    const title = block.title || "Οι Υποστηρικτές μας"
    const subtitle = block.subtitle || "Ευχαριστούμε θερμά τους υποστηρικτές μας"
    const content = block.content
    const sponsors = block.sponsors || []
    const buttonLabel = block.buttonLabel
    const buttonUrl = block.buttonUrl || "/"

  return (
    <section className="py-20 bg-white fade-in-section opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 text-balance leading-relaxed">
          {title}
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-4">
          {subtitle}
        </p>
        {content && (
          <div className="text-center text-muted-foreground text-lg mb-12 prose prose-lg max-w-2xl mx-auto">
            {renderLexicalContent(content) || (
              <div className="whitespace-pre-wrap">
                {extractTextFromLexical(content)}
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
          {sponsors.map((sponsor: any, index: number) => {
            const logoUrl = getImageUrl(sponsor.image || sponsor.logo)
            const sponsorName = sponsor.title || sponsor.name
            const sponsorUrl = sponsor.url
            
            return (
              <div
                key={sponsor.id || index}
                className="bg-white rounded-xl p-6 flex items-center justify-center h-32 hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-primary cursor-pointer"
              >
                {logoUrl ? (
                  sponsorUrl ? (
                    <Link href={sponsorUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <Image
                        src={logoUrl}
                        alt={sponsorName || "Sponsor"}
                        width={120}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={logoUrl}
                      alt={sponsorName || "Sponsor"}
                      width={120}
                      height={80}
                      className="object-contain"
                    />
                  )
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {sponsorName || `Sponsor ${index + 1}`}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {buttonLabel && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <Link href={buttonUrl}>{buttonLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
    )
  } catch (error) {
    console.error('[SponsorsBlock] Error rendering:', error, block)
    return null
  }
}

function RichTextBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[RichTextBlock] Invalid block data:', block)
      return null
    }

    const content = block.content

    if (!content) return null

    // Extract text content for display
    const textContent = extractTextFromLexical(content)
    
    // If no text content found, don't render
    if (!textContent.trim()) {
      return null
    }

    return (
      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {renderLexicalContent(content) || (
              <div className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {textContent}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('[RichTextBlock] Error rendering:', error, block)
    return null
  }
}

function CtaBannerBlock({ block }: { block: any }) {
  try {
    if (!block || typeof block !== 'object') {
      console.error('[CtaBannerBlock] Invalid block data:', block)
      return null
    }

    const title = block.title || ""
    const content = block.content || block.description
    const buttonLabel = block.buttonLabel
    const buttonUrl = block.buttonUrl || "/"
    // Gradient is always purple-orange (non-editable)
    const gradientClass = 'bg-gradient-to-r from-purple-600 via-purple-500 to-orange-500'

    if (!title) return null

    return (
      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className={`${gradientClass} rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden hover:scale-[1.02] transition-transform duration-500`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-medium mb-6 text-balance animate-fade-in-up leading-relaxed">
                {title}
              </h2>
              {content && (
                <div className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed prose prose-invert">
                  {renderLexicalContent(content) || (
                    <div className="whitespace-pre-wrap">
                      {extractTextFromLexical(content)}
                    </div>
                  )}
                </div>
              )}
              {buttonLabel && (
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 hover:scale-110 transition-all duration-300 text-lg px-8 shadow-2xl"
                  asChild
                >
                  <Link href={buttonUrl} className="flex items-center gap-2">
                    {buttonLabel}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('[CtaBannerBlock] Error rendering:', error, block)
    return null
  }
}


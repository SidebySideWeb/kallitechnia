import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  mapKalitechniaRegistration,
  type ContactFormField,
  type IconName,
  type RegistrationPageData,
} from "@/lib/page-content"
import { createKalitechniaClient, extractSections, fetchFooterData, fetchPageContent } from "@/lib/server/content"

const iconMap = {
  mapPin: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  facebook: MapPin,
  instagram: MapPin,
  tiktok: MapPin,
  youtube: MapPin,
} satisfies Record<IconName, typeof MapPin>

export default async function RegistrationPage() {
  const client = await createKalitechniaClient()

  const [page, footerData] = await Promise.all([
    fetchPageContent(client, "kallitechnia-registration", 2),
    fetchFooterData(client),
  ])

  const content = extractSections(page)
  const data = mapKalitechniaRegistration(content)

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-secondary py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-10 top-10 h-72 w-72 animate-pulse rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-balance text-5xl font-bold text-white drop-shadow-lg md:text-6xl">{data.hero.title}</h1>
          <p className="mt-6 text-xl text-white/95 drop-shadow-md md:text-2xl">{data.hero.subtitle}</p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-2xl font-bold text-primary md:text-3xl">{data.welcome.headline}</p>
            <p className="mt-4 text-xl text-secondary md:text-2xl">{data.welcome.subheadline}</p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="rounded-3xl border border-border bg-card p-8 shadow-lg md:p-12">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary md:h-20 md:w-20">
                  <span className="text-3xl font-bold md:text-4xl">i</span>
                </div>
                <h2 className="text-3xl font-bold text-primary md:text-4xl">{data.documents.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground">{data.documents.description}</p>
              <Button className="mt-6 bg-secondary text-white hover:bg-secondary/90" asChild>
                <a href={data.documents.downloadUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                  {data.documents.downloadLabel}
                </a>
              </Button>

              <div className="mt-8 space-y-3 rounded-2xl bg-primary/5 p-6">
                {data.documents.requirements.map((requirement, index) => (
                  <div key={`${requirement}-${index}`} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-2xl leading-none text-primary">•</span>
                    <p className="leading-relaxed">{requirement}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">Πληροφορίες Εγγραφής</h2>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.infoCards.map((card, index) => {
              const Icon = iconMap[card.icon] ?? MapPin
              return (
                <Card
                  key={`${card.title}-${index}`}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {card.lines.map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="rounded-3xl border border-border bg-card p-8 shadow-lg md:p-12">
              <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">{data.form.ctaLabel}</h2>
              <form
                className="mt-10 space-y-6"
                action="https://formbold.com/s/60Lre"
                method="POST"
                encType="multipart/form-data"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {data.form.fields.slice(0, 6).map((field) => renderField(field))}
                </div>
                {data.form.fields.slice(6).map((field) => (
                  <div key={field.id}>{renderField(field)}</div>
                ))}

                <div className="flex items-start gap-3 rounded-xl bg-accent/5 p-4">
                  <Checkbox id="consent" name="consent" required className="mt-1" />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                    {renderConsentLabel(data.form)}
                  </label>
                </div>

                <Button type="submit" size="lg" className="h-14 w-full bg-secondary text-lg font-bold text-white hover:bg-secondary/90">
                  {data.form.ctaLabel}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary via-secondary to-accent py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold md:text-5xl">{data.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-white/90">{data.cta.subtitle}</p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-14 px-8 text-lg font-bold text-primary hover:bg-white/90"
            asChild
          >
            <Link href={data.cta.buttonHref}>{data.cta.buttonLabel}</Link>
          </Button>
        </div>
      </section>

      <Footer data={footerData} />
    </div>
  )
}

function renderField(field: ContactFormField) {
  const label = field.label.replace(/\s*\*$/, "")
  const isRequired = field.required ?? false

  if (field.type === "textarea") {
    return (
      <div className="space-y-2" key={field.id}>
        <label htmlFor={field.id} className="text-sm font-semibold text-foreground">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
        <Textarea
          id={field.id}
          name={field.id}
          placeholder={field.placeholder}
          rows={5}
          required={isRequired}
        />
      </div>
    )
  }

  const inputType = field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"

  return (
    <div className="space-y-2" key={field.id}>
      <label htmlFor={field.id} className="text-sm font-semibold text-foreground">
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>
      <Input
        id={field.id}
        name={field.id}
        type={inputType}
        placeholder={field.placeholder}
        required={isRequired}
        className="h-12"
      />
    </div>
  )
}

function renderConsentLabel(form: RegistrationPageData["form"]) {
  const termsLink = form.termsLink ?? "#"
  const privacyLink = form.privacyLink ?? form.termsLink ?? "#"
  const parts = form.consentLabel.split(/(Όρους Χρήσης|Πολιτική Απορρήτου)/)

  return (
    <>
      {parts.map((part, index) => {
        if (part === "Όρους Χρήσης") {
          return (
            <Link key={`${part}-${index}`} href={termsLink} className="font-semibold text-accent hover:underline">
              {part}
            </Link>
          )
        }
        if (part === "Πολιτική Απορρήτου") {
          return (
            <Link key={`${part}-${index}`} href={privacyLink} className="font-semibold text-accent hover:underline">
              {part}
            </Link>
          )
        }
        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}


import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { headers } from "next/headers"

import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mapKalitechniaContact, type ContactPageData, type IconName } from "@/lib/page-content"
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

export default async function ContactPage() {
  const headersList = await headers()
  const hostname = headersList.get("host") ?? undefined
  const client = await createKalitechniaClient(hostname)

  const [page, footerData] = await Promise.all([
    fetchPageContent(client, "kalitechnia-contact", 2),
    fetchFooterData(client),
  ])

  const content = extractSections(page)
  const data = mapKalitechniaContact(content)

  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-gradient-to-br from-accent via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance drop-shadow-lg">
            {data.hero.title}
          </h1>
          <p className="text-xl leading-relaxed text-white/90 drop-shadow-md">{data.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{data.form.title}</CardTitle>
                <p className="text-muted-foreground">{data.form.description}</p>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  action="https://formbold.com/s/982re"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.form.fields.slice(0, 2).map((field) => renderField(field))}
                  </div>
                  {data.form.fields.slice(2).map((field) => (
                    <div key={field.id}>{renderField(field)}</div>
                  ))}
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white text-lg">
                    {data.form.submitLabel}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {data.infoCards.map((card, index) => {
                const Icon = iconMap[card.icon] ?? MapPin
                return (
                  <Card key={`${card.title}-${index}`} className="border-2 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-2 text-primary">{card.title}</h3>
                          <div className="text-muted-foreground leading-relaxed space-y-1">
                            {card.lines.map((line, lineIndex) => (
                              <p key={lineIndex}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">{data.map.title}</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border-2">
              <iframe
                src={data.map.embedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={data.map.title}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </div>
  )
}

function renderField(field: ContactPageData["form"]["fields"][number]) {
  const labelText = field.label.replace(/\s*\*$/, "")
  const isRequired = field.required ?? false

  if (field.type === "textarea") {
    return (
      <div className="space-y-2" key={field.id}>
        <label htmlFor={field.id} className="text-sm font-medium">
          {labelText}
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

  return (
    <div className="space-y-2" key={field.id}>
      <label htmlFor={field.id} className="text-sm font-medium">
        {labelText}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>
      <Input
        id={field.id}
        name={field.id}
        type={field.type === "tel" ? "tel" : field.type === "email" ? "email" : "text"}
        placeholder={field.placeholder}
        required={isRequired}
      />
    </div>
  )
}

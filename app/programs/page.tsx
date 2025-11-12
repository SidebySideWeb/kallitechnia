import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Footer from "@/components/Footer"
import { mapKalitechniaPrograms } from "@/lib/page-content"
import { createKalitechniaClient, extractSections, fetchFooterData, fetchPageContent } from "@/lib/server/content"

export default async function ProgramsPage() {
  const client = await createKalitechniaClient()

  const [page, footerData] = await Promise.all([
    fetchPageContent(client, "kallitechnia-programs", 2),
    fetchFooterData(client),
  ])

  const content = extractSections(page)
  const data = mapKalitechniaPrograms(content)

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-accent via-primary to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance drop-shadow-lg animate-fade-in-up">
              {data.hero.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">{data.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {data.programs.map((program, index) => (
        <section key={program.title} className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-background"}`} id={program.title}>
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center text-balance">
                {program.title}
              </h2>

              <div
                className={`grid md:grid-cols-2 gap-12 items-start mb-8 ${
                  program.imagePosition === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`${program.imagePosition === "right" ? "md:order-2" : "md:order-1"}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
                  </div>
                </div>

                <div className={`space-y-6 ${program.imagePosition === "right" ? "md:order-1" : "md:order-2"}`}>
                  <p className="text-lg leading-relaxed text-muted-foreground">{program.description}</p>

                  {program.additionalInfo && (
                    <p className="text-base leading-relaxed text-muted-foreground bg-primary/5 p-4 rounded-xl">
                      {program.additionalInfo}
                    </p>
                  )}

                  <div className="bg-background/50 rounded-xl p-6 border">
                    <h3 className="text-2xl font-bold text-primary mb-4">Εβδομαδιαίο Πρόγραμμα</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-semibold">Ημέρα</th>
                            <th className="text-left py-3 px-2 font-semibold">Ώρα</th>
                            <th className="text-left py-3 px-2 font-semibold">Επίπεδο</th>
                          </tr>
                        </thead>
                        <tbody>
                          {program.schedule.map((slot, idx) => (
                            <tr key={`${slot.day}-${idx}`} className="border-b last:border-0">
                              <td className="py-3 px-2">{slot.day}</td>
                              <td className="py-3 px-2">{slot.time}</td>
                              <td className="py-3 px-2">{slot.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white">
                    Κατέβασε το Πρόγραμμα (PDF)
                  </Button>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                <h3 className="text-3xl font-bold text-primary mb-8 text-center">Προπονητής/τρια</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src={program.coach.photo || "/placeholder.svg"}
                      alt={program.coach.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h4 className="text-2xl font-bold text-primary">{program.coach.name}</h4>
                    <p className="text-accent font-semibold">{program.coach.studies}</p>
                    <p className="text-lg leading-relaxed text-muted-foreground">{program.coach.bio}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      ))}

      <Footer data={footerData} />
    </div>
  )
}

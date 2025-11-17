import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"

export default function NewsPage() {
  const newsItems = [
    {
      title: "Επιτυχημένη Συμμετοχή στο Πανελλήνιο Πρωτάθλημα",
      date: "15 Ιανουαρίου 2025",
      excerpt:
        "Οι αθλητές μας διακρίθηκαν στο πρόσφατο Πανελλήνιο Πρωτάθλημα Γυμναστικής, κατακτώντας σημαντικές θέσεις.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg",
    },
    {
      title: "Νέα Προγράμματα για την Άνοιξη 2025",
      date: "10 Ιανουαρίου 2025",
      excerpt: "Ανακοινώνουμε τα νέα μας προγράμματα για την άνοιξη, με επιπλέον ώρες προπόνησης και νέες ομάδες.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg",
    },
    {
      title: "Εορταστική Παράσταση Χριστουγέννων",
      date: "20 Δεκεμβρίου 2024",
      excerpt: "Η ετήσια χριστουγεννιάτικη παράστασή μας ήταν μια μεγάλη επιτυχία με εκατοντάδες θεατές.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg",
    },
    {
      title: "Νέες Εγκαταστάσεις Προπόνησης",
      date: "5 Δεκεμβρίου 2024",
      excerpt: "Αναβαθμίσαμε τις εγκαταστάσεις μας με νέο εξοπλισμό και βελτιωμένους χώρους προπόνησης.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg",
    },
    {
      title: "Σεμινάριο Προπονητών",
      date: "25 Νοεμβρίου 2024",
      excerpt: "Οι προπονητές μας συμμετείχαν σε εξειδικευμένο σεμινάριο για τις νέες τεχνικές γυμναστικής.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg",
    },
    {
      title: "Ανοιχτή Ημέρα για Νέα Μέλη",
      date: "10 Νοεμβρίου 2024",
      excerpt: "Πραγματοποιήσαμε ανοιχτή ημέρα όπου οι ενδιαφερόμενοι γνώρισαν τον σύλλογο και τα προγράμματά μας.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance drop-shadow-lg">
              Νέα & Ανακοινώσεις
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/95 drop-shadow">
              Μείνετε ενημερωμένοι με τα τελευταία νέα, εκδηλώσεις και επιτυχίες του συλλόγου μας.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all hover:shadow-lg rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <CardTitle className="text-2xl text-balance">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

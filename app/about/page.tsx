"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { fetchPage, type Page } from "@/lib/api"
import { BlockRenderer } from "@/components/blocks/BlockRenderer"

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

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

    const observeElements = () => {
      const elements = document.querySelectorAll(".fade-in-section")
      elements.forEach((el) => observerRef.current?.observe(el))
    }

    observeElements()

    const timeoutId = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [page])

  useEffect(() => {
    async function loadPage() {
      try {
        const pageData = await fetchPage("about")
        setPage(pageData)
      } catch (error) {
        console.error("Failed to load page:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPage()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {page?.blocks && page.blocks.length > 0 ? (
        <BlockRenderer blocks={page.blocks} />
      ) : (
        <>
          {/* Fallback: Static content */}
          <section className="relative bg-gradient-to-br from-accent via-primary to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance animate-fade-in-up text-white drop-shadow-lg">
              Ο Σύλλογος
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                Όραμά μας είναι να μεταδώσουμε στα παιδιά την αγάπη μας για τη Γυμναστική και να συμβάλλουμε στη
                σωματική, ψυχική, πνευματική και κοινωνική τους ανάπτυξη.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                Στόχος μας είναι να τους διδάξουμε εκτός από Γυμναστική και τις αξίες της ζωής και να τους δώσουμε χαρά,
                αγάπη και μοναδικές εμπειρίες μέσα από τη Γυμναστική.
              </p>
            </div>

            <div className="py-8">
              <p className="text-2xl md:text-3xl font-semibold text-primary italic hover:scale-105 transition-transform duration-300">
                Υπάρχει ομορφότερο πράγμα από το να φωτίζεις τις ψυχές των παιδιών;
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-2xl hover:scale-105 transition-transform duration-500 shadow-xl hover:shadow-2xl">
              <p className="text-xl md:text-2xl font-bold text-white">Σύνθημά του συλλόγου μας είναι:</p>
              <p className="text-2xl md:text-3xl font-bold text-white mt-4">
                «Γυμναστική με Καρδιά,
                <br />
                Καλλιτεχνία, Κεφαλονιά»
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg"
                  alt="Οι αθλητές μας"
                  fill
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-primary transition-colors">
                  Σχετικά με εμάς
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Η Γυμναστική Καλλιτεχνία Κεφαλονιάς ιδρύθηκε από μια ομάδα ανθρώπων με κοινό γνώρισμά τους την αγάπη
                  τους για τα παιδιά. Όραμά τους είναι να προσφέρουν στα παιδιά της Κεφαλονιάς την ευκαιρία να
                  ασχοληθούν με τη Γυμναστική, καλλιεργώντας το σώμα και τη ψυχή τους με σεβασμό και αγάπη.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 hover:scale-105 transition-transform">
                •Καλλιτεχνία•
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-secondary">
                Η Τέχνη της Κίνησης – Η Ψυχή της Γυμναστικής
              </p>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Στα αθλήματα της Γυμναστικής όπως η Γυμναστική για Όλους, η Ρυθμική, η Ενόργανη, η Ακροβατική, η
                καλλιτεχνία δεν είναι λεπτομέρεια – είναι ουσία. Είναι αυτή που ενώνει την τεχνική με το συναίσθημα.
              </p>

              <p>
                Η ροή της κίνησης, η σύνδεση των ασκήσεων με τη μουσική, η έκφραση των αθλητών, η δυναμική, η απόδοση
                της χορογραφίας, η παρουσία– ολα αξιολογούνται και βαθμολογούνται και συνθέτουν αυτό που ονομάζουμε
                καλλιτεχνία.
              </p>

              <p>
                Ένα πρόγραμμα τεχνικά άρτιο, αλλά χωρίς ψυχή, μένει ημιτελές. Αντίθετα, όταν η τεχνική συνοδεύεται από
                καλλιτεχνική αρτιότητα, το αποτέλεσμα είναι μαγικό. Η συναισθηματική σύνδεση που δημιουργεί ένας αθλητής
                με τους θεατές και τους κριτές, είναι αυτή που μπορεί να κάνει τη διαφορά.
              </p>

              <p className="text-xl font-semibold text-primary text-center py-6">
                Η γυμναστική δεν είναι απλώς άσκηση – είναι έκφραση, ρυθμός, παρουσία.
                <br />
                Είναι Καλλιτεχνία.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-secondary transition-colors">
                  Σκοπός
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Ο κύριος σκοπός του συλλόγου μας είναι η προώθηση της Γυμναστικής στην Κεφαλονιά, προσφέροντας
                  ποιοτικά προγράμματα εκπαίδευσης για όλες τις ηλικίες και τα επίπεδα.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Επιδιώκουμε να αναπτύξουμε τις σωματικές και ψυχικές ικανότητες των αθλητών μας, καλλιεργώντας
                  παράλληλα αξίες όπως η ομαδικότητα, ο σεβασμός, η επιμονή και η πειθαρχία.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Στόχος μας είναι να δημιουργήσουμε ένα ασφαλές και υποστηρικτικό περιβάλλον όπου κάθε αθλητής μπορεί
                  να εξελιχθεί στο μέγιστο των δυνατοτήτων του, είτε επιδιώκει την αθλητική του εξέλιξη είτε απλά την
                  προσωπική του ανάπτυξη μέσω του αθλήματος.
                </p>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg"
                  alt="Προπόνηση γυμναστικής"
                  fill
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg"
                  alt="Η φιλοσοφία μας"
                  fill
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-accent transition-colors">
                  Φιλοσοφία
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Πιστεύουμε ότι η γυμναστική είναι πολύ περισσότερο από ένα άθλημα - είναι ένας τρόπος ζωής που
                  διαμορφώνει χαρακτήρες και χτίζει μελλοντικούς πρωταθλητές, όχι μόνο στον αθλητισμό αλλά και στη ζωή.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Η φιλοσοφία μας βασίζεται στην ισορροπία μεταξύ της αγωνιστικής αριστείας και της προσωπικής
                  ανάπτυξης. Κάθε αθλητής είναι μοναδικός και αξίζει εξατομικευμένη προσοχή και καθοδήγηση.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Προάγουμε ένα περιβάλλον θετικής ενέργειας, όπου τα λάθη είναι ευκαιρίες μάθησης, οι προκλήσεις είναι
                  ευκαιρίες ανάπτυξης και κάθε επιτυχία, μικρή ή μεγάλη, γιορτάζεται με ενθουσιασμό. Η χαρά της
                  γυμναστικής είναι στο ταξίδι, όχι μόνο στον προορισμό.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background fade-in-section opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">Χώροι Εκγύμνασης</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg"
                  alt="Χώρος προπόνησης 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg"
                  alt="Χώρος προπόνησης 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6068%20%281%29-Vk2nWKd2qSVzRl2ldqmb919zO5TCf9.jpeg"
                  alt="Χώρος προπόνησης 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6340%20%281%29-6T0A1KQPyDVi8Gr7ev3c5o4qGRiEuW.jpeg"
                  alt="Χώρος προπόνησης 4"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}

      <Footer />
    </div>
  )
}

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, User } from "lucide-react"

// Mock data - in a real app, this would come from a database or CMS
const blogPosts = {
  "epityxies-sto-panelladiko-prwtathlima": {
    title: "Επιτυχίες στο Πανελλήνιο Πρωτάθλημα Ρυθμικής Γυμναστικής",
    date: "15 Μαρτίου 2024",
    author: "Ελένη Δαρδαμάνη",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg",
    content: `
      <p>Με μεγάλη χαρά και υπερηφάνεια ανακοινώνουμε τις εξαιρετικές επιδόσεις των αθλητριών μας στο Πανελλήνιο Πρωτάθλημα Ρυθμικής Γυμναστικής που πραγματοποιήθηκε στην Αθήνα.</p>

      <p>Οι αθλήτριές μας κατάφεραν να ξεχωρίσουν ανάμεσα σε δεκάδες συμμετοχές από όλη την Ελλάδα, αποδεικνύοντας την υψηλή ποιότητα της προπόνησης και την αφοσίωσή τους στο άθλημα.</p>

      <h2>Αποτελέσματα</h2>

      <p>Η Μαρία Παπαδοπούλου κατέκτησε την 1η θέση στην κατηγορία Νεανίδων με εξαιρετικές ασκήσεις στη σφαίρα και την κορδέλα. Η χορογραφία της συνδύαζε τεχνική αρτιότητα με καλλιτεχνική έκφραση, εντυπωσιάζοντας τους κριτές και το κοινό.</p>

      <p>Η Ελένη Γεωργίου πέτυχε την 3η θέση στην ίδια κατηγορία, με ιδιαίτερα εντυπωσιακή την άσκησή της με τις μπάλες. Η συγχρονισμένη της κίνηση και η χάρη της έδειξαν την πρόοδο που έχει κάνει τους τελευταίους μήνες.</p>

      <h2>Η Προετοιμασία</h2>

      <p>Η προετοιμασία για το πρωτάθλημα ξεκίνησε πολλούς μήνες πριν, με εντατικές προπονήσεις και αφοσίωση από όλη την ομάδα. Οι προπονήτριές μας εργάστηκαν ακούραστα για να τελειοποιήσουν κάθε λεπτομέρεια των χορογραφιών.</p>

      <p>Η ψυχολογική προετοιμασία ήταν εξίσου σημαντική με τη φυσική. Οι αθλήτριες έμαθαν να διαχειρίζονται το άγχος του αγώνα και να μετατρέπουν τη νευρικότητα σε θετική ενέργεια.</p>

      <h2>Το Μέλλον</h2>

      <p>Αυτές οι επιτυχίες μας δίνουν κίνητρο να συνεχίσουμε με τον ίδιο ζήλο και αφοσίωση. Ήδη προγραμματίζουμε τη συμμετοχή μας στο επόμενο διεθνές τουρνουά που θα πραγματοποιηθεί τον Ιούνιο.</p>

      <p>Ευχαριστούμε θερμά όλους τους γονείς και τους υποστηρικτές μας που μας συνοδεύουν σε αυτό το ταξίδι. Η υποστήριξή σας είναι ανεκτίμητη!</p>
    `,
  },
  "nea-tmimata-gymnastikis": {
    title: "Νέα Τμήματα Γυμναστικής για Όλους",
    date: "10 Μαρτίου 2024",
    author: "Σύλλογος Καλλιτεχνία",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6068%20%281%29-Vk2nWKd2qSVzRl2ldqmb919zO5TCf9.jpeg",
    content: `
      <p>Με μεγάλη χαρά ανακοινώνουμε την έναρξη νέων τμημάτων Γυμναστικής για Όλους στον σύλλογό μας! Η Γυμναστική για Όλους είναι ένα άθλημα που απευθύνεται σε όλες τις ηλικίες και επίπεδα φυσικής κατάστασης.</p>

      <p>Τα νέα τμήματα περιλαμβάνουν προγράμματα για παιδιά, εφήβους και ενήλικες, με έμφαση στη χαρά της κίνησης, την ομαδικότητα και τη δημιουργικότητα.</p>

      <h2>Τι είναι η Γυμναστική για Όλους;</h2>

      <p>Η Γυμναστική για Όλους (Gymnastics for All) είναι μια μορφή γυμναστικής που συνδυάζει στοιχεία από διάφορα αθλήματα γυμναστικής, χορό και ακροβατικά. Δεν είναι αγωνιστικό άθλημα, αλλά επικεντρώνεται στη συμμετοχή, τη διασκέδαση και την προσωπική ανάπτυξη.</p>

      <h2>Οφέλη</h2>

      <p>Η συμμετοχή στη Γυμναστική για Όλους προσφέρει πολλαπλά οφέλη: βελτίωση της φυσικής κατάστασης, ανάπτυξη συντονισμού και ισορροπίας, ενίσχυση της αυτοπεποίθησης, και δημιουργία κοινωνικών δεσμών μέσα από την ομαδική εργασία.</p>

      <p>Για περισσότερες πληροφορίες και εγγραφές, επικοινωνήστε μαζί μας!</p>
    `,
  },
  "diethnes-festival-gymnastikis": {
    title: "Συμμετοχή στο Διεθνές Φεστιβάλ Γυμναστικής",
    date: "5 Μαρτίου 2024",
    author: "Ελένη Δαρδαμάνη",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg",
    content: `
      <p>Ο σύλλογός μας θα συμμετάσχει στο Διεθνές Φεστιβάλ Γυμναστικής που θα πραγματοποιηθεί στη Θεσσαλονίκη τον Ιούνιο. Πρόκειται για μια σημαντική διοργάνωση που συγκεντρώνει συλλόγους από όλη την Ευρώπη.</p>

      <p>Η συμμετοχή μας στο φεστιβάλ αποτελεί μια μοναδική ευκαιρία για τις αθλήτριές μας να παρουσιάσουν τη δουλειά τους σε διεθνές επίπεδο και να ανταλλάξουν εμπειρίες με αθλητές από άλλες χώρες.</p>

      <h2>Προετοιμασία</h2>

      <p>Η προετοιμασία για το φεστιβάλ είναι σε πλήρη εξέλιξη. Οι προπονήτριές μας εργάζονται πάνω σε νέες χορογραφίες που θα συνδυάζουν παραδοσιακά ελληνικά στοιχεία με σύγχρονες τεχνικές γυμναστικής.</p>

      <p>Περισσότερες λεπτομέρειες θα ανακοινωθούν σύντομα!</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image src={post.heroImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-primary prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-3xl prose-h3:text-2xl
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-6 prose-li:text-muted-foreground
                prose-img:rounded-2xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}

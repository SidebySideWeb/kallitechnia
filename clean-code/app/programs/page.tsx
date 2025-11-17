import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      title: "Καλλιτεχνική Γυμναστική",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg",
      description:
        "Η καλλιτεχνική γυμναστική είναι ένα ολοκληρωμένο άθλημα που αναπτύσσει δύναμη, ευλυγισία, ισορροπία και συντονισμό. Οι αθλητές μας εκπαιδεύονται σε όλα τα όργανα (δοκός, παράλληλες, έδαφος, ίππος) με έμφαση στην τεχνική και την ασφάλεια. Το πρόγραμμα προσαρμόζεται στις ανάγκες κάθε αθλητή, από αρχάριους έως προχωρημένους.",
      schedule: [
        { day: "Δευτέρα", time: "17:00 - 19:00", level: "Αρχάριοι" },
        { day: "Τρίτη", time: "17:00 - 19:00", level: "Μεσαίοι" },
        { day: "Τετάρτη", time: "17:00 - 19:00", level: "Αρχάριοι" },
        { day: "Πέμπτη", time: "17:00 - 19:00", level: "Προχωρημένοι" },
        { day: "Παρασκευή", time: "17:00 - 19:00", level: "Όλα τα επίπεδα" },
      ],
      coach: {
        name: "Ελένη Δαρδαμάνη",
        photo: "/female-gymnastics-coach.jpg",
        studies: "Πτυχίο Φυσικής Αγωγής, Πιστοποίηση Καλλιτεχνικής Γυμναστικής",
        bio: "Με πάνω από 15 χρόνια εμπειρίας στην καλλιτεχνική γυμναστική, η Ελένη έχει εκπαιδεύσει δεκάδες αθλητές που έχουν διακριθεί σε πανελλήνιους αγώνες. Η φιλοσοφία της βασίζεται στην ολιστική ανάπτυξη του αθλητή.",
      },
      imagePosition: "left",
    },
    {
      id: 2,
      title: "Ρυθμική Γυμναστική",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg",
      description:
        "Η ρυθμική γυμναστική συνδυάζει τη χάρη του χορού με την αθλητική τεχνική. Οι αθλήτριές μας εκπαιδεύονται με όργανα (σχοινί, στεφάνι, μπάλα, κορδέλα, κλαβ) αναπτύσσοντας μουσικότητα, έκφραση και καλλιτεχνική ερμηνεία. Το πρόγραμμα περιλαμβάνει χορογραφίες και συμμετοχή σε επιδείξεις.",
      schedule: [
        { day: "Δευτέρα", time: "16:00 - 18:00", level: "Αρχάριοι" },
        { day: "Τρίτη", time: "16:00 - 18:00", level: "Μεσαίοι" },
        { day: "Τετάρτη", time: "16:00 - 18:00", level: "Αρχάριοι" },
        { day: "Πέμπτη", time: "16:00 - 18:00", level: "Προχωρημένοι" },
        { day: "Σάββατο", time: "10:00 - 12:00", level: "Όλα τα επίπεδα" },
      ],
      coach: {
        name: "Μαρία Παπαδοπούλου",
        photo: "/female-rhythmic-gymnastics-coach.jpg",
        studies: "Πτυχίο Χορού & Ρυθμικής Γυμναστικής, Διεθνής Πιστοποίηση FIG",
        bio: "Πρώην αθλήτρια ρυθμικής γυμναστικής με συμμετοχές σε διεθνείς διοργανώσεις. Η Μαρία φέρνει τη δημιουργικότητα και την καλλιτεχνική της ματιά στην εκπαίδευση των νέων αθλητριών.",
      },
      imagePosition: "right",
    },
    {
      id: 3,
      title: "Προαγωνιστικά Τμήματα",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg",
      description:
        "Τα προαγωνιστικά τμήματα απευθύνονται σε αθλητές που επιθυμούν να συμμετέχουν σε αγώνες και να αναπτύξουν τις δεξιότητές τους σε ανταγωνιστικό επίπεδο. Το πρόγραμμα περιλαμβάνει εντατική προπόνηση, φυσική κατάσταση, τεχνική καθοδήγηση και ψυχολογική υποστήριξη για την επίτευξη των στόχων.",
      schedule: [
        { day: "Δευτέρα", time: "18:00 - 20:30", level: "Προαγωνιστικό Α'" },
        { day: "Τρίτη", time: "18:00 - 20:30", level: "Προαγωνιστικό Β'" },
        { day: "Τετάρτη", time: "18:00 - 20:30", level: "Προαγωνιστικό Α'" },
        { day: "Πέμπτη", time: "18:00 - 20:30", level: "Προαγωνιστικό Β'" },
        { day: "Παρασκευή", time: "18:00 - 20:30", level: "Όλα τα τμήματα" },
        { day: "Σάββατο", time: "09:00 - 12:00", level: "Φυσική κατάσταση" },
      ],
      coach: {
        name: "Νίκος Αντωνίου",
        photo: "/male-gymnastics-coach.jpg",
        studies: "Πτυχίο Επιστήμης Φυσικής Αγωγής, Μεταπτυχιακό Αθλητικής Απόδοσης",
        bio: "Ο Νίκος έχει εκπαιδεύσει πολλούς πρωταθλητές που έχουν κατακτήσει μετάλλια σε εθνικό και διεθνές επίπεδο. Η προσέγγισή του συνδυάζει επιστημονική μεθοδολογία με ατομική προσοχή.",
      },
      imagePosition: "left",
    },
    {
      id: 4,
      title: "Παιδικά Τμήματα",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg",
      description:
        "Τα παιδικά τμήματα προσφέρουν μια διασκεδαστική και ασφαλή εισαγωγή στον κόσμο της γυμναστικής για παιδιά ηλικίας 3-7 ετών. Μέσα από παιχνίδι και δημιουργικές δραστηριότητες, τα παιδιά αναπτύσσουν βασικές κινητικές δεξιότητες, ισορροπία, συντονισμό και κοινωνικές ικανότητες σε ένα χαρούμενο περιβάλλον.",
      schedule: [
        { day: "Δευτέρα", time: "16:00 - 17:00", level: "3-4 ετών" },
        { day: "Τρίτη", time: "16:00 - 17:00", level: "5-7 ετών" },
        { day: "Τετάρτη", time: "16:00 - 17:00", level: "3-4 ετών" },
        { day: "Πέμπτη", time: "16:00 - 17:00", level: "5-7 ετών" },
        { day: "Παρασκευή", time: "16:00 - 17:00", level: "Όλες οι ηλικίες" },
      ],
      coach: {
        name: "Σοφία Γεωργίου",
        photo: "/female-children-gymnastics-coach.jpg",
        studies: "Πτυχίο Προσχολικής Αγωγής, Ειδίκευση Παιδικής Γυμναστικής",
        bio: "Η Σοφία ειδικεύεται στην εργασία με μικρά παιδιά και δημιουργεί ένα θετικό και ενθαρρυντικό περιβάλλον όπου κάθε παιδί νιώθει ασφαλές να εξερευνήσει τις δυνατότητές του.",
      },
      imagePosition: "right",
    },
    {
      id: 5,
      title: "Γυμναστική για Όλους",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg",
      description:
        "Πόσοι από εσάς γνωρίζετε το συγκεκριμένο άθλημα; Πολλοί και ιδίως τα μικρά παιδιά το μπερδεύουν με τη ρυθμική ή την ενόργανη. Η Γυμναστική για Όλους (ΓγΟ) αποτελεί ένα από τα βασικά αθλήματα της Ομοσπονδίας Γυμναστικής και απευθύνεται σε άτομα κάθε ηλικίας και επιπέδου φυσικής κατάστασης. Είναι ένα ομαδικό άθλημα χωρίς αγωνιστικούς περιορισμούς, που δίνει έμφαση στη συμμετοχή, στη χαρά της κίνησης και στη συνεργασία μέσα σε ομάδες.",
      schedule: [
        { day: "Δευτέρα", time: "18:00 - 20:00", level: "Όλα τα επίπεδα" },
        { day: "Τετάρτη", time: "18:00 - 20:00", level: "Όλα τα επίπεδα" },
        { day: "Παρασκευή", time: "18:00 - 20:00", level: "Χορογραφία" },
      ],
      coach: {
        name: "Ελένη Δαρδαμάνη",
        photo: "/female-gymnastics-coach.jpg",
        studies: "Πτυχίο Φυσικής Αγωγής, Πιστοποίηση ΓγΟ",
        bio: "Η Ελένη έχει εκπαιδεύσει ομάδες που έχουν συμμετάσχει σε Παγκόσμιες και Ευρωπαϊκές Γυμναστράδες. Η ΓγΟ εστιάζει στα 4F: Fun (Ψυχαγωγία), Fitness (Υγεία), Fundamentals (Δεξιότητες), Friendship (Φιλία).",
      },
      imagePosition: "left",
      additionalInfo:
        "Η ΓγΟ περιλαμβάνει στοιχεία ρυθμικής γυμναστικής, ενόργανης, ακροβατικής, αεροβικής και χορού. Οι ομάδες συμμετέχουν σε διάφορα Φεστιβάλ Γυμναστικής καθώς και σε Παγκόσμιες και Ευρωπαϊκές Γυμναστράδες. Επίσης, μπορούν να συμμετέχουν και σε Φεστιβάλ με διαγωνιστικό χαρακτήρα, τα λεγόμενα Contest καθώς και στις διοργανώσεις World ή European Gym for life Challenge.",
    },
    {
      id: 6,
      title: "Adults Group GfA",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg",
      description:
        "Το τμήμα ενηλίκων Γυμναστικής για όλους (ΓγΟ) του συλλόγου μας αποσκοπεί στην εκγύμναση των αθλουμένων (ασκήσεις ενδυνάμωσης, αντοχής, ευλυγισίας, ισορροπίας), στην ψυχική ευεξία, στην έκφρασή τους μέσω της κίνησης και της μουσικής, στη δημιουργία μιας ομάδας που θα συμμετάσχει σε Φεστιβάλ Γυμναστικής με πρόγραμμα γυμναστικής-χορογραφική σύνθεση, στη χαρά της συμμετοχής, στη δημιουργία όμορφων εμπειριών.",
      schedule: [
        { day: "Τρίτη", time: "19:00 - 21:00", level: "Ενήλικες" },
        { day: "Πέμπτη", time: "19:00 - 21:00", level: "Ενήλικες" },
        { day: "Σάββατο", time: "11:00 - 13:00", level: "Χορογραφία" },
      ],
      coach: {
        name: "Μαρία Παπαδοπούλου",
        photo: "/female-rhythmic-gymnastics-coach.jpg",
        studies: "Πτυχίο Χορού & Ρυθμικής Γυμναστικής, Ειδίκευση ΓγΟ",
        bio: "Η Μαρία ειδικεύεται στη δημιουργία χορογραφικών συνθέσεων που συνδυάζουν στοιχεία ενόργανης, ρυθμικής, ακροβατικής και αεροβικής γυμναστικής με χορευτικά στοιχεία.",
      },
      imagePosition: "right",
      additionalInfo:
        "Στη Γυμναστική για όλους με τον όρο «χορογραφική σύνθεση» εννοούμε τη δημιουργία ομαδικού γυμναστικού προγράμματος που περιέχει στοιχεία ενόργανης, ρυθμικής, ακροβατικής, αεροβικής συνδεδεμένα με χορευτικά στοιχεία. Τα στοιχεία που επιλέγονται είναι ανάλογα με το επίπεδο και την ηλικία των αθλουμένων. Οι προπονήσεις έχουν στόχο να ενώσουν την τέχνη της κίνησης με τη χαρά της συμμετοχής.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
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
              Τμήματα
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Ανακαλύψτε τα προγράμματά μας και βρείτε το ιδανικό τμήμα για εσάς ή το παιδί σας
            </p>
          </div>
        </div>
      </section>

      {/* Programs Sections */}
      {programs.map((program, index) => (
        <section key={program.id} className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-background"}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center text-balance">
                {program.title}
              </h2>

              {/* Content Layout - Alternating */}
              <div
                className={`grid md:grid-cols-2 gap-12 items-start mb-8 ${
                  program.imagePosition === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${program.imagePosition === "right" ? "md:order-2" : "md:order-1"}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className={`space-y-6 ${program.imagePosition === "right" ? "md:order-1" : "md:order-2"}`}>
                  <p className="text-lg leading-relaxed text-muted-foreground">{program.description}</p>

                  {/* Additional Info for new programs */}
                  {program.additionalInfo && (
                    <p className="text-base leading-relaxed text-muted-foreground bg-primary/5 p-4 rounded-xl">
                      {program.additionalInfo}
                    </p>
                  )}

                  {/* Schedule Table */}
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
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 px-2">{slot.day}</td>
                              <td className="py-3 px-2">{slot.time}</td>
                              <td className="py-3 px-2">{slot.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Κατέβασε το Πρόγραμμα (PDF)
                  </Button>
                </div>
              </div>

              {/* Coach Info */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                <h3 className="text-3xl font-bold text-primary mb-8 text-center">Προπονητής/τρια</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Coach Photo */}
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src={program.coach.photo || "/placeholder.svg"}
                      alt={program.coach.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Coach Details */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <h4 className="text-2xl font-bold text-primary">{program.coach.name}</h4>
                    <p className="text-accent font-semibold">{program.coach.studies}</p>
                    <p className="text-lg leading-relaxed text-muted-foreground">{program.coach.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  )
}

import { richTextToHTML, richTextToPlainText } from '@/lib/richText'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const toRecordArray = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? value.filter(isRecord) : []

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback)

const asStringOrUndefined = (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined)

const mapParagraphs = (value: unknown, fallback: string[]): string[] => {
  if (Array.isArray(value)) {
    const mapped = value
      .map((entry) => {
        if (isRecord(entry)) {
          if ('content' in entry) {
            return richTextToPlainText(entry.content)
          }
          if ('text' in entry) {
            return richTextToPlainText(entry.text)
          }
        }
        return richTextToPlainText(entry)
      })
      .map((paragraph) => (paragraph ?? '').trim())
      .filter(Boolean)

    if (mapped.length > 0) {
      return mapped
    }
  }

  const single = richTextToPlainText(value) ?? ''
  if (single.trim().length > 0) {
    return [single.trim()]
  }

  return fallback
}

/* -------------------------------------------------------------------------- */
/*                                   ABOUT                                    */
/* -------------------------------------------------------------------------- */

export interface AboutStorySection {
  title: string
  paragraphs: string[]
  image: string
  imagePosition: 'left' | 'right'
}

export interface AboutSpacesItem {
  title: string
  image: string
}

export interface AboutPageData {
  heroTitle: string
  introParagraphs: string[]
  quote: string
  mottoTitle: string
  mottoLines: string[]
  artSection: {
    title: string
    subtitle: string
    paragraphs: string[]
  }
  storySections: AboutStorySection[]
  spaces: {
    title: string
    items: AboutSpacesItem[]
  }
}

export const defaultAboutPageData: AboutPageData = {
  heroTitle: 'Ο Σύλλογος',
  introParagraphs: [
    'Όραμά μας είναι να μεταδώσουμε στα παιδιά την αγάπη μας για τη Γυμναστική και να συμβάλλουμε στη σωματική, ψυχική, πνευματική και κοινωνική τους ανάπτυξη.',
    'Στόχος μας είναι να τους διδάξουμε εκτός από Γυμναστική και τις αξίες της ζωής και να τους δώσουμε χαρά, αγάπη και μοναδικές εμπειρίες μέσα από τη Γυμναστική.',
  ],
  quote: 'Υπάρχει ομορφότερο πράγμα από το να φωτίζεις τις ψυχές των παιδιών;',
  mottoTitle: '•Καλλιτεχνία•',
  mottoLines: ['Η Τέχνη της Κίνησης – Η Ψυχή της Γυμναστικής'],
  artSection: {
    title: 'Καλλιτεχνία',
    subtitle: 'Η Τέχνη της Κίνησης – Η Ψυχή της Γυμναστικής',
    paragraphs: [
      'Στα αθλήματα της Γυμναστικής όπως η Γυμναστική για Όλους, η Ρυθμική, η Ενόργανη, η Ακροβατική, η καλλιτεχνία δεν είναι λεπτομέρεια – είναι ουσία. Είναι αυτή που ενώνει την τεχνική με το συναίσθημα.',
      'Η ροή της κίνησης, η σύνδεση των ασκήσεων με τη μουσική, η έκφραση των αθλητών, η δυναμική, η απόδοση της χορογραφίας, η παρουσία– ολα αξιολογούνται και βαθμολογούνται και συνθέτουν αυτό που ονομάζουμε καλλιτεχνία.',
      'Ένα πρόγραμμα τεχνικά άρτιο, αλλά χωρίς ψυχή, μένει ημιτελές. Αντίθετα, όταν η τεχνική συνοδεύεται από καλλιτεχνική αρτιότητα, το αποτέλεσμα είναι μαγικό. Η συναισθηματική σύνδεση που δημιουργεί ένας αθλητής με τους θεατές και τους κριτές, είναι αυτή που μπορεί να κάνει τη διαφορά.',
      'Η γυμναστική δεν είναι απλώς άσκηση – είναι έκφραση, ρυθμός, παρουσία. Είναι Καλλιτεχνία.',
    ],
  },
  storySections: [
    {
      title: 'Σχετικά με εμάς',
      paragraphs: [
        'Η Γυμναστική Καλλιτεχνία Κεφαλονιάς ιδρύθηκε από μια ομάδα ανθρώπων με κοινό γνώρισμά τους την αγάπη τους για τα παιδιά. Όραμά τους είναι να προσφέρουν στα παιδιά της Κεφαλονιάς την ευκαιρία να ασχοληθούν με τη Γυμναστική, καλλιεργώντας το σώμα και τη ψυχή τους με σεβασμό και αγάπη.',
      ],
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg',
      imagePosition: 'left',
    },
    {
      title: 'Σκοπός',
      paragraphs: [
        'Ο κύριος σκοπός του συλλόγου μας είναι η προώθηση της Γυμναστικής στην Κεφαλονιά, προσφέροντας ποιοτικά προγράμματα εκπαίδευσης για όλες τις ηλικίες και τα επίπεδα.',
        'Επιδιώκουμε να αναπτύξουμε τις σωματικές και ψυχικές ικανότητες των αθλητών μας, καλλιεργώντας παράλληλα αξίες όπως η ομαδικότητα, ο σεβασμός, η επιμονή και η πειθαρχία.',
        'Στόχος μας είναι να δημιουργήσουμε ένα ασφαλές και υποστηρικτικό περιβάλλον όπου κάθε αθλητής μπορεί να εξελιχθεί στο μέγιστο των δυνατοτήτων του, είτε επιδιώκει την αθλητική του εξέλιξη είτε απλά την προσωπική του ανάπτυξη μέσω του αθλήματος.',
      ],
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg',
      imagePosition: 'right',
    },
    {
      title: 'Φιλοσοφία',
      paragraphs: [
        'Πιστεύουμε ότι η γυμναστική είναι πολύ περισσότερο από ένα άθλημα - είναι ένας τρόπος ζωής που διαμορφώνει χαρακτήρες και χτίζει μελλοντικούς πρωταθλητές, όχι μόνο στον αθλητισμό αλλά και στη ζωή.',
        'Η φιλοσοφία μας βασίζεται στην ισορροπία μεταξύ της αγωνιστικής αριστείας και της προσωπικής ανάπτυξης. Κάθε αθλητής είναι μοναδικός και αξίζει εξατομικευμένη προσοχή και καθοδήγηση.',
        'Προάγουμε ένα περιβάλλον θετικής ενέργειας, όπου τα λάθη είναι ευκαιρίες μάθησης, οι προκλήσεις είναι ευκαιρίες ανάπτυξης και κάθε επιτυχία, μικρή ή μεγάλη, γιορτάζεται με ενθουσιασμό. Η χαρά της γυμναστικής είναι στο ταξίδι, όχι μόνο στον προορισμό.',
      ],
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg',
      imagePosition: 'left',
    },
  ],
  spaces: {
    title: 'Χώροι Εκγύμνασης',
    items: [
      {
        title: 'Χώρος προπόνησης 1',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg',
      },
      {
        title: 'Χώρος προπόνησης 2',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg',
      },
      {
        title: 'Χώρος προπόνησης 3',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6068%20%281%29-Vk2nWKd2qSVzRl2ldqmb919zO5TCf9.jpeg',
      },
      {
        title: 'Χώρος προπόνησης 4',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6340%20%281%29-6T0A1KQPyDVi8Gr7ev3c5o4qGRiEuW.jpeg',
      },
    ],
  },
}

export function mapKalitechniaAbout(content: unknown): AboutPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root

  const hero = isRecord(sections.hero) ? sections.hero : {}
  const intro = isRecord(sections.intro) ? sections.intro : {}
  const art = isRecord(sections.art) ? sections.art : {}
  const stories = toRecordArray(sections.storySections ?? sections.stories)
  const spaces = isRecord(sections.spaces) ? sections.spaces : {}
  const quote = isRecord(sections.quote) ? sections.quote : {}
  const motto = isRecord(sections.motto) ? sections.motto : {}

  const mappedStories =
    stories.length > 0
      ? stories.map((item, index) => {
          const fallback = defaultAboutPageData.storySections[index] ?? defaultAboutPageData.storySections[0]
          const paragraphs = mapParagraphs(item.paragraphs ?? item.body ?? item.text, fallback.paragraphs)
          const position = asString(item.imagePosition, fallback.imagePosition)
          const imagePosition: AboutStorySection['imagePosition'] = position === 'right' ? 'right' : 'left'
          return {
            title: asString(item.title, fallback.title),
            paragraphs,
            image: asString(item.image ?? item.imageUrl, fallback.image),
            imagePosition,
          }
        })
      : defaultAboutPageData.storySections

  const spacesItems = toRecordArray(spaces.items).map((item, index) => {
    const fallback = defaultAboutPageData.spaces.items[index] ?? defaultAboutPageData.spaces.items[0]
    return {
      title: asString(item.title, fallback.title),
      image: asString(item.image ?? item.imageUrl, fallback.image),
    }
  })

  return {
    heroTitle: asString(hero.title ?? sections.heroTitle, defaultAboutPageData.heroTitle),
    introParagraphs: mapParagraphs(intro.paragraphs ?? sections.paragraphs, defaultAboutPageData.introParagraphs),
    quote: asString(quote.text ?? sections.quote ?? '', defaultAboutPageData.quote),
    mottoTitle: asString(motto.title ?? sections.mottoTitle, defaultAboutPageData.mottoTitle),
    mottoLines: mapParagraphs(motto.lines ?? sections.mottoLines, defaultAboutPageData.mottoLines),
    artSection: {
      title: asString(art.title, defaultAboutPageData.artSection.title),
      subtitle: asString(
        richTextToPlainText(art.subtitle) || art.subtitle,
        defaultAboutPageData.artSection.subtitle,
      ),
      paragraphs: mapParagraphs(art.paragraphs ?? art.body, defaultAboutPageData.artSection.paragraphs),
    },
    storySections: mappedStories,
    spaces: {
      title: asString(spaces.title, defaultAboutPageData.spaces.title),
      items: spacesItems.length > 0 ? spacesItems : defaultAboutPageData.spaces.items,
    },
  }
}

/* -------------------------------------------------------------------------- */
/*                                  PROGRAMS                                  */
/* -------------------------------------------------------------------------- */

export interface ProgramSchedule {
  day: string
  time: string
  level: string
}

export interface ProgramCoach {
  name: string
  photo: string
  studies: string
  bio: string
}

export interface ProgramsPageProgram {
  title: string
  description: string
  image: string
  imagePosition: 'left' | 'right'
  schedule: ProgramSchedule[]
  coach: ProgramCoach
  additionalInfo?: string
}

export interface ProgramsPageData {
  hero: {
    title: string
    subtitle: string
  }
  programs: ProgramsPageProgram[]
}

const defaultPrograms: ProgramsPageProgram[] = [
  {
    title: 'Καλλιτεχνική Γυμναστική',
    description:
      'Η καλλιτεχνική γυμναστική είναι ένα ολοκληρωμένο άθλημα που αναπτύσσει δύναμη, ευλυγισία, ισορροπία και συντονισμό. Οι αθλητές μας εκπαιδεύονται σε όλα τα όργανα (δοκός, παράλληλες, έδαφος, ίππος) με έμφαση στην τεχνική και την ασφάλεια. Το πρόγραμμα προσαρμόζεται στις ανάγκες κάθε αθλητή, από αρχάριους έως προχωρημένους.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg',
    imagePosition: 'left',
    schedule: [
      { day: 'Δευτέρα', time: '17:00 - 19:00', level: 'Αρχάριοι' },
      { day: 'Τρίτη', time: '17:00 - 19:00', level: 'Μεσαίοι' },
      { day: 'Τετάρτη', time: '17:00 - 19:00', level: 'Αρχάριοι' },
      { day: 'Πέμπτη', time: '17:00 - 19:00', level: 'Προχωρημένοι' },
      { day: 'Παρασκευή', time: '17:00 - 19:00', level: 'Όλα τα επίπεδα' },
    ],
    coach: {
      name: 'Ελένη Δαρδαμάνη',
      photo: '/female-gymnastics-coach.jpg',
      studies: 'Πτυχίο Φυσικής Αγωγής, Πιστοποίηση Καλλιτεχνικής Γυμναστικής',
      bio: 'Με πάνω από 15 χρόνια εμπειρίας στην καλλιτεχνική γυμναστική, η Ελένη έχει εκπαιδεύσει δεκάδες αθλητές που έχουν διακριθεί σε πανελλήνιους αγώνες. Η φιλοσοφία της βασίζεται στην ολιστική ανάπτυξη του αθλητή.',
    },
  },
  {
    title: 'Ρυθμική Γυμναστική',
    description:
      'Η ρυθμική γυμναστική συνδυάζει τη χάρη του χορού με την αθλητική τεχνική. Οι αθλήτριές μας εκπαιδεύονται με όργανα (σχοινί, στεφάνι, μπάλα, κορδέλα, κλαβ) αναπτύσσοντας μουσικότητα, έκφραση και καλλιτεχνική ερμηνεία. Το πρόγραμμα περιλαμβάνει χορογραφίες και συμμετοχή σε επιδείξεις.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg',
    imagePosition: 'right',
    schedule: [
      { day: 'Δευτέρα', time: '16:00 - 18:00', level: 'Αρχάριοι' },
      { day: 'Τρίτη', time: '16:00 - 18:00', level: 'Μεσαίοι' },
      { day: 'Τετάρτη', time: '16:00 - 18:00', level: 'Αρχάριοι' },
      { day: 'Πέμπτη', time: '16:00 - 18:00', level: 'Προχωρημένοι' },
      { day: 'Σάββατο', time: '10:00 - 12:00', level: 'Όλα τα επίπεδα' },
    ],
    coach: {
      name: 'Μαρία Παπαδοπούλου',
      photo: '/female-rhythmic-gymnastics-coach.jpg',
      studies: 'Πτυχίο Χορού & Ρυθμικής Γυμναστικής, Διεθνής Πιστοποίηση FIG',
      bio: 'Πρώην αθλήτρια ρυθμικής γυμναστικής με συμμετοχές σε διεθνείς διοργανώσεις. Η Μαρία φέρνει τη δημιουργικότητα και την καλλιτεχνική της ματιά στην εκπαίδευση των νέων αθλητριών.',
    },
  },
  {
    title: 'Προαγωνιστικά Τμήματα',
    description:
      'Τα προαγωνιστικά τμήματα απευθύνονται σε αθλητές που επιθυμούν να συμμετέχουν σε αγώνες και να αναπτύξουν τις δεξιότητές τους σε ανταγωνιστικό επίπεδο. Το πρόγραμμα περιλαμβάνει εντατική προπόνηση, φυσική κατάσταση, τεχνική καθοδήγηση και ψυχολογική υποστήριξη για την επίτευξη των στόχων.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg',
    imagePosition: 'left',
    schedule: [
      { day: 'Δευτέρα', time: '18:00 - 20:30', level: "Προαγωνιστικό Α'" },
      { day: 'Τρίτη', time: '18:00 - 20:30', level: "Προαγωνιστικό Β'" },
      { day: 'Τετάρτη', time: '18:00 - 20:30', level: "Προαγωνιστικό Α'" },
      { day: 'Πέμπτη', time: '18:00 - 20:30', level: "Προαγωνιστικό Β'" },
      { day: 'Παρασκευή', time: '18:00 - 20:30', level: 'Όλα τα τμήματα' },
      { day: 'Σάββατο', time: '09:00 - 12:00', level: 'Φυσική κατάσταση' },
    ],
    coach: {
      name: 'Νίκος Αντωνίου',
      photo: '/male-gymnastics-coach.jpg',
      studies: 'Πτυχίο Επιστήμης Φυσικής Αγωγής, Μεταπτυχιακό Αθλητικής Απόδοσης',
      bio: 'Ο Νίκος έχει εκπαιδεύσει πολλούς πρωταθλητές που έχουν κατακτήσει μετάλλια σε εθνικό και διεθνές επίπεδο. Η προσέγγισή του συνδυάζει επιστημονική μεθοδολογία με ατομική προσοχή.',
    },
  },
  {
    title: 'Παιδικά Τμήματα',
    description:
      'Τα παιδικά τμήματα προσφέρουν μια διασκεδαστική και ασφαλή εισαγωγή στον κόσμο της γυμναστικής για παιδιά ηλικίας 3-7 ετών. Μέσα από παιχνίδι και δημιουργικές δραστηριότητες, τα παιδιά αναπτύσσουν βασικές κινητικές δεξιότητες, ισορροπία, συντονισμό και κοινωνικές ικανότητες σε ένα χαρούμενο περιβάλλον.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg',
    imagePosition: 'right',
    schedule: [
      { day: 'Δευτέρα', time: '16:00 - 17:00', level: '3-4 ετών' },
      { day: 'Τρίτη', time: '16:00 - 17:00', level: '5-7 ετών' },
      { day: 'Τετάρτη', time: '16:00 - 17:00', level: '3-4 ετών' },
      { day: 'Πέμπτη', time: '16:00 - 17:00', level: '5-7 ετών' },
      { day: 'Παρασκευή', time: '16:00 - 17:00', level: 'Όλες οι ηλικίες' },
    ],
    coach: {
      name: 'Σοφία Γεωργίου',
      photo: '/female-children-gymnastics-coach.jpg',
      studies: 'Πτυχίο Προσχολικής Αγωγής, Ειδίκευση Παιδικής Γυμναστικής',
      bio: 'Η Σοφία ειδικεύεται στην εργασία με μικρά παιδιά και δημιουργεί ένα θετικό και ενθαρρυντικό περιβάλλον όπου κάθε παιδί νιώθει ασφαλές να εξερευνήσει τις δυνατότητές του.',
    },
  },
  {
    title: 'Γυμναστική για Όλους',
    description:
      'Πόσοι από εσάς γνωρίζετε το συγκεκριμένο άθλημα; Πολλοί και ιδίως τα μικρά παιδιά το μπερδεύουν με τη ρυθμική ή την ενόργανη. Η Γυμναστική για Όλους (ΓγΟ) αποτελεί ένα από τα βασικά αθλήματα της Ομοσπονδίας Γυμναστικής και απευθύνεται σε άτομα κάθε ηλικίας και επιπέδου φυσικής κατάστασης. Είναι ένα ομαδικό άθλημα χωρίς αγωνιστικούς περιορισμούς, που δίνει έμφαση στη συμμετοχή, στη χαρά της κίνησης και στη συνεργασία μέσα σε ομάδες.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg',
    imagePosition: 'left',
    schedule: [
      { day: 'Δευτέρα', time: '18:00 - 20:00', level: 'Όλα τα επίπεδα' },
      { day: 'Τετάρτη', time: '18:00 - 20:00', level: 'Όλα τα επίπεδα' },
      { day: 'Παρασκευή', time: '18:00 - 20:00', level: 'Χορογραφία' },
    ],
    coach: {
      name: 'Ελένη Δαρδαμάνη',
      photo: '/female-gymnastics-coach.jpg',
      studies: 'Πτυχίο Φυσικής Αγωγής, Πιστοποίηση ΓγΟ',
      bio: 'Η Ελένη έχει εκπαιδεύσει ομάδες που έχουν συμμετάσχει σε Παγκόσμιες και Ευρωπαϊκές Γυμναστράδες. Η ΓγΟ εστιάζει στα 4F: Fun (Ψυχαγωγία), Fitness (Υγεία), Fundamentals (Δεξιότητες), Friendship (Φιλία).',
    },
    additionalInfo:
      'Η ΓγΟ περιλαμβάνει στοιχεία ρυθμικής γυμναστικής, ενόργανης, ακροβατικής, αεροβικής και χορού. Οι ομάδες συμμετέχουν σε διάφορα Φεστιβάλ Γυμναστικής καθώς και σε Παγκόσμιες και Ευρωπαϊκές Γυμναστράδες. Επίσης, μπορούν να συμμετέχουν και σε Φεστιβάλ με διαγωνιστικό χαρακτήρα, τα λεγόμενα Contest καθώς και στις διοργανώσεις World ή European Gym for life Challenge.',
  },
  {
    title: 'Adults Group GfA',
    description:
      'Το τμήμα ενηλίκων Γυμναστικής για όλους (ΓγΟ) του συλλόγου μας αποσκοπεί στην εκγύμναση των αθλουμένων (ασκήσεις ενδυνάμωσης, αντοχής, ευλυγισίας, ισορροπίας), στην ψυχική ευεξία, στην έκφρασή τους μέσω της κίνησης και της μουσικής, στη δημιουργία μιας ομάδας που θα συμμετάσχει σε Φεστιβάλ Γυμναστικής με πρόγραμμα γυμναστικής-χορογραφική σύνθεση, στη χαρά της συμμετοχής, στη δημιουργία όμορφων εμπειριών.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg',
    imagePosition: 'right',
    schedule: [
      { day: 'Τρίτη', time: '19:00 - 21:00', level: 'Ενήλικες' },
      { day: 'Πέμπτη', time: '19:00 - 21:00', level: 'Ενήλικες' },
      { day: 'Σάββατο', time: '11:00 - 13:00', level: 'Χορογραφία' },
    ],
    coach: {
      name: 'Μαρία Παπαδοπούλου',
      photo: '/female-rhythmic-gymnastics-coach.jpg',
      studies: 'Πτυχίο Χορού & Ρυθμικής Γυμναστικής, Ειδίκευση ΓγΟ',
      bio: 'Η Μαρία ειδικεύεται στη δημιουργία χορογραφικών συνθέσεων που συνδυάζουν στοιχεία ενόργανης, ρυθμικής, ακροβατικής και αεροβικής γυμναστικής με χορευτικά στοιχεία.',
    },
    additionalInfo:
      'Στη Γυμναστική για όλους με τον όρο «χορογραφική σύνθεση» εννοούμε τη δημιουργία ομαδικού γυμναστικού προγράμματος που περιέχει στοιχεία ενόργανης, ρυθμικής, ακροβατικής, αεροβικής συνδεδεμένα με χορευτικά στοιχεία. Τα στοιχεία που επιλέγονται είναι ανάλογα με το επίπεδο και την ηλικία των αθλουμένων. Οι προπονήσεις έχουν στόχο να ενώσουν την τέχνη της κίνησης με τη χαρά της συμμετοχής.',
  },
]

export const defaultProgramsPageData: ProgramsPageData = {
  hero: {
    title: 'Τμήματα',
    subtitle: 'Ανακαλύψτε τα προγράμματά μας και βρείτε το ιδανικό τμήμα για εσάς ή το παιδί σας',
  },
  programs: defaultPrograms,
}

export function mapKalitechniaPrograms(content: unknown): ProgramsPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root

  const hero = isRecord(sections.hero) ? sections.hero : {}
  const programsSection = isRecord(sections.programs) ? sections.programs : {}
  const programs = toRecordArray(programsSection.items)

  const mappedPrograms: ProgramsPageProgram[] =
    programs.length > 0
      ? programs.map((item, index) => {
          const fallback = defaultPrograms[index] ?? defaultPrograms[0]
          const scheduleEntries = toRecordArray(item.schedule).map((row, idx) => {
            const fallbackRow = fallback.schedule[idx] ?? fallback.schedule[0]
            return {
              day: asString(row.day, fallbackRow.day),
              time: asString(row.time, fallbackRow.time),
              level: asString(row.level, fallbackRow.level),
            }
          })

          const coach = isRecord(item.coach) ? item.coach : {}
          const imagePosition: ProgramsPageProgram['imagePosition'] =
            asString(item.imagePosition, fallback.imagePosition) === 'right' ? 'right' : 'left'

          return {
            title: asString(item.title, fallback.title),
            description: richTextToPlainText(item.description) || fallback.description,
            image: asString(item.image ?? item.imageUrl, fallback.image),
            imagePosition,
            additionalInfo: richTextToPlainText(item.additionalInfo) || asString(item.additionalInfo, fallback.additionalInfo ?? ''),
            schedule: scheduleEntries.length > 0 ? scheduleEntries : fallback.schedule,
            coach: {
              name: asString(coach.name, fallback.coach.name),
              photo: asString(coach.photo ?? coach.image ?? coach.imageUrl, fallback.coach.photo),
              studies: asString(coach.studies, fallback.coach.studies),
              bio: richTextToPlainText(coach.bio) || fallback.coach.bio,
            },
          }
        })
      : defaultPrograms

  return {
    hero: {
      title: asString(hero.title, defaultProgramsPageData.hero.title),
      subtitle: richTextToPlainText(hero.subtitle) || defaultProgramsPageData.hero.subtitle,
    },
    programs: mappedPrograms,
  }
}

/* -------------------------------------------------------------------------- */
/*                                   CONTACT                                  */
/* -------------------------------------------------------------------------- */

export type IconName = 'mapPin' | 'phone' | 'mail' | 'clock' | 'facebook' | 'instagram' | 'tiktok' | 'youtube'

export interface ContactFormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
}

export interface ContactFormData {
  title: string
  description: string
  submitLabel: string
  fields: ContactFormField[]
}

export interface ContactInfoCard {
  icon: IconName
  title: string
  lines: string[]
}

export interface ContactMapSection {
  title: string
  embedUrl: string
}

export interface ContactPageData {
  hero: {
    title: string
    subtitle: string
  }
  form: ContactFormData
  infoCards: ContactInfoCard[]
  map: ContactMapSection
}

export const defaultContactPageData: ContactPageData = {
  hero: {
    title: 'Επικοινωνία',
    subtitle: 'Είμαστε πάντα στη διάθεσή σας για οποιαδήποτε πληροφορία.',
  },
  form: {
    title: 'Στείλτε μας Μήνυμα',
    description: 'Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.',
    submitLabel: 'Αποστολή Μηνύματος',
    fields: [
      { id: 'firstName', label: 'Όνομα *', type: 'text', placeholder: 'Το όνομά σας', required: true },
      { id: 'lastName', label: 'Επώνυμο *', type: 'text', placeholder: 'Το επώνυμό σας', required: true },
      { id: 'email', label: 'Email *', type: 'email', placeholder: 'email@example.com', required: true },
      { id: 'phone', label: 'Τηλέφωνο', type: 'tel', placeholder: '+30 123 456 7890' },
      { id: 'subject', label: 'Θέμα *', type: 'text', placeholder: 'Πώς μπορούμε να σας βοηθήσουμε;', required: true },
      { id: 'message', label: 'Μήνυμα *', type: 'textarea', placeholder: 'Γράψτε το μήνυμά σας εδώ...', required: true },
    ],
  },
  infoCards: [
    {
      icon: 'mapPin',
      title: 'Διεύθυνση',
      lines: ['Αργοστόλι', 'Κεφαλονιά, 28100', 'Ελλάδα'],
    },
    {
      icon: 'phone',
      title: 'Τηλέφωνο',
      lines: ['+30 123 456 7890', '+30 098 765 4321'],
    },
    {
      icon: 'mail',
      title: 'Email',
      lines: ['info@kallitechnia-kefalonia.gr', 'contact@kallitechnia-kefalonia.gr'],
    },
    {
      icon: 'clock',
      title: 'Ώρες Λειτουργίας',
      lines: ['Δευτέρα - Παρασκευή: 16:00 - 21:00', 'Σάββατο: 10:00 - 14:00', 'Κυριακή: Κλειστά'],
    },
  ],
  map: {
    title: 'Πού Βρισκόμαστε',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50234.89474920634!2d20.456789!3d38.176944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135e4c3e3e3e3e3e%3A0x3e3e3e3e3e3e3e3e!2sArgostoli%2C%20Greece!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  },
}

export function mapKalitechniaContact(content: unknown): ContactPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root

  const hero = isRecord(sections.hero) ? sections.hero : {}
  const form = isRecord(sections.form) ? sections.form : {}
  const formFields = toRecordArray(form.fields)
  const infoCards = toRecordArray(sections.infoCards ?? sections.contacts)
  const map = isRecord(sections.map) ? sections.map : {}

  const mappedFields =
    formFields.length > 0
      ? formFields.map((field, index) => {
          const fallback = defaultContactPageData.form.fields[index] ?? defaultContactPageData.form.fields[0]
          const typeCandidate = asString(field.type, fallback.type)
          const type: ContactFormField['type'] =
            typeCandidate === 'email' || typeCandidate === 'tel' || typeCandidate === 'textarea' ? typeCandidate : 'text'

          return {
            id: asString(field.id ?? field.name, fallback.id),
            label: asString(field.label, fallback.label),
            type,
            placeholder: asStringOrUndefined(field.placeholder) ?? fallback.placeholder,
            required: typeof field.required === 'boolean' ? field.required : fallback.required,
          }
        })
      : defaultContactPageData.form.fields

  const mappedCards =
    infoCards.length > 0
      ? infoCards.map((card, index) => {
          const fallback = defaultContactPageData.infoCards[index] ?? defaultContactPageData.infoCards[0]
          const lines = mapParagraphs(card.lines ?? card.content ?? card.text, fallback.lines)
          const iconCandidate = asString(card.icon, fallback.icon)
          const allowedIcons: IconName[] = ['mapPin', 'phone', 'mail', 'clock', 'facebook', 'instagram', 'tiktok', 'youtube']
          const icon: IconName = allowedIcons.includes(iconCandidate as IconName) ? (iconCandidate as IconName) : fallback.icon
          return {
            icon,
            title: asString(card.title, fallback.title),
            lines,
          }
        })
      : defaultContactPageData.infoCards

  return {
    hero: {
      title: asString(hero.title, defaultContactPageData.hero.title),
      subtitle: richTextToPlainText(hero.subtitle) || defaultContactPageData.hero.subtitle,
    },
    form: {
      title: asString(form.title, defaultContactPageData.form.title),
      description: richTextToPlainText(form.description) || defaultContactPageData.form.description,
      submitLabel: asString(form.submitLabel ?? form.submitText, defaultContactPageData.form.submitLabel),
      fields: mappedFields,
    },
    infoCards: mappedCards,
    map: {
      title: asString(map.title, defaultContactPageData.map.title),
      embedUrl: asString(map.embedUrl ?? map.url, defaultContactPageData.map.embedUrl),
    },
  }
}

/* -------------------------------------------------------------------------- */
/*                                REGISTRATION                                */
/* -------------------------------------------------------------------------- */

export interface RegistrationDocumentSection {
  title: string
  description: string
  downloadLabel: string
  downloadUrl?: string
  requirements: string[]
}

export interface RegistrationInfoCard {
  icon: IconName
  title: string
  lines: string[]
}

export interface RegistrationFormSection {
  fields: ContactFormField[]
  consentLabel: string
  ctaLabel: string
  termsLink?: string
  privacyLink?: string
}

export interface RegistrationPageData {
  hero: {
    title: string
    subtitle: string
  }
  welcome: {
    headline: string
    subheadline: string
  }
  documents: RegistrationDocumentSection
  infoCards: RegistrationInfoCard[]
  form: RegistrationFormSection
  cta: {
    title: string
    subtitle: string
    buttonLabel: string
    buttonHref: string
  }
}

export const defaultRegistrationPageData: RegistrationPageData = {
  hero: {
    title: 'Εγγραφές',
    subtitle: 'Γίνε μέλος της οικογένειας της Καλλιτεχνίας!',
  },
  welcome: {
    headline: 'H Kallitechnia Gymnastics Kefalonia σας καλωσορίζει στην ομάδα της.',
    subheadline: 'Τα μαθήματά ξεκινούν από τη Δευτέρα 1 Δεκεμβρίου 2025!',
  },
  documents: {
    title: 'ΑΠΑΡΑΙΤΗΤΑ ΕΓΓΡΑΦΑ ΓΙΑ ΤΗΝ ΣΥΜΜΕΤΟΧΗ ΣΑΣ',
    description:
      'Μπορείτε να παραλάβετε την αίτηση εγγραφής από τη Γραμματεία του Συλλόγου ή να την κατεβάσετε σε μορφή PDF και να την τυπώσετε.',
    downloadLabel: 'Κατέβασε την Αίτηση (PDF)',
    downloadUrl: '#',
    requirements: [
      'Ιατρική βεβαίωση (πρωτότυπη)',
      'Πιστοποιητικό γέννησης (πρωτότυπο)',
      'Φωτοτυπία ταυτότητας για όσους έχουν εκδώσει',
      'Το ΑΜΚΑ της αθλήτριας',
    ],
  },
  infoCards: [
    {
      icon: 'mapPin',
      title: 'Διεύθυνση',
      lines: ['Αργοστόλι', 'Κεφαλονιά, 28100'],
    },
    {
      icon: 'phone',
      title: 'Τηλέφωνο',
      lines: ['+30 123 456 7890'],
    },
    {
      icon: 'mail',
      title: 'Email',
      lines: ['info@kallitechnia.gr'],
    },
    {
      icon: 'clock',
      title: 'Ωράριο',
      lines: ['Δευτέρα - Παρασκευή', '17:00 - 21:00'],
    },
  ],
  form: {
    fields: [
      { id: 'childFirstName', label: 'Όνομα Παιδιού *', type: 'text', placeholder: 'Εισάγετε το όνομα του παιδιού', required: true },
      { id: 'childLastName', label: 'Επώνυμο *', type: 'text', placeholder: 'Εισάγετε το επώνυμο του παιδιού', required: true },
      { id: 'age', label: 'Ηλικία *', type: 'text', placeholder: 'Εισάγετε την ηλικία', required: true },
      { id: 'parentName', label: 'Όνομα Γονέα *', type: 'text', placeholder: 'Εισάγετε το όνομα του γονέα', required: true },
      { id: 'phone', label: 'Τηλέφωνο *', type: 'tel', placeholder: '+30 123 456 7890', required: true },
      { id: 'email', label: 'Email *', type: 'email', placeholder: 'email@example.com', required: true },
      { id: 'department', label: 'Επιλογή Τμήματος *', type: 'text', placeholder: 'Επιλέξτε τμήμα', required: true },
      {
        id: 'message',
        label: 'Μήνυμα',
        type: 'textarea',
        placeholder: 'Πείτε μας περισσότερα για το παιδί σας ή τυχόν ερωτήσεις...',
      },
    ],
    consentLabel:
      'Αποδέχομαι τους Όρους Χρήσης και την Πολιτική Απορρήτου. Συμφωνώ με την επεξεργασία των προσωπικών μου δεδομένων σύμφωνα με τον GDPR.',
    ctaLabel: 'Υποβολή Εγγραφής',
    termsLink: '/terms',
    privacyLink: '/terms',
  },
  cta: {
    title: 'Κάνε την εγγραφή σου σήμερα!',
    subtitle: 'Ξεκίνα το ταξίδι σου στον κόσμο της γυμναστικής με την Καλλιτεχνία Κεφαλονιάς',
    buttonLabel: 'Επικοινώνησε μαζί μας',
    buttonHref: '/contact',
  },
}

export function mapKalitechniaRegistration(content: unknown): RegistrationPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root

  const hero = isRecord(sections.hero) ? sections.hero : {}
  const welcome = isRecord(sections.welcome) ? sections.welcome : {}
  const documents = isRecord(sections.documents) ? sections.documents : {}
  const infoCards = toRecordArray(sections.infoCards ?? sections.highlights)
  const form = isRecord(sections.form) ? sections.form : {}
  const formFields = toRecordArray(form.fields)
  const cta = isRecord(sections.cta) ? sections.cta : {}

  const mappedInfoCards =
    infoCards.length > 0
      ? infoCards.map((card, index) => {
          const fallback = defaultRegistrationPageData.infoCards[index] ?? defaultRegistrationPageData.infoCards[0]
          const iconCandidate = asString(card.icon, fallback.icon)
          const allowedIcons: IconName[] = ['mapPin', 'phone', 'mail', 'clock', 'facebook', 'instagram', 'tiktok', 'youtube']
          const icon: IconName = allowedIcons.includes(iconCandidate as IconName) ? (iconCandidate as IconName) : fallback.icon
          return {
            icon,
            title: asString(card.title, fallback.title),
            lines: mapParagraphs(card.lines ?? card.content ?? card.text, fallback.lines),
          }
        })
      : defaultRegistrationPageData.infoCards

  const mappedFormFields =
    formFields.length > 0
      ? formFields.map((field, index) => {
          const fallback = defaultRegistrationPageData.form.fields[index] ?? defaultRegistrationPageData.form.fields[0]
          const typeCandidate = asString(field.type, fallback.type)
          const type: ContactFormField['type'] =
            typeCandidate === 'email' || typeCandidate === 'tel' || typeCandidate === 'textarea' ? typeCandidate : 'text'
          return {
            id: asString(field.id ?? field.name, fallback.id),
            label: asString(field.label, fallback.label),
            type,
            placeholder: asStringOrUndefined(field.placeholder) ?? fallback.placeholder,
            required: typeof field.required === 'boolean' ? field.required : fallback.required,
          }
        })
      : defaultRegistrationPageData.form.fields

  return {
    hero: {
      title: asString(hero.title, defaultRegistrationPageData.hero.title),
      subtitle: richTextToPlainText(hero.subtitle) || defaultRegistrationPageData.hero.subtitle,
    },
    welcome: {
      headline: asString(welcome.headline, defaultRegistrationPageData.welcome.headline),
      subheadline: asString(
        richTextToPlainText(welcome.subheadline) || welcome.subheadline,
        defaultRegistrationPageData.welcome.subheadline,
      ),
    },
    documents: {
      title: asString(documents.title, defaultRegistrationPageData.documents.title),
      description: richTextToPlainText(documents.description) || defaultRegistrationPageData.documents.description,
      downloadLabel: asString(documents.downloadLabel ?? documents.ctaLabel, defaultRegistrationPageData.documents.downloadLabel),
      downloadUrl: asStringOrUndefined(documents.downloadUrl ?? documents.ctaHref ?? documents.ctaLink) ??
        defaultRegistrationPageData.documents.downloadUrl,
      requirements: mapParagraphs(documents.requirements ?? documents.items, defaultRegistrationPageData.documents.requirements),
    },
    infoCards: mappedInfoCards,
    form: {
      fields: mappedFormFields,
      consentLabel: asString(
        richTextToPlainText(form.consentLabel) || form.consentLabel,
        defaultRegistrationPageData.form.consentLabel,
      ),
      ctaLabel: asString(form.ctaLabel ?? form.submitLabel, defaultRegistrationPageData.form.ctaLabel),
      termsLink: asStringOrUndefined(form.termsLink ?? form.termsUrl) ?? defaultRegistrationPageData.form.termsLink,
      privacyLink: asStringOrUndefined(form.privacyLink ?? form.privacyUrl) ?? defaultRegistrationPageData.form.privacyLink,
    },
    cta: {
      title: asString(cta.title, defaultRegistrationPageData.cta.title),
      subtitle: richTextToPlainText(cta.subtitle) || defaultRegistrationPageData.cta.subtitle,
      buttonLabel: asString(cta.buttonLabel ?? cta.ctaLabel, defaultRegistrationPageData.cta.buttonLabel),
      buttonHref: asString(cta.buttonHref ?? cta.ctaHref ?? cta.ctaLink, defaultRegistrationPageData.cta.buttonHref),
    },
  }
}

/* -------------------------------------------------------------------------- */
/*                                    MEDIA                                   */
/* -------------------------------------------------------------------------- */

export interface MediaAsset {
  title: string
  image: string
  formats?: string[]
  downloadUrl?: string
}

export interface MediaSocialLink {
  platform: string
  icon: IconName | 'tiktok' | 'youtube'
  url: string
}

const MEDIA_SOCIAL_ICONS = ['facebook', 'instagram', 'tiktok', 'youtube'] as const
type MediaSocialIcon = (typeof MEDIA_SOCIAL_ICONS)[number]

const isMediaSocialIcon = (value: string): value is MediaSocialIcon =>
  MEDIA_SOCIAL_ICONS.includes(value as MediaSocialIcon)

export interface MediaPageData {
  hero: {
    title: string
    subtitle: string
  }
  logos: MediaAsset[]
  photos: MediaAsset[]
  banners: MediaAsset[]
  socials: MediaSocialLink[]
}

export const defaultMediaPageData: MediaPageData = {
  hero: {
    title: 'Media',
    subtitle: 'Κατεβάστε επίσημο υλικό του συλλόγου και ακολουθήστε μας στα social media',
  },
  logos: [
    {
      title: 'Λογότυπο Κύριο',
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png',
      formats: ['PNG', 'SVG'],
    },
  ],
  photos: [
    {
      title: 'Παράσταση με Καρδιές',
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg',
    },
    {
      title: 'Δραματική Παράσταση',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg',
    },
    {
      title: 'Ατμοσφαιρική Παράσταση',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg',
    },
    {
      title: 'Συγχρονισμένες Κινήσεις',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg',
    },
    {
      title: 'Παράσταση με Φώτα',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg',
    },
    {
      title: 'UV Παράσταση',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-TbMx7N5nQbbsMsgmstilBpaJCGT83X.jpeg',
    },
  ],
  banners: [
    {
      title: 'Κυματιστό Banner',
      image:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/503CB8FC-1A4E-4DD7-8E71-01239C3390BF.png-kKnLsmzgkUfG8nhQNxqb022nHJnt3l.jpeg',
    },
  ],
  socials: [
    {
      platform: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com',
    },
    {
      platform: 'Instagram',
      icon: 'instagram',
      url: 'https://instagram.com',
    },
    {
      platform: 'TikTok',
      icon: 'tiktok',
      url: 'https://tiktok.com',
    },
    {
      platform: 'YouTube',
      icon: 'youtube',
      url: 'https://youtube.com',
    },
  ],
}

export function mapKalitechniaMedia(content: unknown): MediaPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root

  const hero = isRecord(sections.hero) ? sections.hero : {}
  const logos = toRecordArray(sections.logos)
  const photos = toRecordArray(sections.photos)
  const banners = toRecordArray(sections.banners)
  const socials = toRecordArray(sections.socials)

  const mapAssets = (items: Record<string, unknown>[], fallback: MediaAsset[]) =>
    items.length > 0
      ? items.map((item, index) => {
          const defaultItem = fallback[index] ?? fallback[0]
          return {
            title: asString(item.title, defaultItem.title),
            image: asString(item.image ?? item.imageUrl, defaultItem.image),
            formats: Array.isArray(item.formats)
              ? item.formats.map((format) => asString(format, '')).filter(Boolean)
              : defaultItem.formats,
            downloadUrl: asStringOrUndefined(item.downloadUrl ?? item.downloadHref) ?? defaultItem.downloadUrl,
          }
        })
      : fallback

  const mappedSocials =
    socials.length > 0
      ? socials.map((item, index) => {
          const fallback = defaultMediaPageData.socials[index] ?? defaultMediaPageData.socials[0]
          const iconCandidate = asString(item.icon ?? item.platform, fallback.icon)
          return {
            platform: asString(item.platform ?? item.title, fallback.platform),
            icon: isMediaSocialIcon(iconCandidate) ? iconCandidate : fallback.icon,
            url: asString(item.url ?? item.href, fallback.url),
          }
        })
      : defaultMediaPageData.socials

  return {
    hero: {
      title: asString(hero.title, defaultMediaPageData.hero.title),
      subtitle: richTextToPlainText(hero.subtitle) || defaultMediaPageData.hero.subtitle,
    },
    logos: mapAssets(logos, defaultMediaPageData.logos),
    photos: mapAssets(photos, defaultMediaPageData.photos),
    banners: mapAssets(banners, defaultMediaPageData.banners),
    socials: mappedSocials,
  }
}

/* -------------------------------------------------------------------------- */
/*                                     NEWS                                   */
/* -------------------------------------------------------------------------- */

export interface NewsHeroData {
  title: string
  subtitle: string
}

export interface NewsListItem {
  id: string | number
  title: string
  date: string
  excerpt: string
  image?: string
  slug: string
}

export interface NewsListPageData {
  hero: NewsHeroData
  posts: NewsListItem[]
}

export const defaultNewsHero: NewsHeroData = {
  title: 'Νέα & Ανακοινώσεις',
  subtitle: 'Μείνετε ενημερωμένοι με τα τελευταία νέα, εκδηλώσεις και επιτυχίες του συλλόγου μας.',
}

export function mapKalitechniaNewsList(content: unknown, posts: Record<string, unknown>[]): NewsListPageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root
  const hero = isRecord(sections.hero) ? sections.hero : {}

  const mappedPosts =
    posts.length > 0
      ? posts.map((post, index) => {
          const id = post.id ?? index
          const slug = asString(post.slug, `post-${index}`)
          const excerptSource = post.excerpt ?? post.summary ?? post.description
          return {
            id: typeof id === 'number' || typeof id === 'string' ? id : index,
            title: asString(post.title, `Δημοσίευση ${index + 1}`),
            date: asString(post.publishedAt, new Date().toISOString()),
            excerpt: richTextToPlainText(excerptSource) || asString(excerptSource, ''),
            image: asStringOrUndefined(post.heroImage ?? post.imageUrl ?? post.image),
            slug,
          }
        })
      : []

  return {
    hero: {
      title: asString(hero.title, defaultNewsHero.title),
      subtitle: richTextToPlainText(hero.subtitle) || defaultNewsHero.subtitle,
    },
    posts: mappedPosts,
  }
}

export interface NewsPostData {
  title: string
  date: string
  author?: string
  heroImage?: string
  contentHtml: string
}

export function mapKalitechniaNewsPost(post: unknown): NewsPostData | null {
  if (!isRecord(post)) {
    return null
  }

  const content = post.content ?? post.body ?? ''
  const html = richTextToHTML(content) || ''

  return {
    title: asString(post.title, 'Άρθρο'),
    date: asString(post.publishedAt ?? post.createdAt, new Date().toISOString()),
    author: asStringOrUndefined(post.authorName ?? post.author),
    heroImage: asStringOrUndefined(post.heroImage ?? post.imageUrl ?? post.image),
    contentHtml: html || richTextToPlainText(content) || '',
  }
}

/* -------------------------------------------------------------------------- */
/*                                     TERMS                                  */
/* -------------------------------------------------------------------------- */

export interface TermsSection {
  heading: string
  paragraphs: string[]
}

export interface TermsPageData {
  heroTitle: string
  sections: TermsSection[]
  lastUpdated: string
}

export const defaultTermsPageData: TermsPageData = {
  heroTitle: 'Όροι Χρήσης',
  sections: [
    {
      heading: 'Όροι Χρήσης Ιστοσελίδας',
      paragraphs: [
        'Καλώς ήρθατε στην ιστοσελίδα της Γυμναστικής Καλλιτεχνίας Κεφαλονιάς. Η χρήση της παρούσας ιστοσελίδας υπόκειται στους παρακάτω όρους και προϋποθέσεις. Παρακαλούμε διαβάστε τους προσεκτικά πριν από τη χρήση της ιστοσελίδας.',
      ],
    },
  ],
  lastUpdated: 'Ιανουάριος 2025',
}

export function mapKalitechniaTerms(content: unknown): TermsPageData {
  const root = isRecord(content) ? content : {}
  const sections = toRecordArray(root.sections ?? root.content)
  const heroTitle = asString(root.heroTitle ?? root.title, defaultTermsPageData.heroTitle)
  const lastUpdated = asString(root.lastUpdated ?? root.updatedAtLabel, defaultTermsPageData.lastUpdated)

  const mappedSections =
    sections.length > 0
      ? sections.map((section, index) => {
          const heading = asString(section.heading ?? section.title, defaultTermsPageData.sections[index]?.heading ?? `Ενότητα ${index + 1}`)
          const paragraphs = mapParagraphs(section.paragraphs ?? section.body ?? section.text, defaultTermsPageData.sections[0].paragraphs)
          return {
            heading,
            paragraphs,
          }
        })
      : defaultTermsPageData.sections

  return {
    heroTitle,
    sections: mappedSections,
    lastUpdated,
  }
}




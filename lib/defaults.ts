/**
 * Default images and content fallbacks for CMS blocks
 * Used when editors don't provide content
 */

export const DEFAULT_IMAGES = {
  hero: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg",
  welcome: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg",
  programs: {
    artistic: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg",
    rhythmic: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6340%20%281%29-6T0A1KQPyDVi8Gr7ev3c5o4qGRiEuW.jpeg",
    preCompetitive: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg",
    children: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg",
  },
} as const

export const DEFAULT_CONTENT = {
  hero: {
    title: "Η Γυμναστική είναι δύναμη, χαρά, δημιουργία.",
    buttonLabel: "Δες τα Τμήματά μας",
    buttonUrl: "/programs",
  },
  welcome: {
    title: "Καλώς ήρθατε στην Καλλιτεχνία!",
  },
  programs: {
    title: "Τα Τμήματά μας",
    subtitle: "Προσφέρουμε προγράμματα για όλες τις ηλικίες και τα επίπεδα",
  },
  moments: {
    title: "Οι Στιγμές μας",
    subtitle: "Ζήστε τη μαγεία των παραστάσεων και των προπονήσεών μας",
  },
  news: {
    title: "Νέα & Ανακοινώσεις",
    subtitle: "Μείνετε ενημερωμένοι με τα τελευταία μας νέα",
  },
  sponsors: {
    title: "Οι Υποστηρικτές μας",
    subtitle: "Ευχαριστούμε θερμά τους υποστηρικτές μας",
  },
  newsletter: {
    title: "Έλα κι εσύ στην οικογένεια της Καλλιτεχνίας!",
    subtitle: "Ξεκινήστε το ταξίδι σας στον κόσμο της γυμναστικής. Προσφέρουμε δωρεάν δοκιμαστικό μάθημα!",
    buttonLabel: "Επικοινώνησε μαζί μας",
    buttonUrl: "/contact",
  },
} as const


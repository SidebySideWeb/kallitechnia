import { getAbsoluteMediaUrl } from '@/lib/payload-client'
import { richTextToPlainText } from '@/lib/richText'

export interface NavigationItem {
  label: string
  link?: string
}

export interface HeaderCTA {
  label: string
  link?: string
}

export interface HeaderData {
  logo_text: string
  logo_image?: string
  menu: NavigationItem[]
  cta: HeaderCTA
}

export interface FooterLink {
  label: string
  href?: string
}

export interface FooterSocial {
  label: string
  icon?: string
  href: string
}

export interface FooterData {
  brand: {
    name: string
    tagline?: string
    description?: string
    logo_image?: string
  }
  contact: {
    title?: string
    email?: string
    phone?: string
    address?: string
  }
  links: {
    title?: string
    items: FooterLink[]
  }
  socials: FooterSocial[]
  externalLinks: FooterLink[]
  legalLinks: FooterLink[]
  copyright: string
}

export const defaultHeaderData: HeaderData = {
  logo_text: 'kallitechnia.gr',
  logo_image:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png',
  menu: [
    { label: 'Αρχική', link: '/' },
    { label: 'Ο Σύλλογος', link: '/about' },
    { label: 'Νέα', link: '/news' },
    { label: 'Πρόγραμμα', link: '/programs' },
  ],
  cta: {
    label: 'Επικοινωνία',
    link: '/contact',
  },
}

export const defaultFooterData: FooterData = {
  brand: {
    name: 'Καλλιτεχνία',
    tagline: 'Σύλλογος Ρυθμικής & Καλλιτεχνικής Γυμναστικής',
    description:
      'Σύλλογος Γυμναστικής Καλλιτεχνίας στην Κεφαλονιά. Προάγουμε την αθλητική αριστεία και την υγιή ανάπτυξη των παιδιών.',
    logo_image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png',
  },
  contact: {
    title: 'Επικοινωνία',
    email: 'info@kallitechnia.gr',
    phone: '+30 26710 00000',
    address: 'Αργοστόλι, Κεφαλονιά',
  },
  links: {
    title: 'Χρήσιμοι Σύνδεσμοι',
    items: [
      { label: 'Αρχική', href: '/' },
      { label: 'Ο Σύλλογος', href: '/about' },
      { label: 'Νέα', href: '/news' },
      { label: 'Πρόγραμμα', href: '/programs' },
      { label: 'Εγγραφές', href: '/registration' },
      { label: 'Επικοινωνία', href: '/contact' },
    ],
  },
  socials: [
    {
      label: 'Facebook',
      icon: 'facebook',
      href: 'https://www.facebook.com/share/1CrWN7pqCy/?mibextid=wwXIfr',
    },
    {
      label: 'Instagram',
      icon: 'instagram',
      href: 'https://www.instagram.com/kallitechniagymnastics?igsh=MTRodDdpdW02c3MyYg%3D%3D&utm_source=qr',
    },
    {
      label: 'YouTube',
      icon: 'youtube',
      href: 'https://youtube.com/@kallitechniagymnastics?si=sZvo_JM4gkKPu0Lp',
    },
  ],
  externalLinks: [
    {
      label: 'FIG - International Gymnastics Federation',
      href: 'https://www.gymnastics.sport/site/',
    },
    {
      label: 'ΕΓΟ - Ελληνική Γυμναστική Ομοσπονδία',
      href: 'https://www.ego-gymnastics.gr/',
    },
  ],
  legalLinks: [
    { label: 'Όροι Χρήσης', href: '/terms' },
    { label: 'Πολιτική Απορρήτου', href: '/privacy' },
  ],
  copyright: '© 2025 Καλλιτεχνία – Όλα τα δικαιώματα διατηρούνται.',
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const toRecordArray = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? (value.filter(isRecord) as Record<string, unknown>[]) : []

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback)

const asStringOrUndefined = (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined)

const isMediaObject = (value: unknown): value is {
  url?: string
  thumbnailURL?: string
  image?: string
  imageUrl?: string
  sizes?: Record<string, { url?: string }>
} =>
  typeof value === 'object' &&
  value !== null &&
  ('url' in (value as Record<string, unknown>) ||
    'thumbnailURL' in (value as Record<string, unknown>) ||
    'image' in (value as Record<string, unknown>) ||
    'imageUrl' in (value as Record<string, unknown>) ||
    'sizes' in (value as Record<string, unknown>))

const extractUrlFromMedia = (value: Record<string, any>): string | undefined => {
  if (typeof value.url === 'string') return value.url
  if (typeof value.image === 'string') return value.image
  if (typeof value.imageUrl === 'string') return value.imageUrl
  if (typeof value.thumbnailURL === 'string') return value.thumbnailURL

  if (value.sizes && typeof value.sizes === 'object') {
    for (const size of Object.values(value.sizes as Record<string, any>)) {
      if (size && typeof size.url === 'string') {
        return size.url
      }
    }
  }

  return undefined
}

const resolveMediaUrl = (value: unknown, fallback?: string): string => {
  if (typeof value === 'string' && value.length > 0) {
    return getAbsoluteMediaUrl(value)
  }

  if (Array.isArray(value) && value.length > 0) {
    return resolveMediaUrl(value[0], fallback)
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>

    if (record.value !== undefined) {
      return resolveMediaUrl(record.value, fallback)
    }

    if (isMediaObject(record)) {
      const extracted = extractUrlFromMedia(record as Record<string, any>)
      if (extracted) {
        return getAbsoluteMediaUrl(extracted)
      }
    }

    if ('id' in record && (typeof record.id === 'string' || typeof record.id === 'number')) {
      return fallback ? getAbsoluteMediaUrl(fallback) : ''
    }
  }

  if (fallback) {
    return getAbsoluteMediaUrl(fallback)
  }

  return ''
}

export function mapHeaderContent(content: unknown): HeaderData {
  if (!isRecord(content)) {
    return defaultHeaderData
  }

  const menuItems = toRecordArray(content.menu).map((item) => ({
    label: asString(item.label, defaultHeaderData.menu[0]?.label ?? ''),
    link: asStringOrUndefined(item.link ?? item.href),
  }))

  const menu =
    menuItems.length > 0
      ? menuItems.map((item) => ({
          label: item.label,
          link: item.link ?? '/',
        }))
      : defaultHeaderData.menu

  return {
    logo_text: asString(content.logoText ?? content.logo_text, defaultHeaderData.logo_text),
    logo_image: resolveMediaUrl(content.logo_image ?? content.logoImage, defaultHeaderData.logo_image),
    menu,
    cta: {
      label: asString(
        isRecord(content.cta) ? content.cta.label : undefined,
        defaultHeaderData.cta.label,
      ),
      link:
        asStringOrUndefined(isRecord(content.cta) ? content.cta.link ?? content.cta.href : undefined) ??
        defaultHeaderData.cta.link,
    },
  }
}

export function mapFooterContent(content: unknown): FooterData {
  if (!isRecord(content)) {
    return defaultFooterData
  }

  const brand = isRecord(content.brand) ? content.brand : {}
  const contact = isRecord(content.contact) ? content.contact : {}
  const linksGroup = isRecord(content.links) ? content.links : {}

  const socials = toRecordArray(content.socials).map((item, index) => ({
    label: asString(item.label, defaultFooterData.socials[index]?.label ?? `Κανάλι ${index + 1}`),
    icon: asStringOrUndefined(item.icon),
    href:
      asStringOrUndefined(item.href ?? item.url) ?? defaultFooterData.socials[index]?.href ?? '#',
  }))

  const externalLinks = toRecordArray(content.externalLinks).map((item, index) => ({
    label: asString(item.label, defaultFooterData.externalLinks[index]?.label ?? `Link ${index + 1}`),
    href: asStringOrUndefined(item.href ?? item.url) ?? defaultFooterData.externalLinks[index]?.href ?? '#',
  }))

  const legalLinks = toRecordArray(content.legalLinks).map((item, index) => ({
    label: asString(item.label, defaultFooterData.legalLinks[index]?.label ?? `Σελίδα ${index + 1}`),
    href: asStringOrUndefined(item.href ?? item.url) ?? defaultFooterData.legalLinks[index]?.href ?? '#',
  }))

  const linkItems =
    toRecordArray(linksGroup.items).map((item) => ({
      label: asString(item.label, ''),
      href: asStringOrUndefined(item.href ?? item.link ?? item.url) ?? '#',
    })) || []

  return {
    brand: {
      name: asString(brand.name, defaultFooterData.brand.name),
      tagline: asStringOrUndefined(brand.tagline) ?? defaultFooterData.brand.tagline,
      description: asStringOrUndefined(brand.description) ?? defaultFooterData.brand.description,
      logo_image: resolveMediaUrl(brand.logo_image ?? brand.logoImage, defaultFooterData.brand.logo_image),
    },
    contact: {
      title: asStringOrUndefined(contact.title) ?? defaultFooterData.contact.title,
      email: asStringOrUndefined(contact.email) ?? defaultFooterData.contact.email,
      phone: asStringOrUndefined(contact.phone) ?? defaultFooterData.contact.phone,
      address: asStringOrUndefined(contact.address) ?? defaultFooterData.contact.address,
    },
    links: {
      title: asStringOrUndefined(linksGroup.title) ?? defaultFooterData.links.title,
      items: linkItems.length > 0 ? linkItems : defaultFooterData.links.items,
    },
    socials: socials.length > 0 ? socials : defaultFooterData.socials,
    externalLinks: externalLinks.length > 0 ? externalLinks : defaultFooterData.externalLinks,
    legalLinks: legalLinks.length > 0 ? legalLinks : defaultFooterData.legalLinks,
    copyright: asString(content.copyright, defaultFooterData.copyright),
  }
}

export interface KalitechniaHeroData {
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
  backgroundImage: string
}

export interface KalitechniaWelcomeData {
  title: string
  paragraphs: string[]
  image: string
}

export interface KalitechniaProgramItem {
  title: string
  description: string
  image: string
  linkHref: string
  linkLabel: string
  anchor?: string
}

export interface KalitechniaProgramsData {
  title: string
  subtitle: string
  items: KalitechniaProgramItem[]
}

export interface KalitechniaGalleryItem {
  title: string
  caption?: string
  image: string
}

export interface KalitechniaGalleryData {
  title: string
  subtitle: string
  items: KalitechniaGalleryItem[]
}

export interface KalitechniaNewsItem {
  title: string
  summary: string
  date: string
  href: string
  image: string
}

export interface KalitechniaNewsData {
  title: string
  subtitle: string
  items: KalitechniaNewsItem[]
}

export interface KalitechniaSponsorsData {
  title: string
  subtitle: string
  items: string[]
}

export interface KalitechniaCtaData {
  title: string
  subtitle: string
  buttonLabel: string
  buttonHref: string
}

export interface KalitechniaHomepageData {
  hero: KalitechniaHeroData
  welcome: KalitechniaWelcomeData
  programs: KalitechniaProgramsData
  gallery: KalitechniaGalleryData
  news: KalitechniaNewsData
  sponsors: KalitechniaSponsorsData
  cta: KalitechniaCtaData
  headerFooterPageSlug: string
}

export const defaultHomepageData: KalitechniaHomepageData = {
  headerFooterPageSlug: 'header-footer-kallitechnia',
  hero: {
    headline: 'Η Γυμναστική είναι δύναμη, χαρά, δημιουργία.',
    subheadline: 'Ανακαλύψτε τη μαγεία της γυμναστικής στον σύλλογό μας.',
    ctaLabel: 'Δες τα Τμήματά μας',
    ctaHref: '/programs',
    backgroundImage:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg',
  },
  welcome: {
    title: 'Καλώς ήρθατε στην Καλλιτεχνία!',
    paragraphs: [
      'Είμαι η Ελένη Δαρδαμάνη, ιδρύτρια του συλλόγου μας. Με πάθος και αφοσίωση, δημιουργήσαμε έναν χώρο όπου κάθε παιδί μπορεί να εκφραστεί, να αναπτυχθεί και να λάμψει μέσα από τη γυμναστική.',
      'Η Καλλιτεχνία δεν είναι απλώς ένας σύλλογος - είναι μια οικογένεια που υποστηρίζει κάθε αθλητή στο ταξίδι του προς την αριστεία.',
      'Ελάτε να γνωρίσετε τον κόσμο της γυμναστικής μαζί μας!',
    ],
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6321-EPivdvbOD9wX1IPMd2dA4e3aZlVtiE.jpeg',
  },
  programs: {
    title: 'Τα Τμήματά μας',
    subtitle: 'Προσφέρουμε προγράμματα για όλες τις ηλικίες και τα επίπεδα',
    items: [
      {
        title: 'Καλλιτεχνική',
        description: 'Αναπτύξτε δύναμη, ευλυγισία και χάρη μέσα από την καλλιτεχνική γυμναστική',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg',
        linkHref: '/programs#kallitexniki',
        linkLabel: 'Μάθετε Περισσότερα',
        anchor: 'kallitexniki',
      },
      {
        title: 'Ρυθμική',
        description: 'Συνδυάστε χορό, μουσική και γυμναστική με όργανα όπως κορδέλα και μπάλα',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6340%20%281%29-6T0A1KQPyDVi8Gr7ev3c5o4qGRiEuW.jpeg',
        linkHref: '/programs#rythmiki',
        linkLabel: 'Μάθετε Περισσότερα',
        anchor: 'rythmiki',
      },
      {
        title: 'Προαγωνιστικά',
        description: 'Εντατική προετοιμασία για αθλητές που στοχεύουν σε αγώνες και διακρίσεις',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg',
        linkHref: '/programs#proagonistika',
        linkLabel: 'Μάθετε Περισσότερα',
        anchor: 'proagonistika',
      },
      {
        title: 'Παιδικά',
        description: 'Εισαγωγή στη γυμναστική για παιδιά 4-7 ετών με παιχνίδι και διασκέδαση',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6323-LZ8D1nFb8q5atienRmdoRw14ABglt6.jpeg',
        linkHref: '/programs#paidika',
        linkLabel: 'Μάθετε Περισσότερα',
        anchor: 'paidika',
      },
    ],
  },
  gallery: {
    title: 'Οι Στιγμές μας',
    subtitle: 'Ζήστε τη μαγεία των παραστάσεων και των προπονήσεών μας',
    items: [
      {
        title: 'UV Παράσταση',
        caption: 'Μοναδικές στιγμές στη σκηνή',
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg',
      },
      {
        title: 'Ομαδική Παράσταση',
        caption: 'Συγχρονισμός και αρμονία',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6068%20%281%29-Vk2nWKd2qSVzRl2ldqmb919zO5TCf9.jpeg',
      },
      {
        title: 'Νεαρές Αθλήτριες',
        caption: 'Το μέλλον της γυμναστικής',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4E61F67B-0337-4478-8A77-8114550D1239%20%281%29-hJCE20zQfhEIr0Zo1h6Mk1Zl1U47lS.jpeg',
      },
    ],
  },
  news: {
    title: 'Νέα & Ανακοινώσεις',
    subtitle: 'Μείνετε ενημερωμένοι με τα τελευταία μας νέα',
    items: [
      {
        title: 'Επιτυχημένη Συμμετοχή στους Πανελλήνιους Αγώνες',
        summary:
          'Οι αθλήτριές μας διακρίθηκαν στους πρόσφατους αγώνες, κερδίζοντας 5 μετάλλια και κάνοντας υπερήφανο τον σύλλογο.',
        date: '15 Ιανουαρίου 2025',
        href: '/news',
        image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6064-dtKNW2y3nWi4kjmvriBpP8rrQpz5wE.jpeg',
      },
      {
        title: 'Ανοίγουν Νέα Τμήματα για τη Σεζόν 2025',
        summary:
          'Ξεκινούν οι εγγραφές για τα νέα τμήματα! Προσφέρουμε δωρεάν δοκιμαστικό μάθημα για όλους τους νέους αθλητές.',
        date: '8 Ιανουαρίου 2025',
        href: '/news',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6341-lYd2EHQV08gx6DxJdWhs3MXKIhJs8l.jpeg',
      },
      {
        title: 'Μαγική Ετήσια Παράσταση 2024',
        summary:
          'Η ετήσια παράστασή μας ήταν μια απόλυτη επιτυχία! Ευχαριστούμε όλους όσους μας τίμησαν με την παρουσία τους.',
        date: '20 Δεκεμβρίου 2024',
        href: '/news',
        image:
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6320-Pb93nEudabKTDpdQwN5hOwhW0tlBou.jpeg',
      },
    ],
  },
  sponsors: {
    title: 'Οι Υποστηρικτές μας',
    subtitle: 'Ευχαριστούμε θερμά τους υποστηρικτές μας',
    items: ['Χορηγός 1', 'Χορηγός 2', 'Χορηγός 3', 'Χορηγός 4', 'Χορηγός 5', 'Χορηγός 6'],
  },
  cta: {
    title: 'Έλα κι εσύ στην οικογένεια της Καλλιτεχνίας!',
    subtitle: 'Ξεκινήστε το ταξίδι σας στον κόσμο της γυμναστικής. Προσφέρουμε δωρεάν δοκιμαστικό μάθημα!',
    buttonLabel: 'Επικοινώνησε μαζί μας',
    buttonHref: '/contact',
  },
}

const mapParagraphs = (values: unknown): string[] => {
  if (values === undefined || values === null) {
    return defaultHomepageData.welcome.paragraphs
  }

  if (Array.isArray(values)) {
    const mapped = values
      .map((entry) => {
        const source = isRecord(entry) && 'content' in entry ? (entry as Record<string, unknown>).content : entry
        const paragraph = richTextToPlainText(source) || asString(source, '')
        return paragraph.trim()
      })
      .filter((paragraph) => paragraph.length > 0)

    return mapped.length > 0 ? mapped : defaultHomepageData.welcome.paragraphs
  }

  const source = isRecord(values) && 'content' in values ? (values as Record<string, unknown>).content : values
  const paragraph = richTextToPlainText(source) || asString(source, '')
  return paragraph.trim().length > 0 ? [paragraph] : defaultHomepageData.welcome.paragraphs
}

const mapProgramItems = (items: unknown): KalitechniaProgramItem[] => {
  const records = toRecordArray(items)
  if (records.length === 0) {
    return defaultHomepageData.programs.items
  }

  return records.map((item, index) => {
    const fallback = defaultHomepageData.programs.items[index] ?? defaultHomepageData.programs.items[0]
    return {
      title: asString(item.title, fallback.title),
      description: richTextToPlainText(item.description) || fallback.description,
      image: resolveMediaUrl(item.image ?? item.imageUrl, fallback.image),
      linkHref: asString(item.linkHref ?? item.href, fallback.linkHref),
      linkLabel: asString(item.linkLabel, fallback.linkLabel),
      anchor: asStringOrUndefined(item.anchor) ?? fallback.anchor,
    }
  })
}

const mapGalleryItems = (items: unknown): KalitechniaGalleryItem[] => {
  const records = toRecordArray(items)
  if (records.length === 0) {
    return defaultHomepageData.gallery.items
  }

  return records.map((item, index) => {
    const fallback = defaultHomepageData.gallery.items[index] ?? defaultHomepageData.gallery.items[0]
    const captionCandidate = item.caption ?? item.description
    return {
      title: asString(item.title, fallback.title),
      caption: richTextToPlainText(captionCandidate) || asString(captionCandidate, fallback.caption ?? ''),
      image: resolveMediaUrl(item.image ?? item.imageUrl, fallback.image),
    }
  })
}

const mapNewsItems = (items: unknown): KalitechniaNewsItem[] => {
  const records = toRecordArray(items)
  if (records.length === 0) {
    return defaultHomepageData.news.items
  }

  return records.map((item, index) => {
    const fallback = defaultHomepageData.news.items[index] ?? defaultHomepageData.news.items[0]
    return {
      title: asString(item.title, fallback.title),
      summary: richTextToPlainText(item.summary) || fallback.summary,
      date: asString(item.date, fallback.date),
      href: asString(item.href ?? item.link, fallback.href),
      image: resolveMediaUrl(item.image ?? item.imageUrl, fallback.image),
    }
  })
}

export function mapKalitechniaHomepage(content: unknown): KalitechniaHomepageData {
  const root = isRecord(content) ? content : {}
  const sections = isRecord(root.sections) ? root.sections : root
  const shared = isRecord(root.shared) ? root.shared : {}

  const hero = (isRecord(sections.hero) ? sections.hero : {}) as Record<string, unknown>
  const heroCta = isRecord(hero['cta']) ? (hero['cta'] as Record<string, unknown>) : undefined
  const heroCtaLabel = heroCta ? heroCta['label'] : hero['ctaLabel']
  const heroCtaHref = heroCta ? heroCta['href'] ?? heroCta['link'] : hero['ctaHref'] ?? hero['ctaLink']
  const welcome = isRecord(sections.welcome) ? sections.welcome : {}
  const programs = isRecord(sections.programs) ? sections.programs : {}
  const gallery = isRecord(sections.gallery) ? sections.gallery : {}
  const news = isRecord(sections.news) ? sections.news : {}
  const sponsors = isRecord(sections.sponsors) ? sections.sponsors : {}
  const cta = isRecord(sections.cta)
    ? sections.cta
    : isRecord(sections.ctaBanner)
      ? sections.ctaBanner
      : {}

  const sponsorItems = toRecordArray(sponsors.items).map((entry, index) =>
    asString(entry.name ?? entry.title ?? entry.label, defaultHomepageData.sponsors.items[index] ?? `Χορηγός ${index + 1}`),
  )

  return {
    headerFooterPageSlug: asString(shared.headerFooterPageSlug, defaultHomepageData.headerFooterPageSlug),
    hero: {
      headline: asString(hero.headline, defaultHomepageData.hero.headline),
      subheadline: richTextToPlainText(hero.subheadline) || defaultHomepageData.hero.subheadline,
      ctaLabel: asString(heroCtaLabel, defaultHomepageData.hero.ctaLabel),
      ctaHref: asString(heroCtaHref, defaultHomepageData.hero.ctaHref),
      backgroundImage: resolveMediaUrl(
        hero.backgroundImage ?? hero.image ?? hero.imageUrl,
        defaultHomepageData.hero.backgroundImage,
      ),
    },
    welcome: {
      title: asString(welcome.title, defaultHomepageData.welcome.title),
      paragraphs: mapParagraphs(welcome.paragraphs ?? welcome.body ?? welcome.text),
      image: resolveMediaUrl(welcome.image ?? welcome.photo ?? welcome.imageUrl, defaultHomepageData.welcome.image),
    },
    programs: {
      title: asString(programs.title, defaultHomepageData.programs.title),
      subtitle: richTextToPlainText(programs.subtitle) || defaultHomepageData.programs.subtitle,
      items: mapProgramItems(programs.items),
    },
    gallery: {
      title: asString(gallery.title, defaultHomepageData.gallery.title),
      subtitle: richTextToPlainText(gallery.subtitle) || defaultHomepageData.gallery.subtitle,
      items: mapGalleryItems(gallery.items),
    },
    news: {
      title: asString(news.title, defaultHomepageData.news.title),
      subtitle: richTextToPlainText(news.subtitle) || defaultHomepageData.news.subtitle,
      items: mapNewsItems(news.items),
    },
    sponsors: {
      title: asString(sponsors.title, defaultHomepageData.sponsors.title),
      subtitle: richTextToPlainText(sponsors.subtitle) || defaultHomepageData.sponsors.subtitle,
      items: sponsorItems.length > 0 ? sponsorItems : defaultHomepageData.sponsors.items,
    },
    cta: {
      title: asString(cta.title, defaultHomepageData.cta.title),
      subtitle: richTextToPlainText(cta.subtitle) || defaultHomepageData.cta.subtitle,
      buttonLabel: asString(
        cta.buttonLabel ?? (isRecord(cta.button) ? cta.button.label : undefined),
        defaultHomepageData.cta.buttonLabel,
      ),
      buttonHref: asString(
        cta.buttonHref ?? (isRecord(cta.button) ? cta.button.href ?? cta.button.link : undefined),
        defaultHomepageData.cta.buttonHref,
      ),
    },
  }
}

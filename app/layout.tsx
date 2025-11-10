import Navigation from "@/components/Navigation"
import { defaultHeaderData, mapHeaderContent } from "@/lib/content-mappers"
import { createClientWithTenant } from "@/lib/payload-client"
import { isRecord } from "@/lib/utils"
import type { Metadata } from "next"
import { Nunito, Poppins } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"

const nunito = Nunito({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Καλλιτεχνία – Σύλλογος Γυμναστικής',
  description: 'Καλλιτεχνία: Ρυθμική και καλλιτεχνική γυμναστική στην Κεφαλονιά.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''

  let headerData = defaultHeaderData

  try {
    const canFetchPayload = Boolean(process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL)
    if (canFetchPayload) {
      const client = createClientWithTenant(hostname)
      const headerFooterPage = await client.getPageBySlug('header-footer-kalitechnia', {
        params: { depth: 0 },
      })

      const cmsHeader = extractHeader(headerFooterPage)
      if (cmsHeader !== undefined) {
        headerData = mapHeaderContent(cmsHeader)
      }
    }
  } catch (error) {
    console.error('[Kalitechnia Layout] Failed to fetch header data:', error)
  }

  return (
    <html lang="el" className={`${nunito.variable} ${poppins.variable}`}>
      <body className="bg-background font-sans antialiased">
        <Navigation data={headerData} />
        {children}
      </body>
    </html>
  )
}

function extractHeader(page: unknown): unknown {
  if (!isRecord(page)) {
    return undefined
  }

  const content = isRecord(page.content) ? page.content : undefined
  if (content && 'header' in content) {
    return (content as Record<string, unknown>).header
  }

  const sharedLayout = isRecord(page.sharedLayout) ? page.sharedLayout : undefined
  if (sharedLayout && 'header' in sharedLayout) {
    return (sharedLayout as Record<string, unknown>).header
  }

  return undefined
}

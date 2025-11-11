import HomePageClient from "@/components/HomePageClient"
import Footer from "@/components/Footer"
import {
  defaultFooterData,
  defaultHomepageData,
  mapFooterContent,
  mapKalitechniaHomepage,
} from "@/lib/content-mappers"
import { createClientWithTenant } from "@/lib/payload-client"
import { isRecord } from "@/lib/utils"
import { headers } from "next/headers"

export default async function Page() {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''

  let homepageData = defaultHomepageData
  let footerData = defaultFooterData

  try {
    const canFetchPayload = Boolean(process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL)
    if (canFetchPayload) {
      const client = createClientWithTenant(hostname)
      const homepage = await client.getPageBySlug('kallitechnia-homepage', {
        params: {
          depth: 1,
        },
      })

      if (homepage) {
        const content = extractContent(homepage)
        homepageData = mapKalitechniaHomepage(content)

        const headerFooterSlug = homepageData.headerFooterPageSlug || 'header-footer-kallitechnia'
        const headerFooterPage = await client.getPageBySlug(headerFooterSlug, {
          params: {
            depth: 0,
          },
        })

        const footerContent = extractFooter(headerFooterPage)
        if (footerContent !== undefined) {
          footerData = mapFooterContent(footerContent)
        }
      }
    }
  } catch (error) {
    console.error('[Kallitechnia Home] Failed to load content from Payload:', error)
  }

  return (
    <main>
      <HomePageClient data={homepageData} />
      <Footer data={footerData} />
    </main>
  )
}

function extractContent(page: unknown): unknown {
  if (!isRecord(page)) {
    return undefined
  }
  return page.content
}

function extractFooter(page: unknown): unknown {
  if (!isRecord(page)) {
    return undefined
  }

  const content = isRecord(page.content) ? page.content : undefined
  if (content && 'footer' in content) {
    return (content as Record<string, unknown>).footer
  }

  const sharedLayout = isRecord(page.sharedLayout) ? page.sharedLayout : undefined
  if (sharedLayout && 'footer' in sharedLayout) {
    return (sharedLayout as Record<string, unknown>).footer
  }

  return undefined
}

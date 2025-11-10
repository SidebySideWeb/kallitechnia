import { mapFooterContent, defaultFooterData, type FooterData } from '@/lib/content-mappers'
import type { PayloadResponse } from '@/lib/payload-client'
import { createClientWithTenant, PayloadApiClient } from '@/lib/payload-client'
import { isRecord } from '@/lib/utils'

type FetchParams = Record<string, string | number | boolean | undefined>

const isValidUrl = (value: string | null | undefined): boolean => {
  if (typeof value !== 'string' || value.length === 0) {
    return false
  }

  try {
    new URL(value)
    return true
  } catch {
    console.warn('[Kalitechnia] Ignoring invalid Payload URL:', value)
    return false
  }
}

export const hasPayloadBaseUrl = (): boolean => {
  const baseUrl = process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL
  return isValidUrl(baseUrl)
}

export async function createKalitechniaClient(hostname?: string): Promise<PayloadApiClient> {
  return createClientWithTenant(hostname)
}

export async function fetchFooterData(client: PayloadApiClient): Promise<FooterData> {
  if (!hasPayloadBaseUrl()) {
    return defaultFooterData
  }

  try {
    const footerPage = await client.getPageBySlug('header-footer-kalitechnia', {
      params: { depth: 0 },
    })

    if (!footerPage) {
      return defaultFooterData
    }

    const footer = extractFooter(footerPage)
    return mapFooterContent(footer)
  } catch (error) {
    console.error('[Kalitechnia] Failed to fetch footer data:', error)
    return defaultFooterData
  }
}

export async function fetchPageContent(client: PayloadApiClient, slug: string, depth = 2) {
  if (!hasPayloadBaseUrl()) {
    return null
  }

  const page = await client.getPageBySlug(slug, {
    params: { depth },
  })
  return page ?? null
}

export async function fetchPosts(client: PayloadApiClient, params: FetchParams = {}) {
  if (!hasPayloadBaseUrl()) {
    return { docs: [] } satisfies PayloadResponse
  }

  const sanitizedParams = Object.entries(params).reduce<Record<string, string | number | boolean>>((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {})

  const response = await client.getPosts({
    params: sanitizedParams,
  })
  return response ?? ({ docs: [] } satisfies PayloadResponse)
}

export async function fetchPostBySlug(client: PayloadApiClient, slug: string) {
  if (!hasPayloadBaseUrl()) {
    return null
  }

  const post = await client.getPostBySlug(slug, {
    params: { depth: 2 },
  })
  return post ?? null
}

export function extractSections(page: unknown): unknown {
  if (!isRecord(page)) {
    return {}
  }

  if (isRecord(page.content) && isRecord(page.content.sections)) {
    return page.content
  }

  if (isRecord(page.sections)) {
    return page
  }

  return {}
}

function extractFooter(page: unknown): unknown {
  if (!isRecord(page)) {
    return undefined
  }

  if (isRecord(page.footer)) {
    return page.footer
  }

  const content = isRecord(page.content) ? page.content : undefined
  if (content && isRecord(content.footer)) {
    return content.footer
  }

  const sharedLayout = isRecord(page.sharedLayout) ? page.sharedLayout : undefined
  if (sharedLayout && isRecord(sharedLayout.footer)) {
    return sharedLayout.footer
  }

  return undefined
}


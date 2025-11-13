/**
 * Server-side content fetching utilities
 * Uses clean API client (no Payload dependencies)
 */

import { getApiClient } from '@/lib/api-client'
import { mapFooterContent, defaultFooterData, type FooterData } from '@/lib/content-mappers'
import { isRecord } from '@/lib/utils'

export async function fetchFooterData(): Promise<FooterData> {
  const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL
  if (!apiUrl) {
    return defaultFooterData
  }

  try {
    const client = getApiClient()
    const footerPage = await client.getPage('header-footer-kallitechnia', 0)

    if (!footerPage) {
      return defaultFooterData
    }

    const footer = extractFooter(footerPage)
    return mapFooterContent(footer)
  } catch (error) {
    console.error('[Server] Failed to fetch footer data:', error)
    return defaultFooterData
  }
}

export async function fetchPageContent(slug: string, depth = 2) {
  const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL
  if (!apiUrl) {
    return null
  }

  try {
    const client = getApiClient()
    return await client.getPage(slug, depth)
  } catch (error) {
    console.error('[Server] Failed to fetch page content:', { slug, error })
    return null
  }
}

export async function fetchPosts(options: { limit?: number; depth?: number } = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL
  if (!apiUrl) {
    return []
  }

  try {
    const client = getApiClient()
    return await client.getPosts(options)
  } catch (error) {
    console.error('[Server] Failed to fetch posts:', error)
    return []
  }
}

export async function fetchPostBySlug(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL
  if (!apiUrl) {
    return null
  }

  try {
    const client = getApiClient()
    return await client.getPostBySlug(slug, 2)
  } catch (error) {
    console.error('[Server] Failed to fetch post:', { slug, error })
    return null
  }
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
/**
 * API utilities for fetching data from Payload CMS
 */

// Remove trailing slash from URL to avoid double slashes
const PAYLOAD_URL = (process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://cms.ftiaxesite.gr').replace(/\/$/, '')
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || 'kalitechnia'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  featuredImage?: {
    url?: string
    alt?: string
  } | string
}

export interface PostsResponse {
  docs: Post[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface Page {
  id: string
  title: string
  slug: string
  headline?: string
  blocks?: any[]
  featuredImage?: {
    url?: string
    alt?: string
  } | string
}

export interface Header {
  id: string
  logo?: {
    url?: string
    alt?: string
  } | string
  logoText?: string
  menu?: Array<{
    label: string
    link: string
  }>
  cta?: {
    label: string
    link: string
  }
}

export interface Footer {
  id: string
  brand?: {
    name?: string
    tagline?: string
  }
  contact?: {
    title?: string
    email?: string
    phone?: string
  }
  links?: {
    title?: string
    items?: Array<{
      label: string
      href: string
    }>
  }
  copyright?: string
}

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * Build Payload CMS query string
 * Payload CMS uses bracket notation which should NOT be URL encoded
 */
function buildQueryString(params: Record<string, string | number>): string {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
}

/**
 * Fetch latest posts from CMS
 */
export async function fetchLatestPosts(limit: number = 3): Promise<Post[]> {
  try {
    // First, get the tenant ID by code (Tenants collection uses 'code' field, not 'slug')
    // Payload CMS uses bracket notation: where[code][equals]=value
    // The brackets should NOT be encoded, only the values should be encoded
    const tenantQuery = buildQueryString({
      'where[code][equals]': TENANT_SLUG,
      limit: 1,
    })
    
    const tenantResponse = await fetch(
      `${PAYLOAD_URL}/api/tenants?${tenantQuery}`,
      {
        cache: 'no-store', // Always fetch fresh data
      }
    )

    if (!tenantResponse.ok) {
      console.error('Failed to fetch tenant:', tenantResponse.status, tenantResponse.statusText)
      const errorText = await tenantResponse.text().catch(() => '')
      console.error('Error details:', errorText)
      return []
    }

    const tenantData = await tenantResponse.json()
    if (!tenantData.docs || tenantData.docs.length === 0) {
      console.error('Tenant not found:', TENANT_SLUG)
      return []
    }

    const tenantId = tenantData.docs[0].id

    // Fetch posts for this tenant
    const postsQuery = buildQueryString({
      'where[tenant][equals]': tenantId,
      limit: limit,
      sort: '-publishedAt',
      depth: 1,
    })
    
    const postsResponse = await fetch(
      `${PAYLOAD_URL}/api/posts?${postsQuery}`,
      {
        cache: 'no-store', // Always fetch fresh data
      }
    )

    if (!postsResponse.ok) {
      console.error('Failed to fetch posts:', postsResponse.status, postsResponse.statusText)
      const errorText = await postsResponse.text().catch(() => '')
      console.error('Error details:', errorText)
      return []
    }

    const postsData: PostsResponse = await postsResponse.json()
    return postsData.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * Get tenant ID by code
 */
async function getTenantId(): Promise<string | null> {
  try {
    const tenantQuery = buildQueryString({
      'where[code][equals]': TENANT_SLUG,
      limit: 1,
    })
    
    const response = await fetch(
      `${PAYLOAD_URL}/api/tenants?${tenantQuery}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('[API] Failed to fetch tenant:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    if (!data.docs || data.docs.length === 0) {
      console.error('[API] Tenant not found:', TENANT_SLUG)
      return null
    }

    return String(data.docs[0].id)
  } catch (error) {
    console.error('[API] Error fetching tenant:', error)
    return null
  }
}

/**
 * Fetch homepage (slug = "homepage")
 */
export async function fetchHomepage(): Promise<Page | null> {
  return fetchPage('homepage')
}

/**
 * Fetch a page by slug
 */
export async function fetchPage(slug: string): Promise<Page | null> {
  try {
    const tenantId = await getTenantId()
    if (!tenantId) {
      console.error('[API] Cannot fetch page: tenant not found')
      return null
    }

    const query = buildQueryString({
      'where[slug][equals]': slug,
      'where[tenant][equals]': tenantId,
      limit: 1,
      depth: 2,
    })

    const response = await fetch(
      `${PAYLOAD_URL}/api/pages?${query}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('[API] Failed to fetch page:', response.status, response.statusText)
      return null
    }

    const data: PayloadResponse<Page> = await response.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('[API] Error fetching page:', error)
    return null
  }
}

/**
 * Fetch header for the tenant
 */
export async function fetchHeader(): Promise<Header | null> {
  try {
    const tenantId = await getTenantId()
    if (!tenantId) {
      console.error('[API] Cannot fetch header: tenant not found')
      return null
    }

    const query = buildQueryString({
      'where[tenant][equals]': tenantId,
      limit: 1,
      depth: 2,
    })

    const response = await fetch(
      `${PAYLOAD_URL}/api/headers?${query}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('[API] Failed to fetch header:', response.status, response.statusText)
      return null
    }

    const data: PayloadResponse<Header> = await response.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('[API] Error fetching header:', error)
    return null
  }
}

/**
 * Fetch footer for the tenant
 */
export async function fetchFooter(): Promise<Footer | null> {
  try {
    const tenantId = await getTenantId()
    if (!tenantId) {
      console.error('[API] Cannot fetch footer: tenant not found')
      return null
    }

    const query = buildQueryString({
      'where[tenant][equals]': tenantId,
      limit: 1,
      depth: 2,
    })

    const response = await fetch(
      `${PAYLOAD_URL}/api/footers?${query}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('[API] Failed to fetch footer:', response.status, response.statusText)
      return null
    }

    const data: PayloadResponse<Footer> = await response.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('[API] Error fetching footer:', error)
    return null
  }
}

/**
 * Get the image URL from a media field (handles Payload CMS Media objects)
 * Supports: string URL, Media object with url property, or Media ID (number)
 */
export function getImageUrl(media: any): string | null {
  if (!media) return null
  
  // If it's already a string URL, return it
  if (typeof media === 'string') {
    return media
  }
  
  // If it's a number (Media ID), we can't resolve it without another API call
  // This shouldn't happen if depth=2 is used, but handle it gracefully
  if (typeof media === 'number') {
    console.warn('[getImageUrl] Received Media ID instead of populated Media object. Ensure depth=2 in API calls.')
    return null
  }
  
  // If it's an object, try to get the URL
  if (typeof media === 'object') {
    // Payload CMS Media object structure: { url: string, alt?: string, ... }
    if (media.url) {
      return media.url
    }
    
    // Sometimes Payload returns nested structures
    if (media.filename) {
      // Payload might return filename, construct URL if needed
      // This depends on your Payload config, but usually url is available
      console.warn('[getImageUrl] Media object has filename but no url:', media)
    }
  }
  
  return null
}


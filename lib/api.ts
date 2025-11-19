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
 * Get the image URL from a featured image field
 */
export function getImageUrl(featuredImage: Post['featuredImage']): string | null {
  if (!featuredImage) return null
  
  if (typeof featuredImage === 'string') {
    return featuredImage
  }
  
  if (typeof featuredImage === 'object' && featuredImage.url) {
    return featuredImage.url
  }
  
  return null
}


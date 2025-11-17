/**
 * API utilities for fetching data from Payload CMS
 */

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
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
 * Fetch latest posts from CMS
 */
export async function fetchLatestPosts(limit: number = 3): Promise<Post[]> {
  try {
    // First, get the tenant ID by slug
    const tenantResponse = await fetch(
      `${PAYLOAD_URL}/api/tenants?where[slug][equals]=${TENANT_SLUG}&limit=1`,
      {
        cache: 'no-store', // Always fetch fresh data
      }
    )

    if (!tenantResponse.ok) {
      console.error('Failed to fetch tenant:', tenantResponse.statusText)
      return []
    }

    const tenantData = await tenantResponse.json()
    if (!tenantData.docs || tenantData.docs.length === 0) {
      console.error('Tenant not found:', TENANT_SLUG)
      return []
    }

    const tenantId = tenantData.docs[0].id

    // Fetch posts for this tenant
    const postsResponse = await fetch(
      `${PAYLOAD_URL}/api/posts?where[tenant][equals]=${tenantId}&limit=${limit}&sort=-publishedAt&depth=1`,
      {
        cache: 'no-store', // Always fetch fresh data
      }
    )

    if (!postsResponse.ok) {
      console.error('Failed to fetch posts:', postsResponse.statusText)
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


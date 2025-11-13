/**
 * API Client utilities for Next.js frontend integration
 *
 * This file provides helper functions to fetch content from the Payload CMS
 * for use in client Next.js websites.
 */

export interface ApiClientOptions {
  baseUrl: string
  tenantSlug?: string
  tenantDomain?: string
  locale?: string
  headers?: HeadersInit
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

export interface PayloadResponse<T = unknown> {
  docs: T[]
  totalDocs?: number
  limit?: number
  totalPages?: number
  page?: number
  pagingCounter?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: number | null
  nextPage?: number | null
}

export class PayloadApiClient {
  private baseUrl: string
  private tenantSlug?: string
  private tenantDomain?: string
  private locale?: string
  private defaultHeaders: HeadersInit

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '')
    this.tenantSlug = options.tenantSlug
    this.tenantDomain = options.tenantDomain
    this.locale = options.locale
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}/api${endpoint}`)

    if (this.locale) {
      url.searchParams.append('locale', this.locale)
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    return url.toString()
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options
    const url = this.buildUrl(endpoint, params)

    const headers = new Headers(this.defaultHeaders)

    if (this.tenantSlug) {
      headers.set('X-Tenant-Slug', this.tenantSlug)
    }
    if (this.tenantDomain) {
      headers.set('X-Tenant-Domain', this.tenantDomain)
    }

    if (fetchOptions.headers) {
      const customHeaders = new Headers(fetchOptions.headers)
      customHeaders.forEach((value, key) => {
        headers.set(key, value)
      })
    }

    // Log every API request in production to debug
    console.error('[Payload API Request]', {
      url,
      method: fetchOptions.method || 'GET',
      tenantSlug: this.tenantSlug,
      tenantDomain: this.tenantDomain,
      headers: Object.fromEntries(headers.entries()),
      params,
    })

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        cache: 'no-store',
        next: { revalidate: 0 },
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `API request failed: ${response.statusText}`
        try {
          const error = JSON.parse(errorText)
          errorMessage = error.message || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }

        console.error('[Payload API Error]', {
          url,
          status: response.status,
          statusText: response.statusText,
          tenantSlug: this.tenantSlug,
          tenantDomain: this.tenantDomain,
          error: errorMessage,
        })

        throw new Error(errorMessage)
      }

      const json = (await response.json()) as T

      // Log API response in production to debug
      console.error('[Payload API Response]', {
        url,
        status: response.status,
        tenantSlug: this.tenantSlug,
        hasDocs: Array.isArray((json as any).docs),
        docCount: Array.isArray((json as any).docs) ? (json as any).docs.length : 0,
        firstDocSlug: Array.isArray((json as any).docs) && (json as any).docs.length > 0
          ? (json as any).docs[0]?.slug
          : null,
        firstDocTenant: Array.isArray((json as any).docs) && (json as any).docs.length > 0
          ? (json as any).docs[0]?.tenant
          : null,
      })

      return json
    } catch (error) {
      if (error instanceof Error) {
        console.error('[Payload API Request Failed]', {
          url,
          tenantSlug: this.tenantSlug,
          tenantDomain: this.tenantDomain,
          error: error.message,
        })
      }
      throw error
    }
  }

  async getPage<T = unknown>(slug: string, options: FetchOptions = {}): Promise<PayloadResponse<T>> {
    // Get tenant slug - use fallback if not set
    const tenantSlug = this.tenantSlug || process.env.NEXT_PUBLIC_TENANT_SLUG || 'kallitechnia'

    // Fetch tenant to get tenant ID, then include it explicitly in where clause
    // This ensures tenant filtering works even if access control doesn't merge where clauses
    let tenantId: number | string | undefined
    try {
      const tenantResponse = await this.getTenant({ params: { limit: 1, depth: 0 } })
      const tenant = Array.isArray(tenantResponse) ? tenantResponse[0] : (tenantResponse as any)?.docs?.[0]
      if (tenant?.id) {
        tenantId = tenant.id
      }
    } catch (error) {
      console.error('[Payload Client] Failed to fetch tenant:', error)
      // Continue without tenant ID - access control should still filter
    }

    // Include tenant ID explicitly in where clause if we have it
    const where: Record<string, unknown> = {
      slug: { equals: slug },
    }
    
    if (tenantId !== undefined) {
      where.tenant = { equals: tenantId }
    }

    // Always log in production to debug tenant scoping
    console.error('[Payload Client] getPage query:', {
      slug,
      tenantSlug,
      tenantId,
      where,
      whereString: JSON.stringify(where),
      note: tenantId ? 'Tenant filtering via explicit tenant ID in where clause' : 'Tenant filtering via X-Tenant-Slug header + access control',
    })

    const params = {
      ...options.params,
      where: JSON.stringify(where),
      limit: 1,
      depth: options.params?.depth ?? 2,
    }

    // Log the exact params being sent
    console.error('[Payload Client] getPage params:', params)

    return this.request<PayloadResponse<T>>('/pages', {
      ...options,
      params,
    })
  }

  async getPageBySlug<T = unknown>(slug: string, options: FetchOptions = {}): Promise<T | null> {
    const result = await this.getPage<T>(slug, options)
    return result.docs?.[0] ?? null
  }

  async getPages<T = unknown>(options: FetchOptions = {}): Promise<PayloadResponse<T>> {
    return this.request<PayloadResponse<T>>('/pages', {
      ...options,
      params: {
        ...options.params,
        depth: options.params?.depth ?? 2,
      },
    })
  }

  async getMedia(id: string | number, options: FetchOptions = {}) {
    return this.request<Record<string, unknown>>(`/media/${id}`, {
      ...options,
      params: {
        ...options.params,
        depth: 1,
      },
    })
  }

  async getMediaFiles(options: FetchOptions = {}) {
    // Only send empty where clause - access control filters by tenant ID based on X-Tenant-Slug header
    // Payload doesn't support tenant.slug in where clauses
    return this.request<PayloadResponse<Record<string, unknown>>>('/media', {
      ...options,
      params: {
        ...options.params,
        where: JSON.stringify({}), // Empty where - tenant filtering handled by access control
        depth: 1,
      },
    })
  }

  async getPosts<T = unknown>(options: FetchOptions = {}): Promise<PayloadResponse<T>> {
    return this.request<PayloadResponse<T>>('/posts', {
      ...options,
      params: {
        ...options.params,
        depth: options.params?.depth ?? 1,
      },
    })
  }

  async getPostBySlug<T = unknown>(slug: string, options: FetchOptions = {}): Promise<T | null> {
    const where: Record<string, unknown> = {
      slug: { equals: slug },
    }

    const response = await this.request<PayloadResponse<T>>('/posts', {
      ...options,
      params: {
        ...options.params,
        where: JSON.stringify(where),
        limit: 1,
        depth: options.params?.depth ?? 2,
      },
    })

    return response.docs?.[0] ?? null
  }

  async getTenant(options: FetchOptions = {}) {
    const where: Record<string, unknown> = {}

    if (this.tenantSlug) {
      where.slug = { equals: this.tenantSlug }
    } else if (this.tenantDomain) {
      where.domain = { equals: this.tenantDomain }
    }

    return this.request('/tenants', {
      ...options,
      params: {
        ...options.params,
        where: JSON.stringify(where),
        limit: 1,
        depth: 1,
      },
    })
  }

  async get<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T = unknown>(endpoint: string, data?: unknown, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

export function createPayloadClient(options: ApiClientOptions): PayloadApiClient {
  return new PayloadApiClient(options)
}

export function getAbsoluteMediaUrl(url: string | undefined | null): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('/')) {
    const baseUrl = getBaseUrl()
    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_PAYLOAD_URL not set, cannot convert relative media URL:', url)
      return url
    }
    return `${baseUrl}${url}`
  }
  return url
}

function resolveBaseUrl(): string {
  const envBase =
    (process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || '').replace(/\/$/, '')
  if (envBase) {
    return envBase
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[Payload Client] NEXT_PUBLIC_PAYLOAD_URL is not set. CMS requests will fail in production.',
    )
  }

  return ''
}

export function createClientWithTenant(locale?: string): PayloadApiClient {
  const baseUrl = resolveBaseUrl()

  if (!baseUrl) {
    console.warn('[Payload Client] NEXT_PUBLIC_PAYLOAD_URL is not set. CMS requests will fail.')
  }

  const configuredTenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG
  if (!configuredTenantSlug) {
    console.warn(
      '[Payload Client] NEXT_PUBLIC_TENANT_SLUG is not set. Falling back to "kallitechnia" which may not match production data.',
    )
  }
  const envTenantSlug = configuredTenantSlug || 'kallitechnia'

  // Always log in production to debug configuration
  console.warn('[Payload Client] createClientWithTenant:', {
    baseUrl,
    tenantSlug: envTenantSlug,
    envTenantSlug: configuredTenantSlug,
    locale,
  })

  const client = createPayloadClient({
    baseUrl,
    tenantSlug: envTenantSlug,
    locale,
  })

  return client
}

export function getBaseUrl(): string {
  return resolveBaseUrl()
}

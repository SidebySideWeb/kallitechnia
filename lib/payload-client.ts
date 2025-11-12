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
    const where: Record<string, unknown> = {
      slug: { equals: slug },
    }

    if (this.tenantSlug) {
      where['tenant.slug'] = { equals: this.tenantSlug }
    } else if (this.tenantDomain) {
      where['tenant.domain'] = { equals: this.tenantDomain }
    }

    return this.request<PayloadResponse<T>>('/pages', {
      ...options,
      params: {
        ...options.params,
        where: JSON.stringify(where),
        limit: 1,
        depth: options.params?.depth ?? 2,
      },
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
    return this.request<PayloadResponse<Record<string, unknown>>>('/media', {
      ...options,
      params: {
        ...options.params,
        where: JSON.stringify({
          ...(this.tenantSlug && {
            'tenant.slug': { equals: this.tenantSlug },
          }),
          ...(this.tenantDomain && {
            'tenant.domain': { equals: this.tenantDomain },
          }),
        }),
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

  const envTenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || undefined

  if (!envTenantSlug) {
    console.warn('[Payload Client] NEXT_PUBLIC_TENANT_SLUG is not set. Tenant-scoped requests may fail.')
  }

  const client = createPayloadClient({
    baseUrl,
    tenantSlug: envTenantSlug,
    locale,
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('[Payload Client]', {
      baseUrl,
      tenantSlug: envTenantSlug,
    })
  }

  return client
}

export function getBaseUrl(): string {
  return resolveBaseUrl()
}

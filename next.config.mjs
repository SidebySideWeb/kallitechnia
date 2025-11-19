import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Explicitly disable Turbopack to force webpack usage
  experimental: {
    turbo: false,
  },
  webpack: (config, { isServer, webpack }) => {
    const projectRoot = path.resolve(__dirname)
    
    // Next.js automatically reads tsconfig.json paths, but we need to ensure
    // webpack respects them. The key is to NOT override existing aliases that
    // Next.js has already set up from tsconfig.json
    
    // Ensure resolve object exists
    config.resolve = config.resolve || {}
    
    // Only add @ alias if it doesn't exist (Next.js might have already set it)
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }
    
    // Set @ alias to project root - this is the base for all @/* imports
    // Next.js should handle @/components/* automatically via tsconfig.json paths
    if (!config.resolve.alias['@']) {
      config.resolve.alias['@'] = projectRoot
    }
    
    // Ensure modules array includes project root for fallback resolution
    if (!Array.isArray(config.resolve.modules)) {
      config.resolve.modules = []
    }
    
    // Add project root to modules if not already present
    const hasProjectRoot = config.resolve.modules.some((m) => {
      if (typeof m === 'string') {
        try {
          return path.resolve(m) === projectRoot
        } catch {
          return false
        }
      }
      return false
    })
    
    if (!hasProjectRoot) {
      config.resolve.modules = [
        projectRoot,
        ...config.resolve.modules,
        'node_modules',
      ]
    }
    
    // Ensure extensions include TypeScript/JavaScript
    if (!Array.isArray(config.resolve.extensions)) {
      config.resolve.extensions = []
    }
    
    const requiredExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const missingExtensions = requiredExtensions.filter(
      (ext) => !config.resolve.extensions.includes(ext)
    )
    
    if (missingExtensions.length > 0) {
      config.resolve.extensions = [
        ...missingExtensions,
        ...config.resolve.extensions,
      ]
    }
    
    // Debug logging to see what Next.js has already configured
    console.log('[Webpack] Project Root:', projectRoot)
    console.log('[Webpack] Existing aliases:', Object.keys(config.resolve.alias || {}))
    console.log('[Webpack] Alias @:', config.resolve.alias['@'])
    console.log('[Webpack] Modules:', config.resolve.modules.slice(0, 3))
    
    return config
  },
}

export default nextConfig


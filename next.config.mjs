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
  webpack: (config, { isServer, webpack }) => {
    // Explicitly resolve path aliases for Vercel compatibility
    const projectRoot = path.resolve(__dirname)
    
    // Ensure resolve object exists
    config.resolve = config.resolve || {}
    
    // CRITICAL: Override @ alias with absolute path - this must come first
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': projectRoot,
    }
    
    // Ensure modules array exists and project root is first
    config.resolve.modules = config.resolve.modules || []
    
    // Remove any existing projectRoot to avoid duplicates
    const modulesWithoutRoot = config.resolve.modules.filter((m) => {
      if (typeof m === 'string') {
        return path.resolve(m) !== projectRoot
      }
      return true
    })
    
    // Put project root FIRST in modules array
    config.resolve.modules = [
      projectRoot,
      ...modulesWithoutRoot,
      'node_modules',
    ]
    
    // Ensure extensions include TypeScript
    config.resolve.extensions = config.resolve.extensions || []
    const requiredExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const existingExtensions = config.resolve.extensions.filter(
      (ext) => !requiredExtensions.includes(ext)
    )
    config.resolve.extensions = [
      ...requiredExtensions,
      ...existingExtensions,
    ]
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Webpack Config] Project Root:', projectRoot)
      console.log('[Webpack Config] Alias @:', config.resolve.alias['@'])
      console.log('[Webpack Config] Modules:', config.resolve.modules)
    }
    
    return config
  },
}

export default nextConfig


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
    
    // CRITICAL: Force webpack to use our resolve configuration
    // Override any existing resolve config
    config.resolve = config.resolve || {}
    
    // Set alias - MUST be absolute path, override completely
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': projectRoot,
      '@/components': path.join(projectRoot, 'components'),
      '@/lib': path.join(projectRoot, 'lib'),
      '@/app': path.join(projectRoot, 'app'),
    }
    
    // Force modules resolution - project root MUST be first
    const existingModules = Array.isArray(config.resolve.modules) 
      ? config.resolve.modules 
      : []
    
    // Filter out projectRoot if it exists
    const filteredModules = existingModules.filter((m) => {
      if (typeof m === 'string') {
        try {
          return path.resolve(m) !== projectRoot
        } catch {
          return true
        }
      }
      return true
    })
    
    // Set modules with project root first
    config.resolve.modules = [
      projectRoot,
      ...filteredModules,
      'node_modules',
    ]
    
    // Ensure extensions are set correctly
    const defaultExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const existingExtensions = Array.isArray(config.resolve.extensions)
      ? config.resolve.extensions
      : []
    
    const uniqueExtensions = [
      ...defaultExtensions,
      ...existingExtensions.filter((ext) => !defaultExtensions.includes(ext)),
    ]
    
    config.resolve.extensions = uniqueExtensions
    
    // Force symlinks to be resolved
    config.resolve.symlinks = false
    
    // Log for debugging (works in Vercel build logs)
    console.log('[Webpack] Project Root:', projectRoot)
    console.log('[Webpack] Alias @:', config.resolve.alias['@'])
    console.log('[Webpack] Components alias:', config.resolve.alias['@/components'])
    
    return config
  },
}

export default nextConfig


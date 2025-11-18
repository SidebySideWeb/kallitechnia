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
  webpack: (config, { isServer }) => {
    // Explicitly resolve path aliases for Vercel compatibility
    const projectRoot = path.resolve(__dirname)
    
    // Ensure resolve object exists
    if (!config.resolve) {
      config.resolve = {}
    }
    
    // Set alias - must be absolute path, override any existing @ alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': projectRoot,
    }
    
    // Ensure modules are resolved from project root first
    if (!config.resolve.modules) {
      config.resolve.modules = []
    }
    
    // Remove projectRoot if already in modules to avoid duplicates
    const filteredModules = config.resolve.modules.filter((m) => m !== projectRoot)
    config.resolve.modules = [
      projectRoot,
      ...filteredModules,
      'node_modules',
    ]
    
    // Ensure extensions are resolved (TypeScript first)
    if (!config.resolve.extensions) {
      config.resolve.extensions = []
    }
    
    const defaultExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const existingExtensions = config.resolve.extensions.filter(
      (ext) => !defaultExtensions.includes(ext)
    )
    config.resolve.extensions = [
      ...defaultExtensions,
      ...existingExtensions,
    ]
    
    return config
  },
}

export default nextConfig


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
    config.resolve = config.resolve || {}
    
    // Set alias - must be absolute path
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': projectRoot,
    }
    
    // Ensure modules are resolved from project root first
    const existingModules = config.resolve.modules || []
    config.resolve.modules = [
      projectRoot,
      ...existingModules.filter((m) => m !== projectRoot),
      'node_modules',
    ]
    
    // Ensure extensions are resolved
    const existingExtensions = config.resolve.extensions || []
    const defaultExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    config.resolve.extensions = [
      ...defaultExtensions,
      ...existingExtensions.filter((ext) => !defaultExtensions.includes(ext)),
    ]
    
    return config
  },
}

export default nextConfig


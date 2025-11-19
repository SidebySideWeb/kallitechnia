import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

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
    const projectRoot = path.resolve(__dirname)
    
    // Read tsconfig.json to get path mappings
    const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
    let tsconfigPaths = {}
    
    try {
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8')
      const tsconfig = JSON.parse(tsconfigContent)
      tsconfigPaths = tsconfig.compilerOptions?.paths || {}
    } catch (error) {
      console.warn('[Webpack] Could not read tsconfig.json:', error.message)
    }
    
    // Ensure resolve object exists
    config.resolve = config.resolve || {}
    
    // CRITICAL: Create a fresh alias object to avoid conflicts
    // Merge existing aliases but ensure ours take precedence
    const existingAliases = config.resolve.alias || {}
    config.resolve.alias = {
      ...existingAliases,
      // Set base @ alias to project root
      '@': projectRoot,
      // Explicitly set nested aliases - webpack needs these for @/components/navigation
      '@/components': path.join(projectRoot, 'components'),
      '@/lib': path.join(projectRoot, 'lib'),
      '@/app': path.join(projectRoot, 'app'),
    }
    
    // Ensure modules array includes project root
    if (!Array.isArray(config.resolve.modules)) {
      config.resolve.modules = []
    }
    
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
    
    // Ensure extensions
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
    
    // Debug logging
    console.log('[Webpack] Project Root:', projectRoot)
    console.log('[Webpack] Aliases:', Object.keys(config.resolve.alias).filter(k => k.startsWith('@')))
    console.log('[Webpack] @/components alias:', config.resolve.alias['@/components'])
    console.log('[Webpack] @ alias:', config.resolve.alias['@'])
    
    return config
  },
}

export default nextConfig


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
    
    // Ensure resolve object exists
    config.resolve = config.resolve || {}
    
    // CRITICAL: Set alias with absolute path - this is what works in ftiaxesite
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': projectRoot,
    }
    
    // Ensure modules array includes project root FIRST
    // This is critical - webpack resolves @/components/navigation by:
    // 1. Matching @ to projectRoot
    // 2. Looking for components/navigation in the modules array
    // 3. Since projectRoot is first, it finds components/navigation.tsx there
    if (!Array.isArray(config.resolve.modules)) {
      config.resolve.modules = []
    }
    
    // Remove projectRoot if it exists, then add it FIRST
    const filteredModules = config.resolve.modules.filter((m) => {
      if (typeof m === 'string') {
        try {
          return path.resolve(m) !== projectRoot
        } catch {
          return true
        }
      }
      return true
    })
    
    config.resolve.modules = [
      projectRoot,
      ...filteredModules,
      'node_modules',
    ]
    
    // Ensure extensions are set correctly
    if (!Array.isArray(config.resolve.extensions)) {
      config.resolve.extensions = []
    }
    
    const requiredExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    const existingExtensions = config.resolve.extensions.filter(
      (ext) => !requiredExtensions.includes(ext)
    )
    
    config.resolve.extensions = [
      ...requiredExtensions,
      ...existingExtensions,
    ]
    
    // CRITICAL: Ensure mainFields includes the right fields
    // This helps webpack resolve modules correctly
    if (!config.resolve.mainFields) {
      config.resolve.mainFields = ['main', 'module']
    }
    
    // Debug logging
    console.log('[Webpack] Project Root:', projectRoot)
    console.log('[Webpack] @ alias:', config.resolve.alias['@'])
    console.log('[Webpack] Modules (first 3):', config.resolve.modules.slice(0, 3))
    console.log('[Webpack] Extensions:', config.resolve.extensions.slice(0, 5))
    
    // Verify components directory exists
    const componentsPath = path.join(projectRoot, 'components', 'navigation.tsx')
    console.log('[Webpack] Components path exists:', fs.existsSync(componentsPath))
    console.log('[Webpack] Components path:', componentsPath)
    
    return config
  },
}

export default nextConfig


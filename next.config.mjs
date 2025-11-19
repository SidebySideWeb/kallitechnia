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
  // Explicitly disable Turbopack to force webpack usage
  experimental: {
    turbo: false,
  },
  webpack: (config, { isServer, webpack }) => {
    const projectRoot = path.resolve(__dirname)
    
    // CRITICAL: Ensure resolve object exists
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    
    // Set aliases with absolute paths - these MUST be set
    config.resolve.alias['@'] = projectRoot
    config.resolve.alias['@/components'] = path.join(projectRoot, 'components')
    config.resolve.alias['@/lib'] = path.join(projectRoot, 'lib')
    config.resolve.alias['@/app'] = path.join(projectRoot, 'app')
    
    // Force modules array
    if (!Array.isArray(config.resolve.modules)) {
      config.resolve.modules = []
    }
    
    // Ensure project root is first in modules
    const existingModules = config.resolve.modules.filter((m) => {
      if (typeof m === 'string') {
        try {
          const resolved = path.resolve(m)
          return resolved !== projectRoot && resolved !== path.resolve(projectRoot)
        } catch {
          return true
        }
      }
      return true
    })
    
    config.resolve.modules = [
      projectRoot,
      ...existingModules,
      'node_modules',
    ]
    
    // Ensure extensions
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
    
    // Disable symlinks
    config.resolve.symlinks = false
    
    // Add a custom resolver plugin to force resolution
    config.plugins = config.plugins || []
    
    // Use NormalModuleReplacementPlugin to intercept and fix imports
    const componentAliases = {
      '@/components/navigation': path.join(projectRoot, 'components', 'navigation.tsx'),
      '@/components/footer': path.join(projectRoot, 'components', 'footer.tsx'),
    }
    
    Object.entries(componentAliases).forEach(([alias, realPath]) => {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          new RegExp(`^${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`),
          realPath
        )
      )
    })
    
    // Debug logging
    console.log('[Webpack] Project Root:', projectRoot)
    console.log('[Webpack] Alias @:', config.resolve.alias['@'])
    console.log('[Webpack] Alias @/components:', config.resolve.alias['@/components'])
    console.log('[Webpack] Components path exists:', fs.existsSync(path.join(projectRoot, 'components', 'navigation.tsx')))
    
    return config
  },
}

export default nextConfig


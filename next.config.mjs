import path from 'path'
import { fileURLToPath } from 'url'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

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
    
    // Ensure resolve object exists
    config.resolve = config.resolve || {}
    
    // Use tsconfig-paths-webpack-plugin to automatically read tsconfig.json paths
    // This ensures all @/* paths are correctly resolved
    if (!config.resolve.plugins) {
      config.resolve.plugins = []
    }
    
    // Add tsconfig-paths plugin - this reads tsconfig.json and applies paths to webpack
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.join(projectRoot, 'tsconfig.json'),
        extensions: config.resolve.extensions || ['.tsx', '.ts', '.jsx', '.js', '.json'],
        baseUrl: projectRoot,
      })
    )
    
    // Also ensure @ alias is set as fallback
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }
    
    if (!config.resolve.alias['@']) {
      config.resolve.alias['@'] = projectRoot
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
    console.log('[Webpack] Using tsconfig-paths-webpack-plugin')
    console.log('[Webpack] Alias @:', config.resolve.alias['@'])
    console.log('[Webpack] Modules:', config.resolve.modules.slice(0, 3))
    
    return config
  },
}

export default nextConfig


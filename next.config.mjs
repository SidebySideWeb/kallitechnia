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
    
    // CRITICAL: Only set base @ alias
    // Webpack will resolve @/components/navigation by:
    // 1. Matching @ to projectRoot
    // 2. Resolving components/navigation relative to projectRoot
    // Setting @/components as an alias breaks this because webpack treats it as a module
    const existingAliases = config.resolve.alias || {}
    config.resolve.alias = {
      ...existingAliases,
      '@': projectRoot,
    }
    
    // Add a custom resolver plugin to handle @/components/* imports
    // This ensures webpack can resolve nested paths correctly
    if (!config.resolve.plugins) {
      config.resolve.plugins = []
    }
    
    // Custom resolver that handles @/components/navigation style imports
    const originalResolve = config.resolve.plugins.find(
      (p) => p.constructor.name === 'ModuleScopePlugin'
    )
    
    // Add custom resolver after Next.js's resolver
    config.resolve.plugins.push({
      apply(resolver) {
        resolver.hooks.resolve.tapAsync('CustomAliasResolver', (request, resolveContext, callback) => {
          // Only handle requests starting with @/
          if (request.request && request.request.startsWith('@/')) {
            const requestPath = request.request.replace(/^@\//, '')
            const resolvedPath = path.join(projectRoot, requestPath)
            
            // Try to resolve with extensions
            const extensions = config.resolve.extensions || ['.tsx', '.ts', '.jsx', '.js', '.json']
            for (const ext of extensions) {
              const fullPath = resolvedPath + ext
              if (fs.existsSync(fullPath)) {
                return callback(null, {
                  ...request,
                  path: fullPath,
                  request: fullPath,
                })
              }
            }
            
            // If no file found, try as directory with index
            if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
              for (const ext of extensions) {
                const indexPath = path.join(resolvedPath, `index${ext}`)
                if (fs.existsSync(indexPath)) {
                  return callback(null, {
                    ...request,
                    path: indexPath,
                    request: indexPath,
                  })
                }
              }
            }
          }
          
          // Let webpack handle it normally
          callback()
        })
      },
    })
    
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


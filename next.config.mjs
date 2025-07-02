/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Variables de entorno
  env: {
    CUSTOM_KEY: 'gym-manager',
    APP_VERSION: '1.0.0',
  },

  // Configuración experimental
  experimental: {
    // Habilitar características experimentales si es necesario
    serverComponentsExternalPackages: [],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Configuración de webpack (opcional)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Configuraciones personalizadas de webpack si es necesario
    return config
  },

  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante el build (no recomendado para producción)
    ignoreBuildErrors: false,
  },

  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante el build (no recomendado para producción)
    ignoreDuringBuilds: false,
  },

  // Configuración de output (para exportación estática si es necesario)
  // output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,

  // Configuración de compresión
  compress: true,

  // Configuración de PoweredByHeader
  poweredByHeader: false,

  // Configuración de redirects
  async redirects() {
    return [
      // Ejemplo de redirect
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },

  // Configuración de rewrites
  async rewrites() {
    return [
      // Ejemplo de rewrite
      // {
      //   source: '/api/gym/:path*',
      //   destination: '/api/:path*',
      // },
    ]
  },
}

export default nextConfig

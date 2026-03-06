/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript 构建检查：忽略类型错误
  typescript: {
    ignoreBuildErrors: true,
  },

  // 图片优化：生产环境启用 Vercel Image Optimization
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // 安全头配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  // 生产环境优化
  ...(process.env.NODE_ENV === 'production' && {
    // 启用压缩
    compress: true,
    // 生成 source map 用于错误追踪
    productionBrowserSourceMaps: false, // 设为 true 可启用 source maps
  }),
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' chrome-extension://9a3fb90a-e7ab-49bd-b0e9-ba06d2fd8ccd/; style-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: wss://courteous-koala-82.convex.cloud https://courteous-koala-82.convex.cloud; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; worker-src 'self' blob:; media-src 'self' https:;"
          },
        ],
      },
    ];
  },
}

export default nextConfig

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
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' chrome-extension://9a3fb90a-e7ab-49bd-b0e9-ba06d2fd8ccd/; style-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; font-src * data:; connect-src *; frame-src *; object-src *; base-uri *; form-action *; worker-src * blob:; media-src *;"
          },
        ],
      },
    ];
  },
}

export default nextConfig

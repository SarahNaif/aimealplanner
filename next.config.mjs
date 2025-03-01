/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  transpilePackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

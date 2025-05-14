/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN, process.env.NEXT_PUBLIC_IMG_SHIELDS],
    domains: ['*'],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = removeImports({
  ...nextConfig,
});

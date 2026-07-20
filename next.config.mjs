/** @type {import('next').NextConfig} */

// Деплой на GitHub Pages (проектная страница): статический экспорт + подпапка репозитория
const repo = 'kod-dostupa-k-sebe';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

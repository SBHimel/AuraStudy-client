import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias['better-auth/next-routes'] = path.resolve(__dirname, 'src/lib/next-routes-mock.ts');
    return config;
  },
};

export default nextConfig;

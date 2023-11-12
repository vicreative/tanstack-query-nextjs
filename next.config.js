/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    SPOONACULAR_API_KEY_1: process.env.SPOONACULAR_API_KEY_1,
    SPOONACULAR_API_KEY_2: process.env.SPOONACULAR_API_KEY_2,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    NODEMAILER_PW: process.env.NODEMAILER_PW,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  },
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

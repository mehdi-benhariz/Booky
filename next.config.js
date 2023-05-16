/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    //! possible security issue
    domains: [
      "m.media-amazon.com",
      "upload.wikimedia.org",
      "m.media-amazon.com",
      "images-na.ssl-images-amazon.com",
      "*"
    ],
  },
};

module.exports = nextConfig;

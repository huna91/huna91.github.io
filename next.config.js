/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "huna91-github-io-git-main-huna91.vercel.app",
      "k.kakaocdn.net",
    ],
  },
  // api: {
  //   bodyParser: false,
  // },
};

module.exports = nextConfig;

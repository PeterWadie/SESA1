const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/index.php/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/new/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/en-ae/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

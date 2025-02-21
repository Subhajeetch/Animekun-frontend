const nextConfig = {
  images: {
    domains: [
      "cdn.noitatnemucod.net",
      "anotherdomain.com",
      "yetanotherdomain.com"
    ]
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/public/favicon.ico',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
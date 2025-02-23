const nextConfig = {
  images: {
    domains: [
      "cdn.noitatnemucod.net",
      "anotherdomain.com",
      "yetanotherdomain.com"
    ]
  },
  
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "User-Agent",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
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
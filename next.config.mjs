/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/",
          destination: "/link",
          has: [
            {
              type: "host",
              value: "link.thecomingofstages.com",
            },
          ],
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        // Permanent redirect on local environment may conflict with other projects working locally.
        // Only redirect permanently in production.
        permanent: process.env.NODE_ENV === "development" ? false : true,
        missing: [
          {
            type: "host",
            value: "link.thecomingofstages.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

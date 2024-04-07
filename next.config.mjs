/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        // Permanent redirect on local environment may conflict with other projects working locally.
        // Only redirect permanently in production.
        permanent: process.env.NODE_ENV === "development" ? false : true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/services/inbody-body-composition",
        destination: "/services/inbody",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

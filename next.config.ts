import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  
  output: "export", 
  images: {
    unoptimized: true,
  },
  // basePath: isProd ? "/print_constructor" : "",
  // assetPrefix: isProd ? "/print_constructor/" : "",

};

export default nextConfig;

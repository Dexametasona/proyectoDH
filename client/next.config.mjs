/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  redirects:async ()=>{
    return [{
      source: '/',
      destination: '/home',
      permanent: true,
    },]
  }
};

export default nextConfig;

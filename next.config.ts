import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "*.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "phinf.pstatic.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/ocr",
        destination: "http://211.188.50.163:8080/ocr", // 실제 외부 서버
      },
    ];
  },
};

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA(nextConfig);

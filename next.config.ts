import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["chaeum-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/ocr", // 프론트에서 사용할 경로
        destination: "http://211.188.50.163:8080/ocr", // 실제 외부 서버
      },
    ];
  },
};

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA(nextConfig);

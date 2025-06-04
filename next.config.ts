import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // nextConfig 변수에 직접 NextConfig 타입을 적용합니다.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https"as const,
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https"as const,
        hostname: "*.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https"as const,
        hostname: "phinf.pstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http"as const, // 카카오 이미지 CDN을 위한 설정: http와 https 프로토콜 모두 허용
        hostname: "img1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https"as const,
        hostname: "img1.kakaocdn.net",
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

import withPWAInit from "next-pwa";
import { type NextConfig } from "next"; // NextConfig 타입을 임포트합니다.

const nextConfig: NextConfig = { // nextConfig 변수에 직접 NextConfig 타입을 적용합니다.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phinf.pstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http", // 카카오 이미지 CDN을 위한 설정: http와 https 프로토콜 모두 허용
        hostname: "img1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
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

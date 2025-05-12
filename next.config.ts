import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['chaeum-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default withPWA(nextConfig);
"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import axiosInstance from "@/lib/axios";
import { useEffect } from "react";

export default function WelcomePage() {
  const fetchMemberInfo = async () => {
    const response = await axiosInstance.get("/api/v1/member", {
      withCredentials: true, // HttpOnly 쿠키를 전송하려면 필수
    });
    return response.data;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchMemberInfo();
        console.log("회원 정보:", data);
      } catch (err) {
        console.error("회원 정보 요청 실패:", err);
      }
    };

    getUser();
  }, []);

  return <ClientWelcome />;
}

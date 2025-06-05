"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyBackgroundHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");

    if (
      pathname === "/donation/reward" ||
      pathname === "/donation/reward/notify"
    ) {
      document.body.classList.add("bg-white");
      document.documentElement.style.backgroundColor = "#ffffff";
      metaThemeColor?.setAttribute("content", "#ffffff");
    } else {
      document.body.classList.remove("bg-white");
      document.documentElement.style.backgroundColor = "#E2E3FC";
      metaThemeColor?.setAttribute("content", "#E2E3FC");
    }
  }, [pathname]);

  return null;
}

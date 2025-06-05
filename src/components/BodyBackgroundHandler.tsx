"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyBackgroundHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/donation/reward" ||
      pathname === "/donation/reward/notify"
    ) {
      document.body.classList.add("bg-white");
    } else {
      document.body.classList.remove("bg-white");
    }
  }, [pathname]);

  return null;
}

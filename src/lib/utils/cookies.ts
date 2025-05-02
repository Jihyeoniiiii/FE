// src/lib/utils/cookies.ts
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : null;
};

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    const t = setTimeout(() => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
      }).catch(() => {});
    }, 1000);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

"use client";

import { useEffect } from "react";

const CONVERSION_SEND_TO = "AW-18132637023/dC8OCPnemJ4dEN-qqMZD";
const BUSINESS_DIGITS = "18444083004";
const DEDUPE_WINDOW_MS = 1000;

type GtagFn = (...args: unknown[]) => void;

function isBusinessTel(href: string | null): boolean {
  if (!href) return false;
  if (!href.toLowerCase().startsWith("tel:")) return false;
  return href.replace(/\D/g, "") === BUSINESS_DIGITS;
}

export default function CallTracker() {
  useEffect(() => {
    let lastFired = 0;

    function handleClick(event: MouseEvent) {
      try {
        const target = event.target as Element | null;
        const link = target?.closest?.("a[href^='tel:']") as
          | HTMLAnchorElement
          | null;

        if (!link || !isBusinessTel(link.getAttribute("href"))) return;

        const now = Date.now();
        if (now - lastFired < DEDUPE_WINDOW_MS) return;
        lastFired = now;

        const gtag = (window as unknown as { gtag?: GtagFn }).gtag;

        if (typeof gtag === "function") {
          gtag("event", "conversion", {
            send_to: CONVERSION_SEND_TO,
            value: 1.0,
            currency: "USD",
          });
        }
      } catch {
        // Tracking errors must never block the phone call.
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
"use client";

import { useState } from "react";
import PartIcon from "@/components/part-icon";

interface ProductGalleryProps {
  /** Product.images — each entry is either a real URL ("http..."/"/...") or a placeholder token. This component is the only place that decides how a token renders, so swapping placeholder tokens for real URLs later requires no other code changes. */
  images: string[];
  category: string;
  iconName: string;
  alt: string;
}

function isRealImageUrl(token: string): boolean {
  return token.startsWith("http") || token.startsWith("/");
}

export default function ProductGallery({ images, category, iconName, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : ["placeholder-1"];
  const activeToken = safeImages[active] ?? safeImages[0];

  return (
    <div className="space-y-3">
      {/* Main image — zooms on hover */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[4/3] cursor-zoom-in">
        {isRealImageUrl(activeToken) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={activeToken} alt={alt} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <PartIcon
            category={category}
            iconName={iconName}
            className="w-full h-full"
            iconClassName="h-24 w-24"
            variant={active}
            zoom
          />
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {safeImages.map((token, i) => (
            <button
              key={`${token}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative rounded-lg overflow-hidden border-2 aspect-square transition-colors ${
                i === active ? "border-red-500" : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {isRealImageUrl(token) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={token} alt={`${alt} thumbnail ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <PartIcon
                  category={category}
                  iconName={iconName}
                  className="w-full h-full"
                  iconClassName="h-7 w-7"
                  variant={i}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

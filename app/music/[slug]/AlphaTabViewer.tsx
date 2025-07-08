'use client';

import { useEffect, useRef } from "react";

export default function AlphaTabViewer({ fileUrl }: { fileUrl: string }) {
  const alphaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fileUrl || !alphaRef.current) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.js";
    script.onload = () => {
      const api = new (window as unknown as { alphaTab: { AlphaTabApi: new (element: HTMLElement, options: { file: string; player: { enablePlayer: boolean }; display: { layoutMode: string; notationMode: string } }) => void } }).alphaTab.AlphaTabApi(alphaRef.current!, {
        file: fileUrl,
        player: {
          enablePlayer: true,
        },
        display: {
          layoutMode: "page",
          notationMode: "guitar",
        },
      });
      console.log(api);
    };
    document.body.appendChild(script);
  }, [fileUrl]);

  return (
    <div className="border border-borderPrimary p-2 rounded bg-white text-black overflow-x-auto">
      <div ref={alphaRef} className="alphaTab w-full" />
    </div>
  );
}

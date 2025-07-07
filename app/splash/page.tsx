"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkDevice } from "@/lib/deviceCheck";

export default function SplashScreen() {
  const router = useRouter();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const deviceType = checkDevice();
      router.push(`/${deviceType}`);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center duration-300 h-screen bg-[#e0e6eb] px-6 py-4">
      {showLogo && (
      <div className="text-center border border-borderPrimary rounded-lg p-2 md:p-6 text-textPrimary">
        <h1 className="text-4xl font-bold mb-2">Welcome...</h1>
        <p className="text-lg mb-4">This just in. A new viewer visited kashewknutt.com</p>
        <p className="text-sm text-textPrimary">"Coding & Music in Harmony"</p>
      </div>
      )}
    </div>
  );
}

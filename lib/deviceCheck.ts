"use client";

export const checkDevice = (): "laptop" | "traditional" => {
  if (typeof window === "undefined") return "traditional"; // Default to traditional
  if (window.devicePixelRatio === 1.25) {
    return window.innerWidth > 1200 ? "laptop" : "traditional";
  }
  return "traditional";
};

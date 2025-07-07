"use client";

export const checkDevice = (): "laptop" | "traditional" => {
  if (typeof window === "undefined") return "traditional"; // Default to traditional
  return window.innerWidth > 768 ? "laptop" : "traditional";
};

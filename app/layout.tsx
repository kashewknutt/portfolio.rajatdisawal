import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"], variable: "--font-jetbrainsmono" });

export const metadata: Metadata = {
  title: "Rajat Disawal | Kashewknutt",
  description: "Rajat Disawal's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable}`}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}

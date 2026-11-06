import type { Metadata } from "next";
import { Barlow, Big_Shoulders } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display",
});
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Gridiron Analytics AI",
  description: "AI-powered NFL predictions for fantasy football and game odds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

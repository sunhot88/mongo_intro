import { Geist } from "next/font/google";
import { Noto_Serif_TC } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuckyDraw from "@/components/LuckyDraw";
import WelcomeGate from "@/components/WelcomeGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "日光芒果 Sunlit Mango",
  description: "台南玉井愛文芒果直送，日曬熟成、當日採收即出貨。",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${notoSerifTC.variable} antialiased`}
    >
      <body className="bg-cream text-ink">
        <Header />
        <WelcomeGate />
        <main>{children}</main>
        <Footer />
        <LuckyDraw />
      </body>
    </html>
  );
}

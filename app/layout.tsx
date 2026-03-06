import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CountrySwitcher from "@/components/CountrySwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Tax Calculator — Philippines, Thailand, Vietnam, Indonesia",
  description:
    "Calculate your net take-home salary and tax deductions for Southeast Asian countries including Philippines, Thailand, Vietnam, and Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌏</span>
              <span className="font-bold text-gray-900 text-lg">SEA Tax</span>
            </div>
            <CountrySwitcher />
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
          For illustrative purposes only. Consult a qualified tax professional
          before making financial decisions. Tax rates reflect 2024/2025
          regulations.
        </footer>
      </body>
    </html>
  );
}

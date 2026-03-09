import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CountrySwitcher from "@/components/CountrySwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rafseb.github.io'),
  title: {
    default: 'SEA Tax Calculator — Philippines, Thailand, Vietnam, Indonesia',
    template: '%s | SEA Tax Calculator',
  },
  description:
    'Free income tax calculator for Southeast Asia. Calculate net take-home salary after income tax and mandatory contributions for Philippines, Thailand, Vietnam, and Indonesia. 2025 tax rates.',
  keywords: [
    'Philippines income tax calculator',
    'Thailand income tax calculator',
    'Vietnam income tax calculator',
    'Indonesia income tax calculator',
    'SEA salary calculator',
    'net take-home pay',
    'TRAIN Law Philippines',
    'PPh 21 Indonesia',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    siteName: 'SEA Tax Calculator',
    type: 'website',
  },
  verification: {
    google: 'LBgRtngvoPxZLcw2EhQ2XHniKPdBXhNRgI8eW49-nEs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6203167402544939"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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

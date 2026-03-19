import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CountrySwitcher from "@/components/CountrySwitcher";
import ConsentBanner from "@/components/ConsentBanner";
import AdSenseLoader from "@/components/AdSenseLoader";

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
      <body className="min-h-screen">
        <AdSenseLoader />
        <header className="sticky top-0 z-10 border-b" style={{ background: 'var(--forest-900)', borderColor: 'var(--forest-700)' }}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {/* Logo mark */}
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border"
                style={{ color: 'var(--gold-500)', borderColor: 'var(--gold-500)' }}
              >
                ✦
              </span>
              {/* Wordmark */}
              <span
                className="text-xs font-bold uppercase tracking-[3px]"
                style={{ color: 'var(--gold-500)' }}
              >
                SEA TAX
              </span>
            </div>
            <CountrySwitcher />
            <Link href="/resources" className="nav-link text-sm whitespace-nowrap">
              Resources
            </Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-xs" style={{ color: 'var(--forest-400)' }}>
          For illustrative purposes only. Consult a qualified tax professional
          before making financial decisions. Tax rates reflect 2025 regulations.
        </footer>
        <ConsentBanner />
      </body>
    </html>
  );
}

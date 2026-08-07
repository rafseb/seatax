import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CountrySwitcher from "@/components/CountrySwitcher";
import { COUNTRIES } from "@/lib/countries";
import ConsentBanner from "@/components/ConsentBanner";
import AdSenseLoader from "@/components/AdSenseLoader";
import GoatCounterAnalytics from "@/components/GoatCounterAnalytics";

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SEA Tax Calculator',
  url: 'https://rafseb.github.io/seatax/',
  description:
    'Free income tax calculator for Southeast Asia. Calculate net take-home salary after income tax and mandatory contributions for Philippines, Thailand, Vietnam, Indonesia, Malaysia and Singapore.',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rafseb.github.io/seatax'),
  title: {
    default: 'SEA Tax Calculator — Philippines, Thailand, Vietnam, Indonesia, Malaysia, Singapore',
    template: '%s | SEA Tax Calculator',
  },
  description:
    'Free income tax calculator for Southeast Asia. Calculate net take-home salary after income tax and mandatory contributions for the Philippines, Thailand, Vietnam, Indonesia, Malaysia and Singapore. 2026 tax rates.',
  keywords: [
    'Philippines income tax calculator',
    'Thailand income tax calculator',
    'Vietnam income tax calculator',
    'Indonesia income tax calculator',
    'Malaysia income tax calculator',
    'Singapore income tax calculator',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <AdSenseLoader />
        <GoatCounterAnalytics />
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
            <Link href="/compare" className="nav-link text-sm whitespace-nowrap">
              Compare
            </Link>
            <Link href="/resources" className="nav-link text-sm whitespace-nowrap">
              Resources
            </Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t mt-8" style={{ borderColor: 'var(--forest-700)' }}>
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="grid gap-8 sm:grid-cols-3 mb-8 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] mb-3" style={{ color: 'var(--gold-500)' }}>
                  Tax Calculators
                </p>
                <ul className="space-y-2">
                  {COUNTRIES.map((country) => (
                    <li key={country.slug}>
                      <Link href={`/${country.slug}`} className="nav-link">
                        {country.flag} {country.name} Tax Calculator
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/compare" className="nav-link">
                      ⚖️ Compare Countries
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] mb-3" style={{ color: 'var(--gold-500)' }}>
                  Expat Resources
                </p>
                <ul className="space-y-2">
                  <li><Link href="/resources" className="nav-link">Resource Hub</Link></li>
                  <li><Link href="/resources/working-in-southeast-asia" className="nav-link">Working in Southeast Asia</Link></li>
                  <li><Link href="/resources/guides" className="nav-link">Country Tax Guides</Link></li>
                  <li><Link href="/resources/visas" className="nav-link">Visa Options</Link></li>
                  <li><Link href="/resources/cost-of-living" className="nav-link">Cost of Living</Link></li>
                  <li><Link href="/resources/relocation" className="nav-link">Relocation Checklists</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] mb-3" style={{ color: 'var(--gold-500)' }}>
                  Guides
                </p>
                <ul className="space-y-2">
                  <li><Link href="/resources/banking" className="nav-link">Banking &amp; Money</Link></li>
                  <li><Link href="/resources/health-insurance" className="nav-link">Health Insurance</Link></li>
                  <li><Link href="/resources/digital-nomad" className="nav-link">Digital Nomad Hub</Link></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-xs" style={{ color: 'var(--forest-400)' }}>
              For illustrative purposes only. Consult a qualified tax professional
              before making financial decisions. Tax rates reflect 2026 regulations.
            </p>
          </div>
        </footer>
        <ConsentBanner />
      </body>
    </html>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';

interface Props {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return {};
  return {
    title: `Relocating to ${country.name} — Expat Checklist`,
    description: `A step-by-step overview of the key tasks when relocating to ${country.name} as an expat — visa, banking, tax registration, health insurance, and more.`,
    alternates: {
      canonical: `https://rafseb.github.io/seatax/resources/relocation/${slug}`,
    },
  };
}

export default async function RelocationCountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources/relocation" className="text-sm nav-link">
          ← Relocation Checklists
        </Link>
      </div>

      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{country.flag}</span>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--cream)' }}>Relocating to {country.name}</h1>
        </div>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          A step-by-step overview of the key tasks when relocating to {country.name} as an expat.
        </p>
      </header>

      <section className="mb-8">
        <ol className="space-y-3 list-decimal list-inside" style={{ color: 'var(--forest-300)' }}>
          <li className="leading-relaxed">Arrange the right visa or work permit</li>
          <li className="leading-relaxed">Open a local bank account</li>
          <li className="leading-relaxed">Register for a tax identification number</li>
          <li className="leading-relaxed">Set up health insurance coverage</li>
          <li className="leading-relaxed">Get a local SIM card and set up utilities</li>
          <li className="leading-relaxed">
            Register your address with local authorities (where required)
          </li>
        </ol>
      </section>

      <div
        className="p-5 mb-8"
        style={{ background: 'var(--forest-700)', border: '1px solid var(--forest-600)', borderRadius: '4px' }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--cream)' }}>Full guide coming soon</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          Detailed step-by-step relocation guide for {country.name} coming soon.
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <Link href={`/resources/visas/${slug}`} className="nav-link">
          Visa options for {country.name} →
        </Link>
        <Link href="/resources/guides" className="nav-link">
          Expat tax guides →
        </Link>
        <Link href={`/${slug}`} className="nav-link">
          {country.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}

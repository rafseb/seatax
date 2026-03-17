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
        <Link href="/resources/relocation" className="text-sm text-blue-600 hover:underline">
          ← Relocation Checklists
        </Link>
      </div>

      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{country.flag}</span>
          <h1 className="text-2xl font-bold text-gray-900">Relocating to {country.name}</h1>
        </div>
        <p className="text-gray-700 leading-relaxed">
          A step-by-step overview of the key tasks when relocating to {country.name} as an expat.
        </p>
      </header>

      <section className="mb-8">
        <ol className="space-y-3 list-decimal list-inside">
          <li className="text-gray-700 leading-relaxed">Arrange the right visa or work permit</li>
          <li className="text-gray-700 leading-relaxed">Open a local bank account</li>
          <li className="text-gray-700 leading-relaxed">Register for a tax identification number</li>
          <li className="text-gray-700 leading-relaxed">Set up health insurance coverage</li>
          <li className="text-gray-700 leading-relaxed">Get a local SIM card and set up utilities</li>
          <li className="text-gray-700 leading-relaxed">
            Register your address with local authorities (where required)
          </li>
        </ol>
      </section>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
        <p className="text-sm font-medium text-gray-900 mb-1">Full guide coming soon</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Detailed step-by-step relocation guide for {country.name} coming soon.
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <Link href={`/resources/visas/${slug}`} className="text-blue-600 hover:underline">
          Visa options for {country.name} →
        </Link>
        <Link href="/resources/guides" className="text-blue-600 hover:underline">
          Expat tax guides →
        </Link>
        <Link href={`/${slug}`} className="text-blue-600 hover:underline">
          {country.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}

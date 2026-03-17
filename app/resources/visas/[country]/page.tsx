import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import { getVisaData } from '@/lib/resources/visaData';
import VisaTable from '@/components/VisaTable';

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
    title: `Visa Options in ${country.name} — Expat & Nomad Guide`,
    description: `Complete guide to visa types in ${country.name} for tourists, digital nomads, retirees, and professionals. Filterable by category.`,
    alternates: {
      canonical: `https://rafseb.github.io/seatax/resources/visas/${slug}`,
    },
  };
}

export default async function VisaCountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  const visaData = getVisaData(slug);

  if (!country || !visaData) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Visa options in ${country.name}`,
    numberOfItems: visaData.visas.length,
    itemListElement: visaData.visas.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
    })),
  };

  const lastReviewedLabel = new Date(visaData.lastReviewed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-4">
        <Link href="/resources/visas" className="text-sm text-blue-600 hover:underline">
          ← Visa Options
        </Link>
      </div>

      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{country.flag}</span>
          <h1 className="text-2xl font-bold text-gray-900">Visa Options in {country.name}</h1>
        </div>
        <p className="text-xs text-gray-400">Data last reviewed {lastReviewedLabel}</p>
      </header>

      <VisaTable visas={visaData.visas} />

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-1">
          Calculate your take-home pay in {country.name}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          See exactly how much income tax and mandatory contributions you would pay as a resident
          or expat in {country.name}.
        </p>
        <Link href={`/${slug}`} className="text-sm font-medium text-blue-600 hover:underline">
          Open {country.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}

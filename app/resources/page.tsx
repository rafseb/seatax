import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import { COUNTRIES } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'SEA Expat Resources — Visas, Cost of Living & Guides',
  description:
    'Complete resource hub for expats and digital nomads in Southeast Asia. Visa guides, cost of living data, banking tips, and tax calculators for Philippines, Thailand, Vietnam, Indonesia and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources',
  },
};

const TOOLS: {
  icon: string;
  title: string;
  description: string;
  href: string;
  status: 'live' | 'stub';
}[] = [
  {
    icon: '🛂',
    title: 'Visa Guide by Country',
    description: 'Explore visa options for expats, digital nomads, retirees and investors — filterable by type.',
    href: '/resources/visas',
    status: 'live',
  },
  {
    icon: '💰',
    title: 'Cost of Living Comparison',
    description: 'Side-by-side monthly cost breakdown across all 5 SEA countries in USD.',
    href: '/resources/cost-of-living',
    status: 'live',
  },
  {
    icon: '🏦',
    title: 'Banking & Money Guide',
    description: 'How to open a bank account as a foreigner, international transfers, and recommended fintech services.',
    href: '/resources/banking',
    status: 'live',
  },
  {
    icon: '🏥',
    title: 'Health Insurance Guide',
    description: 'Mandatory vs private health coverage for expats — what you need and recommended providers.',
    href: '/resources/health-insurance',
    status: 'stub',
  },
  {
    icon: '📋',
    title: 'Relocation Checklist',
    description: 'Step-by-step country-specific checklist: visa, accommodation, SIM card, banking, tax registration.',
    href: '/resources/relocation',
    status: 'stub',
  },
  {
    icon: '💻',
    title: 'Digital Nomad Hub',
    description: 'Visa options, co-working spaces, internet quality, and nomad communities across SEA.',
    href: '/resources/digital-nomad',
    status: 'stub',
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">SEA Expat Resource Hub</h1>
        <p className="text-gray-600 leading-relaxed">
          Everything you need to live, work, and thrive as an expat or digital nomad in Southeast Asia.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Country Tax Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ARTICLES.map((article) => {
            const country = COUNTRIES.find((c) => c.slug === article.country);
            return (
              <Link
                key={article.slug}
                href={`/resources/guides/${article.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{country?.flag}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {country?.name}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {article.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                  Read guide →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Tools &amp; Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl">{tool.icon}</span>
                {tool.status === 'stub' && (
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                    Coming soon
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

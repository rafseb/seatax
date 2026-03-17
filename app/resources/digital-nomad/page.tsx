import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Nomad Guide to Southeast Asia',
  description:
    'Everything digital nomads need to know about living and working remotely in Southeast Asia — visa options, co-working spaces, internet quality, and nomad communities.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/digital-nomad',
  },
};

export default function DigitalNomadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Digital Nomad Guide to Southeast Asia
      </h1>

      <p className="text-gray-700 leading-relaxed mb-8">
        Southeast Asia remains one of the world&apos;s most popular destinations for digital nomads,
        offering low cost of living, warm climate, reliable internet in major cities, and a
        well-established nomad community infrastructure. Several countries have introduced
        dedicated visa pathways specifically for remote workers.
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Formal Digital Nomad Visas</h2>
        <p className="text-gray-700 leading-relaxed">
          Thailand&apos;s Long-Term Resident (LTR) visa includes a Work-from-Thailand Professional
          category for high-income remote employees. Indonesia offers the Second Home Visa (E33G)
          for long stays with sufficient proof of funds. Malaysia&apos;s DE Rantau Digital Nomad Pass
          is specifically designed for freelancers and remote workers earning from overseas clients.
          The Philippines and Vietnam do not currently have a formal digital nomad visa — remote
          workers typically enter on tourist visas, though this carries legal uncertainty around
          tax residency. See the{' '}
          <Link href="/resources/visas" className="text-blue-600 hover:underline">
            Visa Guide
          </Link>{' '}
          for full details on each country&apos;s options.
        </p>
      </section>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-1">Full guide coming soon</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          We are building a comprehensive guide covering co-working spaces, internet speeds, nomad
          communities, and city-by-city cost breakdowns across SEA.
        </p>
      </div>
    </div>
  );
}

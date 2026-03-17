import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Health Insurance for Expats in SEA',
  description:
    'Guide to health insurance for expats in Southeast Asia — mandatory coverage requirements, recommended providers, and policy comparison tips for Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/health-insurance',
  },
};

export default function HealthInsurancePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Health Insurance for Expats in Southeast Asia
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Access to quality healthcare varies significantly across Southeast Asia. In most countries
        public health systems are not fully accessible to foreign residents, making private health
        insurance essential for expats. It ensures access to private hospitals, protects against
        large out-of-pocket costs, and may be required to meet visa conditions — Thailand and
        Malaysia, for example, mandate proof of coverage for long-stay visa categories.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-1">Full guide coming soon</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          We are working on a comprehensive guide covering mandatory coverage requirements,
          recommended international providers (Cigna, AXA, BUPA), and policy comparison tips
          for each country.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </div>
  );
}

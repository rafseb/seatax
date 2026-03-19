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

const sectionHeadingStyle = { color: 'var(--cream)' };
const bodyTextStyle = { color: 'var(--forest-300)' };

export default function HealthInsurancePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
        Health Insurance
      </p>
      <h1 className="text-2xl font-bold mb-3" style={sectionHeadingStyle}>
        Health Insurance for Expats in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-6" style={bodyTextStyle}>
        Access to quality healthcare varies significantly across Southeast Asia. In most countries
        public health systems are not fully accessible to foreign residents, making private health
        insurance essential for expats. It ensures access to private hospitals, protects against
        large out-of-pocket costs, and may be required to meet visa conditions — Thailand and
        Malaysia, for example, mandate proof of coverage for long-stay visa categories.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>🇵🇭 Philippines</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>PhilHealth (national insurance) is available for voluntary foreign members but covers public hospitals only — most expats use private facilities</li>
            <li>No minimum coverage is required for most visa categories, but private insurance is strongly recommended</li>
            <li>Look for a policy covering inpatient, outpatient, and emergency evacuation — pre-existing condition waiting periods vary widely</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>🇹🇭 Thailand</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>Non-Immigrant OA visa requires proof of coverage: minimum ฿40,000 outpatient / ฿400,000 inpatient</li>
            <li>LTR Work-from-Thailand visa requires a higher minimum of $50,000 USD equivalent coverage</li>
            <li>Private hospitals are efficient and widely accept international insurance with direct billing; public hospitals are cheaper but slower</li>
            <li>Check renewal terms carefully — policies that exclude pre-existing conditions on renewal are common</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>🇻🇳 Vietnam</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>Work permit holders can join the state health insurance scheme, but it only covers public hospitals — quality varies outside major cities</li>
            <li>International-grade private hospitals in HCMC, Hanoi, and Da Nang offer direct billing with most major international insurers</li>
            <li>Emergency repatriation coverage is worth prioritising — air evacuation to Singapore or Thailand is the standard for serious cases</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>🇮🇩 Indonesia</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>KITAS (limited stay permit) holders are required to register with BPJS Kesehatan — but BPJS only covers public hospitals</li>
            <li>Most expats pair BPJS with a private international policy to access private hospital networks</li>
            <li>Emergency evacuation coverage is particularly important given Indonesia&apos;s geography — serious cases often require transport to Bali, Singapore, or Australia</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>🇲🇾 Malaysia</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>MM2H visa holders are required to maintain health insurance; DE Rantau pass holders are not, but it is strongly advised</li>
            <li>Malaysia&apos;s private hospital system is one of the most developed in the region — competitive pricing compared to Singapore</li>
            <li>Local Malaysian insurers offer competitive rates for long-stay expats; international plans remain the best option for those who travel frequently across SEA</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={sectionHeadingStyle}>What to look for in any policy</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li>Direct billing at private hospitals (avoids out-of-pocket advance payments)</li>
            <li>Emergency medical evacuation and repatriation</li>
            <li>Outpatient and specialist visits, not just inpatient</li>
            <li>Pre-existing condition coverage (or clear exclusion terms)</li>
            <li>Regional vs worldwide coverage — worldwide adds cost, regional is usually sufficient for SEA</li>
          </ul>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/resources" className="text-sm nav-link">
          ← Back to Resources
        </Link>
      </div>
    </div>
  );
}

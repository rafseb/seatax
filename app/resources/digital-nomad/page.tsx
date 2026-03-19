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

const bodyTextStyle = { color: 'var(--forest-300)' };
const headingStyle = { color: 'var(--cream)' };

export default function DigitalNomadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
        Digital Nomad Hub
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Digital Nomad Guide to Southeast Asia
      </h1>

      <p className="leading-relaxed mb-8" style={bodyTextStyle}>
        Southeast Asia remains one of the world&apos;s most popular destinations for digital nomads,
        offering low cost of living, warm climate, reliable internet in major cities, and a
        well-established nomad community infrastructure. Several countries have introduced
        dedicated visa pathways specifically for remote workers.
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Formal Digital Nomad Visas</h2>
        <p className="leading-relaxed" style={bodyTextStyle}>
          Thailand&apos;s Long-Term Resident (LTR) visa includes a Work-from-Thailand Professional
          category for high-income remote employees. Indonesia offers the Second Home Visa (E33G)
          for long stays with sufficient proof of funds. Malaysia&apos;s DE Rantau Digital Nomad Pass
          is specifically designed for freelancers and remote workers earning from overseas clients.
          The Philippines and Vietnam do not currently have a formal digital nomad visa — remote
          workers typically enter on tourist visas, though this carries legal uncertainty around
          tax residency. See the{' '}
          <Link href="/resources/visas" className="nav-link">
            Visa Guide
          </Link>{' '}
          for full details on each country&apos;s options.
        </p>
      </section>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇵🇭 Philippines</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> No formal digital nomad visa. Most remote workers enter on a tourist visa (21 days on arrival for many nationalities, extendable through the Bureau of Immigration up to 2 years in increments)</li>
            <li><strong style={{ color: 'var(--cream)' }}>Best cities:</strong> Makati and BGC in Metro Manila offer reliable infrastructure and a professional expat scene; Cebu City is a slower-paced alternative with a growing tech community</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> Fiber broadband is reliable in BGC, Makati, and Cebu CBD; more variable in other areas. Mobile data (Globe, Smart) serves as a dependable backup</li>
            <li><strong style={{ color: 'var(--cream)' }}>Scene:</strong> SEA&apos;s most English-friendly destination — coworking spaces are plentiful in BGC and Cebu; strong expat networks, though the formal nomad community is smaller than Thailand or Bali</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇹🇭 Thailand</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> LTR Work-from-Thailand Professional visa (10-year, requires $80k+ annual income from a foreign employer); most nomads use a standard tourist visa/exemption (30 days, extendable) or TR visa for longer stays</li>
            <li><strong style={{ color: 'var(--cream)' }}>Best cities:</strong> Chiang Mai is the established nomad capital — low cost, cool climate, mature coworking scene. Bangkok offers unmatched infrastructure and lifestyle. Koh Samui and Phuket for beach-based working</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> Excellent fiber coverage across cities; 5G available in Bangkok. One of the most reliable connectivity environments in SEA</li>
            <li><strong style={{ color: 'var(--cream)' }}>Scene:</strong> The most developed nomad infrastructure in Southeast Asia — coworking spaces, nomad meetups, and expat communities in every major city</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇻🇳 Vietnam</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> No formal digital nomad visa. E-visa valid 90 days, multiple entry, available to most nationalities — extendable and renewable. Tax residency rules apply after 183 days</li>
            <li><strong style={{ color: 'var(--cream)' }}>Best cities:</strong> Da Nang is the fastest-growing nomad hub — beach access, low cost, manageable size. Ho Chi Minh City for energy and business networking. Hanoi for culture and a cooler northern climate</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> Surprisingly fast fixed broadband in cities — Vietnam consistently ranks well for urban internet speeds. Mobile data is widely available and affordable</li>
            <li><strong style={{ color: 'var(--cream)' }}>Scene:</strong> A rapidly growing nomad community, especially in Da Nang. Very affordable cost of living; Vietnamese coffee shop culture makes it easy to work anywhere</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇮🇩 Indonesia</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> Second Home Visa (E33G) for 5–10 year stays (requires ~$130k in Indonesian bank account or property). Social Visa (B211A) is the common short-stay route: 60 days, extendable to 180 days</li>
            <li><strong style={{ color: 'var(--cream)' }}>Best cities:</strong> Bali (Canggu for the surf-and-laptop crowd, Ubud for a quieter creative atmosphere) is arguably the world&apos;s most established nomad destination. Jakarta is business-only</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> Good fiber in Canggu and Seminyak; more variable in Ubud and rural Bali. Island connectivity outside Bali can be unreliable — a local SIM as backup is essential</li>
            <li><strong style={{ color: 'var(--cream)' }}>Scene:</strong> Bali has the deepest nomad ecosystem in SEA — coworking spaces, nomad houses, long-term accommodation, and community events are all well established</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇲🇾 Malaysia</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> DE Rantau Digital Nomad Pass — 3 to 12 months (renewable), requires minimum $24,000 annual income from non-Malaysian clients or employer. One of the most straightforward formal nomad visa processes in the region</li>
            <li><strong style={{ color: 'var(--cream)' }}>Best cities:</strong> Kuala Lumpur has excellent infrastructure, a diverse food scene, and strong connectivity. Penang offers a slower pace with heritage character and a growing creative scene. Johor Bahru is convenient for Singapore day trips</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> Among the best in SEA — fast, reliable, and widely available. Fibre penetration in KL is high and mobile coverage is strong nationwide</li>
            <li><strong style={{ color: 'var(--cream)' }}>Scene:</strong> A growing but less concentrated nomad community than Thailand or Bali. English is widely spoken; multicultural environment makes it highly livable for longer stays</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>Quick comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--forest-700)' }}>
                  <th className="py-2 pr-4 font-semibold" style={headingStyle}>Country</th>
                  <th className="py-2 pr-4 font-semibold" style={headingStyle}>Formal DNV</th>
                  <th className="py-2 pr-4 font-semibold" style={headingStyle}>Best for</th>
                  <th className="py-2 pr-4 font-semibold" style={headingStyle}>Internet</th>
                  <th className="py-2 font-semibold" style={headingStyle}>Cost level</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--forest-300)' }}>
                {[
                  ['🇵🇭 Philippines', 'None', 'English speakers, city life', 'Good in BGC/Cebu', 'Low–mid'],
                  ['🇹🇭 Thailand', 'LTR (WFT Pro)', 'All nomad types', 'Excellent', 'Low–mid'],
                  ['🇻🇳 Vietnam', 'None', 'Budget nomads, beach life', 'Fast in cities', 'Very low'],
                  ['🇮🇩 Indonesia', 'Second Home / Social', 'Bali lifestyle', 'Variable', 'Low'],
                  ['🇲🇾 Malaysia', 'DE Rantau', 'Long-term stays', 'Excellent', 'Mid'],
                ].map((row) => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                    {row.map((cell, i) => (
                      <td key={i} className="py-2 pr-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm" style={bodyTextStyle}>
            See also:{' '}
            <Link href="/resources/visas" className="nav-link">Visa Guide</Link>
            {' · '}
            <Link href="/resources/cost-of-living" className="nav-link">Cost of Living</Link>
            {' · '}
            <Link href="/philippines" className="nav-link">Tax Calculator</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

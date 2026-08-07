import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Digital Nomad Guide to Southeast Asia (2026)',
  description:
    'Everything digital nomads need to know about living and working remotely in Southeast Asia — visa options, tax residency rules, co-working spaces, internet quality, and nomad communities.',
  path: '/resources/digital-nomad',
});

const bodyTextStyle = { color: 'var(--forest-300)' };
const headingStyle = { color: 'var(--cream)' };

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

/** Child pages and closely-related resources that make up the nomad cluster. */
const HUB_LINKS: { icon: string; title: string; description: string; href: string }[] = [
  {
    icon: '🧾',
    title: 'Tax Residency for Digital Nomads',
    description:
      'The day-count tests, worldwide vs territorial vs remittance taxation, and whether resident or non-resident status is cheaper at your income.',
    href: '/resources/digital-nomad/tax-residency',
  },
  {
    icon: '🛂',
    title: 'Visa Options by Country',
    description:
      'Every visa route for nomads, retirees, employees and investors — filterable, with duration and requirements.',
    href: '/resources/visas',
  },
  {
    icon: '🌏',
    title: 'Working in Southeast Asia',
    description:
      'Work permits vs visas, the four legal ways to get paid, and where remote work actually stands country by country.',
    href: '/resources/working-in-southeast-asia',
  },
  {
    icon: '📶',
    title: 'Internet, SIMs & Coworking',
    description:
      'Connectivity, mobile data, power reliability and coworking norms city by city — and the setup that survives an outage mid-call.',
    href: '/resources/digital-nomad/internet-and-coworking',
  },
  {
    icon: '💰',
    title: 'Cost of Living Comparison',
    description: 'Monthly essentials across all six countries in USD, side by side.',
    href: '/resources/cost-of-living',
  },
  {
    icon: '🏦',
    title: 'Banking & Money Transfers',
    description: 'Opening accounts as a foreigner, receiving foreign payments, and cutting FX losses.',
    href: '/resources/banking',
  },
  {
    icon: '🏥',
    title: 'Health Insurance',
    description: 'What cover you need, what visas require proof of, and typical costs by country.',
    href: '/resources/health-insurance',
  },
];

/** Nomad-relevant city guides already published under /resources/guides. */
const CITY_GUIDES: { slug: string; label: string }[] = [
  { slug: 'living-in-chiang-mai-as-a-digital-nomad', label: '🇹🇭 Chiang Mai' },
  { slug: 'living-in-bangkok-as-an-expat', label: '🇹🇭 Bangkok' },
  { slug: 'living-in-bali-as-an-expat', label: '🇮🇩 Bali' },
  { slug: 'living-in-ho-chi-minh-city-as-an-expat', label: '🇻🇳 Ho Chi Minh City' },
  { slug: 'living-in-kuala-lumpur-as-an-expat', label: '🇲🇾 Kuala Lumpur' },
  { slug: 'living-in-metro-manila-as-an-expat', label: '🇵🇭 Metro Manila' },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Which Southeast Asian countries have a digital nomad visa?',
    a: 'Malaysia has the DE Rantau Digital Nomad Pass (3–12 months, renewable, minimum foreign income requirement). Thailand has the Long-Term Resident Work-from-Thailand Professional visa for high-income remote employees. Indonesia offers the Second Home Visa (E33G) as a long-stay route, though it grants residence rather than work rights. Vietnam and the Philippines have no formal digital nomad visa, and Singapore has none either — its policy is moving the other way, tightening work passes toward higher-earning, employer-sponsored talent.',
  },
  {
    q: 'Where is the best internet in Southeast Asia for remote work?',
    a: 'Malaysia and Thailand have the most consistently reliable fixed broadband, with strong fibre coverage in Kuala Lumpur, Bangkok and Chiang Mai. Vietnam performs well on urban speed in Da Nang, Ho Chi Minh City and Hanoi. Indonesia is the most variable — good in Canggu and Seminyak, patchier in Ubud and outside Bali, where a local SIM as backup is essential.',
  },
  {
    q: 'Do digital nomads pay tax in Southeast Asia?',
    a: 'It depends on residency, not on your visa. Each country applies a day-count test of 180–183 days, and the countries differ in what they tax: Vietnam and Indonesia tax residents on worldwide income, Malaysia exempts foreign-source income for individuals, Thailand taxes foreign income on remittance, and the Philippines taxes resident aliens on Philippine-source income only.',
  },
  {
    q: 'Which country is cheapest for digital nomads in Southeast Asia?',
    a: 'Vietnam is generally the lowest-cost base, followed by Indonesia and the Philippines outside Metro Manila. Thailand sits mid-range with Chiang Mai notably cheaper than Bangkok. Malaysia is the most expensive of the traditional nomad bases while still well below Western costs. Singapore is in a different bracket entirely — housing costs several times the regional norm, which is why almost no one bases there as a nomad.',
  },
];

export default function DigitalNomadPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Digital Nomad Guide to Southeast Asia',
    description:
      'Visa options, tax residency rules, internet quality, cost of living and nomad communities across Southeast Asia.',
    url: `${BASE_URL}/resources/digital-nomad`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: HUB_LINKS.map((link, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: link.title,
        url: `${BASE_URL}${link.href}`,
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbLd = breadcrumbList([
    { name: 'Resources', path: '/resources' },
    { name: 'Digital Nomad', path: '/resources/digital-nomad' },
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: 'var(--gold-500)' }}>
          Start Here
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {HUB_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block p-5 transition-all" style={cardStyle}>
              <span className="text-2xl">{link.icon}</span>
              <h3 className="text-base font-semibold mt-2 mb-2 leading-snug" style={headingStyle}>
                {link.title}
              </h3>
              <p className="text-sm leading-relaxed" style={bodyTextStyle}>{link.description}</p>
            </Link>
          ))}
        </div>
      </section>

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
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>🇸🇬 Singapore</h2>
          <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyTextStyle}>
            <li><strong style={{ color: 'var(--cream)' }}>Visa:</strong> No digital nomad visa, and none expected — policy is tightening toward higher-earning, employer-sponsored talent. Every mainstream work pass needs a Singapore-registered employer. The ONE Pass (5 years, not tied to one employer) and EntrePass are the closest routes to independence, and both set a high bar</li>
            <li><strong style={{ color: 'var(--cream)' }}>Tax:</strong> Territorial — foreign-source income received by an individual is generally untaxed, there is no capital gains tax, and CPF applies only to Citizens and PRs, so foreigners on work passes pay no mandatory contributions at all</li>
            <li><strong style={{ color: 'var(--cream)' }}>Internet:</strong> The best in the region — island-wide 5G, gigabit fibre in essentially every building, and extensive public Wi-Fi</li>
            <li><strong style={{ color: 'var(--cream)' }}>Reality check:</strong> Housing costs several times the regional norm, which is why almost nobody bases here as a nomad. Singapore is a destination for employed professionals, not for location-independent freelancers — but it is an excellent short-stay hub with unmatched flight connections</li>
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
                  ['🇸🇬 Singapore', 'None', 'Employer-sponsored roles', 'Excellent', 'Very high'],
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
            Cost level is only half the picture — what you keep depends on tax residency.{' '}
            <Link href="/compare" className="nav-link">
              Compare net take-home across all six countries
            </Link>{' '}
            at your income, then read{' '}
            <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
              how tax residency works for digital nomads
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={headingStyle}>City guides</h2>
          <p className="text-sm leading-relaxed mb-3" style={bodyTextStyle}>
            Ground-level detail on rent, coworking, neighbourhoods and daily costs.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {CITY_GUIDES.map((city) => (
              <li key={city.slug}>
                <Link href={`/resources/guides/${city.slug}`} className="nav-link">
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4" style={headingStyle}>
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="p-5" style={cardStyle}>
                <h3 className="text-base font-semibold mb-2" style={headingStyle}>{q}</h3>
                <p className="text-sm leading-relaxed" style={bodyTextStyle}>{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

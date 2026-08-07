import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Internet, SIMs & Coworking for Remote Work in Southeast Asia (2026)',
  description:
    'Practical connectivity guide for digital nomads in Southeast Asia — fibre and mobile reliability by city, eSIM and local SIM options, coworking norms, power reliability, and how to build a setup that survives an outage mid-call.',
  path: '/resources/digital-nomad/internet-and-coworking',
});

const bodyStyle = { color: 'var(--forest-300)' };
const headingStyle = { color: 'var(--cream)' };
const strong = { color: 'var(--cream)' };
const labelStyle = { color: 'var(--gold-500)' };

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

interface CityRow {
  flag: string;
  city: string;
  /** Matching city guide under /resources/guides, where one exists. */
  guideSlug?: string;
  fibre: string;
  mobile: string;
  power: string;
  coworking: string;
}

const CITIES: CityRow[] = [
  {
    flag: '🇹🇭',
    city: 'Bangkok',
    guideSlug: 'living-in-bangkok-as-an-expat',
    fibre: 'Excellent — dense fibre, widely available in condos',
    mobile: 'Excellent, 5G across the city',
    power: 'Very reliable',
    coworking: 'Abundant across Sukhumvit, Silom and Ari; full range from budget to premium',
  },
  {
    flag: '🇹🇭',
    city: 'Chiang Mai',
    guideSlug: 'living-in-chiang-mai-as-a-digital-nomad',
    fibre: 'Excellent and cheap',
    mobile: 'Strong',
    power: 'Reliable',
    coworking: 'The most mature nomad coworking scene in the region for its size — Nimman is the centre',
  },
  {
    flag: '🇻🇳',
    city: 'Da Nang',
    fibre: 'Fast and inexpensive',
    mobile: 'Strong and very cheap',
    power: 'Generally reliable',
    coworking: 'Growing quickly; the fastest-rising nomad hub in Vietnam',
  },
  {
    flag: '🇻🇳',
    city: 'Ho Chi Minh City',
    guideSlug: 'living-in-ho-chi-minh-city-as-an-expat',
    fibre: 'Fast; occasional undersea cable disruptions affect international routes',
    mobile: 'Strong and very cheap',
    power: 'Reliable in central districts',
    coworking: 'Extensive in Districts 1, 2 and 3; strong café working culture as a backup',
  },
  {
    flag: '🇮🇩',
    city: 'Bali (Canggu / Ubud)',
    guideSlug: 'living-in-bali-as-an-expat',
    fibre: 'Good in Canggu and Seminyak, variable in Ubud and inconsistent outside the south',
    mobile: 'Adequate; essential as backup',
    power: 'Outages are routine — plan for them',
    coworking: 'The deepest nomad ecosystem in the region; many venues run generators',
  },
  {
    flag: '🇲🇾',
    city: 'Kuala Lumpur',
    guideSlug: 'living-in-kuala-lumpur-as-an-expat',
    fibre: 'Among the best in Southeast Asia',
    mobile: 'Excellent nationwide coverage',
    power: 'Very reliable',
    coworking: 'Plentiful and well-equipped; strong English-language business environment',
  },
  {
    flag: '🇵🇭',
    city: 'Metro Manila (BGC / Makati)',
    guideSlug: 'living-in-metro-manila-as-an-expat',
    fibre: 'Reliable in BGC and Makati, more variable elsewhere',
    mobile: 'Dependable as backup',
    power: 'Reliable in CBDs; brownouts more common outside',
    coworking: 'Plentiful in BGC; the most English-native working environment in the region',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Which Southeast Asian city has the best internet for remote work?',
    a: 'Kuala Lumpur and Bangkok are the most consistently reliable for fixed broadband, with Chiang Mai close behind at lower cost. Vietnamese cities deliver strong domestic speeds very cheaply but occasionally suffer undersea cable disruptions affecting international routes. Bali is the most variable of the popular bases — good in Canggu, inconsistent in Ubud, and unreliable outside the south.',
  },
  {
    q: 'Should I get a local SIM or an eSIM in Southeast Asia?',
    a: 'Get an eSIM before you fly so you are connected on landing, then buy a local physical SIM within your first few days. Local prepaid plans across the region are dramatically cheaper per gigabyte than tourist eSIMs, and a local number is required for banking, delivery apps and ride-hailing. Run both: the eSIM becomes your redundancy.',
  },
  {
    q: 'Is café wifi good enough for video calls in Southeast Asia?',
    a: 'For calls that matter, no — not as your primary connection. Café wifi is shared, unmanaged and unpredictable at exactly the wrong moment. Use it for asynchronous work, and take important calls from home fibre or a coworking space with a hotspot ready as backup.',
  },
  {
    q: 'How much does coworking cost in Southeast Asia?',
    a: 'Pricing generally runs from inexpensive day passes to monthly hot-desk memberships, with dedicated desks and private offices above that. Chiang Mai and Vietnamese cities sit at the cheaper end, Kuala Lumpur and Bangkok higher, and premium Bali venues can approach Western pricing. Almost everywhere offers a free or cheap trial day — always test the connection before committing to a month.',
  },
  {
    q: 'Do I need a backup internet connection as a digital nomad?',
    a: 'Yes, and it is the cheapest insurance you will buy. A local SIM with a generous data allowance and hotspot enabled costs little and covers fibre outages, power cuts and bad café wifi. In Bali, where power interruptions are routine, treat mobile data plus a charged laptop and power bank as part of the basic setup rather than as a contingency.',
  },
];

export default function InternetAndCoworkingPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Internet, SIMs & Coworking for Remote Work in Southeast Asia',
    description:
      'Connectivity, mobile data, power reliability and coworking norms by city across Southeast Asia.',
    datePublished: '2026-08-07',
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `${BASE_URL}/resources/digital-nomad/internet-and-coworking`,
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
    { name: 'Internet & Coworking', path: '/resources/digital-nomad/internet-and-coworking' },
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-4">
        <Link href="/resources/digital-nomad" className="text-sm nav-link">
          ← Digital Nomad Hub
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={labelStyle}>
        Connectivity · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Internet, SIMs &amp; Coworking in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-8" style={bodyStyle}>
        Headline speed test numbers are close to useless for remote work. What actually decides
        whether a city works is <strong style={strong}>consistency</strong> — whether the
        connection holds through a two-hour call, whether the power stays on, and whether you have
        a second route when the first fails. Most of Southeast Asia is fast. Not all of it is
        dependable.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>City by city</h2>
        <div className="space-y-4">
          {CITIES.map((city) => (
            <div key={city.city} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{city.flag}</span>
                <h3 className="font-semibold" style={strong}>{city.city}</h3>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2 text-sm leading-relaxed" style={bodyStyle}>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>Fixed broadband</dt>
                  <dd>{city.fibre}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>Mobile data</dt>
                  <dd>{city.mobile}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>Power</dt>
                  <dd>{city.power}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>Coworking</dt>
                  <dd>{city.coworking}</dd>
                </div>
              </dl>
              {city.guideSlug && (
                <p className="mt-3 text-sm">
                  <Link href={`/resources/guides/${city.guideSlug}`} className="nav-link">
                    Full city guide →
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>The setup that actually holds</h2>
        <ol className="list-decimal list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>
            <strong style={strong}>eSIM before you fly.</strong> Connected on landing, before you
            have found a phone shop.
          </li>
          <li>
            <strong style={strong}>Local physical SIM in week one.</strong> Far cheaper per
            gigabyte, and a local number is effectively required for banking, delivery and
            ride-hailing. Keep the eSIM as redundancy.
          </li>
          <li>
            <strong style={strong}>Test before you sign.</strong> Run a speed test and a real
            video call from the actual room you would work in, at the time of day you would work.
            Building-wide fibre in a condo listing tells you nothing about the unit.
          </li>
          <li>
            <strong style={strong}>Hotspot as standing backup.</strong> A generous mobile data
            allowance with tethering enabled costs little and covers most failures.
          </li>
          <li>
            <strong style={strong}>Power bank and a charged laptop.</strong> In Bali this is not a
            contingency, it is the baseline.
          </li>
          <li>
            <strong style={strong}>A known second location.</strong> Have one coworking space or
            café you have already tested, so a failure is a ten-minute walk rather than an hour of
            searching.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Choosing a coworking space</h2>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li><strong style={strong}>Take the trial day.</strong> Almost every venue offers one; a month bought untested is a month wasted.</li>
          <li><strong style={strong}>Check call facilities.</strong> Phone booths and meeting rooms separate a real workspace from a café with desks.</li>
          <li><strong style={strong}>Ask about backup power</strong> anywhere outages are routine — in Bali, generator capacity is the single most important question.</li>
          <li><strong style={strong}>Visit at your working hours.</strong> A space that is calm at 10am can be unusable at 3pm.</li>
          <li><strong style={strong}>Check the timezone mix.</strong> If you work US hours, a venue full of Europe-facing nomads will be empty and possibly closed when you need it.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>What this costs, and what you keep</h2>
        <p className="leading-relaxed" style={bodyStyle}>
          Connectivity and coworking are a small share of a nomad budget — the decisive numbers
          are rent, tax and healthcare. Set the full picture with the{' '}
          <Link href="/resources/cost-of-living" className="nav-link">
            Southeast Asia cost of living comparison
          </Link>
          , then check what you actually take home in each country with the{' '}
          <Link href="/compare" className="nav-link">side-by-side tax comparison</Link>. If you are
          staying long enough to matter, read{' '}
          <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
            how tax residency works for digital nomads
          </Link>{' '}
          before you pick a base.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="p-5" style={cardStyle}>
              <h3 className="text-base font-semibold mb-2" style={headingStyle}>{q}</h3>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

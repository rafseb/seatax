import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, COUNTRIES } from "@/lib/countries";
import TaxCalculator from "@/components/TaxCalculator";

const BASE_URL = 'https://rafseb.github.io/seatax';

interface Props {
  params: Promise<{ country: string }>;
}

const SEO: Record<string, {
  title: string;
  description: string;
  heading: string;
  intro: string;
}> = {
  philippines: {
    title: 'Philippines Income Tax Calculator 2025 — Net Salary & TRAIN Law',
    description:
      'Free Philippines income tax calculator for 2025. Enter your gross salary to see net take-home pay after income tax (TRAIN Law brackets 0%–35%), SSS (5%), PhilHealth (2.5%), and Pag-IBIG contributions. Supports resident and expat modes.',
    heading: 'Philippines Income Tax Calculator (2025)',
    intro:
      'Calculate your net take-home pay under the TRAIN Law (Republic Act 10963). ' +
      'Covers income tax brackets from 0% to 35%, SSS (5%, capped at ₱35,000/month), ' +
      'PhilHealth (2.5%), and Pag-IBIG (2%, max ₱200/month). ' +
      'Switch to expat mode for the flat 25% non-resident rate.',
  },
  thailand: {
    title: 'Thailand Income Tax Calculator 2025 — Net Salary & PIT Brackets',
    description:
      'Free Thailand personal income tax (PIT) calculator for 2025. Enter your gross salary to see net take-home pay after PIT (0%–35%), standard deduction (50%, max ฿100,000), personal allowance (฿60,000), and Social Security Fund (SSF) contributions.',
    heading: 'Thailand Income Tax Calculator (2025)',
    intro:
      'Calculate your net take-home pay under Thailand\'s personal income tax (PIT) system. ' +
      'Applies progressive rates from 0% to 35% on taxable income after a 50% standard deduction ' +
      '(max ฿100,000) and ฿60,000 personal allowance. ' +
      'Includes Social Security Fund (SSF) at 5%, capped at ฿750/month. ' +
      'Non-residents pay the same progressive rates without deductions.',
  },
  vietnam: {
    title: 'Vietnam Income Tax Calculator 2025 — Net Salary & PIT Brackets',
    description:
      'Free Vietnam personal income tax (PIT) calculator for 2025. See net take-home pay after income tax (5%–35% monthly brackets), social insurance (8%), health insurance (1.5%), unemployment insurance (1%), and ₫11,000,000 personal deduction.',
    heading: 'Vietnam Income Tax Calculator (2025)',
    intro:
      'Calculate your net take-home pay under Vietnam\'s personal income tax (PIT) law. ' +
      'Monthly progressive brackets from 5% to 35% apply after deducting social insurance (8%), ' +
      'health insurance (1.5%), unemployment insurance (1%) — all capped at ₫36,000,000/month — ' +
      'plus a ₫11,000,000 personal deduction. ' +
      'Non-residents pay a flat 20% on Vietnam-sourced income.',
  },
  indonesia: {
    title: 'Indonesia PPh 21 Tax Calculator 2025 — Net Salary & Income Tax',
    description:
      'Free Indonesia PPh 21 income tax calculator for 2025. Enter your gross salary to see net take-home pay after income tax (5%–35%), PTKP non-taxable threshold (Rp54,000,000/year), BPJS Kesehatan (1%), BPJS JHT (2%), and BPJS JP (1%) pension contributions.',
    heading: 'Indonesia Income Tax Calculator — PPh 21 (2025)',
    intro:
      'Calculate your net take-home pay under Indonesia\'s PPh 21 income tax law. ' +
      'Progressive brackets from 5% to 35% apply after subtracting the PTKP non-taxable threshold ' +
      '(Rp54,000,000/year for a single individual) and BPJS contributions: ' +
      'Kesehatan (1%), JHT Old-Age savings (2%), and JP Pension (1%, capped at Rp10,547,400/month). ' +
      'Non-residents pay a flat 20% withholding tax.',
  },
};

const FAQ: Record<string, { q: string; a: string }[]> = {
  philippines: [
    {
      q: 'How is income tax calculated in the Philippines in 2025?',
      a: 'Under the TRAIN Law (RA 10963), annual taxable income up to ₱250,000 is tax-free. Income from ₱250,001 to ₱400,000 is taxed at 15%; ₱400,001–₱800,000 at 20%; ₱800,001–₱2,000,000 at 25%; ₱2,000,001–₱8,000,000 at 30%; and above ₱8,000,000 at 35%.',
    },
    {
      q: 'What is the SSS contribution rate in the Philippines for 2025?',
      a: 'The employee SSS contribution rate is 5% of monthly salary credit, capped at a ₱35,000 salary ceiling (max contribution ₱1,750/month).',
    },
    {
      q: 'How much is PhilHealth contribution in 2025?',
      a: 'PhilHealth premium is 5% of basic monthly salary, with the employee shoulder 2.5%. The salary floor is ₱10,000 and ceiling is ₱100,000.',
    },
    {
      q: 'What is the Pag-IBIG contribution rate?',
      a: 'Employees contribute 2% of monthly compensation to Pag-IBIG, capped at ₱200/month (₱10,000 salary ceiling).',
    },
  ],
  thailand: [
    {
      q: 'How is personal income tax calculated in Thailand in 2025?',
      a: 'Thailand PIT uses progressive rates: 0% on the first ฿150,000; 5% on ฿150,001–฿300,000; 10% on ฿300,001–฿500,000; 15% on ฿500,001–฿750,000; 20% on ฿750,001–฿1,000,000; 25% on ฿1,000,001–฿2,000,000; 30% on ฿2,000,001–฿5,000,000; 35% above ฿5,000,000. Taxable income = gross income − 50% standard deduction (max ฿100,000) − ฿60,000 personal allowance.',
    },
    {
      q: 'What is the Social Security Fund (SSF) rate in Thailand?',
      a: 'Employees contribute 5% of salary to the Social Security Fund, capped at ฿750/month (฿15,000 salary ceiling).',
    },
    {
      q: 'What is the tax-free income threshold in Thailand?',
      a: 'After applying the 50% standard deduction (max ฿100,000) and ฿60,000 personal allowance, the effective tax-free threshold is ฿150,000 of net taxable income, meaning most employees earning under roughly ₿310,000/year pay no income tax.',
    },
    {
      q: 'How are non-residents taxed in Thailand?',
      a: 'Non-residents are subject to the same progressive PIT rates (0%–35%) but are generally not entitled to the standard deduction and personal allowance.',
    },
  ],
  vietnam: [
    {
      q: 'How is personal income tax calculated in Vietnam in 2025?',
      a: 'Vietnam PIT applies progressive monthly brackets: 5% on ₫0–₫5M; 10% on ₫5M–₫10M; 15% on ₫10M–₫18M; 20% on ₫18M–₫32M; 25% on ₫32M–₫52M; 30% on ₫52M–₫80M; 35% above ₫80M. Taxable income = gross salary − social insurance (8%) − health insurance (1.5%) − unemployment insurance (1%) − ₫11,000,000 personal deduction.',
    },
    {
      q: 'What are the social insurance rates in Vietnam for employees?',
      a: 'Employees contribute 8% for social insurance, 1.5% for health insurance, and 1% for unemployment insurance — a total of 10.5% of monthly salary, capped at 20× the base salary (₫36,000,000/month in 2025).',
    },
    {
      q: 'What is the personal deduction for PIT in Vietnam?',
      a: 'The personal deduction is ₫11,000,000 per month (₫132,000,000/year). Each dependent adds ₫4,400,000/month.',
    },
    {
      q: 'How are non-residents taxed in Vietnam?',
      a: 'Non-residents pay a flat 20% withholding tax on Vietnam-sourced income, with no deductions applied.',
    },
  ],
  indonesia: [
    {
      q: 'How is PPh 21 income tax calculated in Indonesia in 2025?',
      a: 'Indonesia PPh 21 uses annual progressive brackets: 5% on Rp0–Rp60M; 15% on Rp60M–Rp250M; 25% on Rp250M–Rp500M; 30% on Rp500M–Rp5B; 35% above Rp5B. Taxable income = annual gross − PTKP (Rp54,000,000 for a single individual) − BPJS contributions.',
    },
    {
      q: 'What is PTKP in Indonesia?',
      a: 'PTKP (Penghasilan Tidak Kena Pajak) is the non-taxable income threshold. For a single individual with no dependents it is Rp54,000,000/year. Married individuals and each dependent add additional allowances.',
    },
    {
      q: 'What are BPJS contribution rates in Indonesia for employees?',
      a: 'Employees pay: BPJS Kesehatan (health) 1%; BPJS JHT (old-age savings) 2%; BPJS JP (pension) 1% capped at Rp10,547,400/month salary.',
    },
    {
      q: 'How are non-resident foreigners taxed in Indonesia?',
      a: 'Non-resident foreign employees are subject to a flat 20% withholding tax on Indonesia-sourced income, without PTKP deductions.',
    },
  ],
};

function buildJsonLd(slug: string, seo: { title: string; description: string }) {
  const url = `${BASE_URL}/${slug}`;
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seo.title,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: seo.description,
    url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ[slug].map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return [appSchema, faqSchema];
}

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  const seo = SEO[slug];
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/seatax/${slug}`,
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: `https://rafseb.github.io/seatax/${slug}`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();
  const seo = SEO[slug];

  const jsonLd = buildJsonLd(slug, seo);

  return (
    <div>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{seo.heading}</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{seo.intro}</p>
      </div>
      <TaxCalculator country={country} />
    </div>
  );
}

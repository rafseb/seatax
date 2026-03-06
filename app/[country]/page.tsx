import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, COUNTRIES } from "@/lib/countries";
import TaxCalculator from "@/components/TaxCalculator";

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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{seo.heading}</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{seo.intro}</p>
      </div>
      <TaxCalculator country={country} />
    </div>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
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
  malaysia: {
    title: 'Malaysia Income Tax Calculator 2024 — Net Salary & EPF Contributions',
    description:
      'Free Malaysia income tax calculator for YA 2024. Enter your gross salary to see net take-home pay after income tax (0%–30% progressive rates), EPF contributions (11%), SOCSO (0.5%, capped RM5,000/month), and EIS (0.2%). Includes personal relief (RM9,000) and EPF tax relief (up to RM4,000). Supports resident and expat modes.',
    heading: 'Malaysia Income Tax Calculator (YA 2024)',
    intro:
      'Calculate your net take-home pay under Malaysia\'s YA 2024 income tax rates. ' +
      'Progressive brackets from 0% to 30% apply to chargeable income after personal relief (RM9,000) ' +
      'and EPF tax relief (up to RM4,000). Mandatory contributions: EPF at 11%, ' +
      'SOCSO at 0.5% and EIS at 0.2% (both capped at RM5,000/month). ' +
      'Non-residents pay a flat 30% withholding tax.',
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
  malaysia: [
    {
      q: 'How is income tax calculated in Malaysia for YA 2024?',
      a: 'Chargeable income is taxed at progressive rates: 0% up to RM5,000; 1% on RM5,001–RM20,000; 3% on RM20,001–RM35,000; 8% on RM35,001–RM50,000; 13% on RM50,001–RM70,000; 21% on RM70,001–RM100,000; 24% on RM100,001–RM400,000; 24.5% on RM400,001–RM600,000; 25% on RM600,001–RM2,000,000; 30% above RM2,000,000. Chargeable income = gross income minus personal relief (RM9,000) and other approved reliefs.',
    },
    {
      q: 'What are the EPF contribution rates in Malaysia?',
      a: 'Employees contribute 11% of monthly salary to EPF (Employees Provident Fund). There is no salary ceiling for EPF contributions. Employers contribute an additional 12% (or 13% for salaries below RM5,000). Up to RM4,000 of employee EPF contributions can be claimed as a tax relief.',
    },
    {
      q: 'What are SOCSO and EIS and do they apply to expats?',
      a: 'SOCSO (Social Security Organisation) provides work injury and invalidity coverage at 0.5% employee contribution, capped at RM5,000/month salary. EIS (Employment Insurance System) provides unemployment benefits at 0.2%, also capped at RM5,000/month. Both generally apply to Employment Pass holders working for Malaysian employers. Neither is deductible for income tax purposes.',
    },
    {
      q: 'What is the tax rate for non-residents in Malaysia?',
      a: 'Non-residents (present fewer than 182 days in Malaysia in a year) are taxed at a flat 30% on all Malaysia-sourced employment income. No personal reliefs, EPF deductions, or progressive brackets apply.',
    },
  ],
};

const GUIDE: Record<string, { sections: { heading: string; body: string }[]; articleSlug: string }> = {
  philippines: {
    articleSlug: 'working-in-the-philippines-as-an-expat',
    sections: [
      {
        heading: 'Understanding Your Results',
        body: 'The calculator applies TRAIN Law brackets (0%–35%) to your annual taxable income. Three mandatory contributions are deducted before tax: SSS (Social Security System) covers sickness, disability, and retirement; PhilHealth provides health insurance coverage; and Pag-IBIG funds housing loans and provident savings. Your net take-home pay is the amount remaining after all three contributions and income tax are withheld. The effective tax rate shown is your total income tax divided by your gross salary — useful for comparing your overall tax burden across income levels or countries.',
      },
      {
        heading: 'For Expats & Remote Workers',
        body: 'Foreign nationals working in the Philippines are taxed depending on their residency status. If you are present in the Philippines for 180 days or more in a calendar year, you are treated as a non-resident alien engaged in trade or business and are taxed under the same TRAIN Law progressive brackets as residents. If you are present for fewer than 180 days, a flat 25% rate applies to Philippines-sourced gross income without any deductions. Toggle "Expat mode" in the calculator to see the flat rate calculation. Expats employed by Philippine companies are generally required to contribute to SSS, PhilHealth, and Pag-IBIG.',
      },
      {
        heading: 'Tax Filing Tips',
        body: 'If you are employed by a Philippine company, your employer withholds income tax monthly and provides you with a BIR Form 2316 at year-end. For most employees with a single employer, a substituted filing applies — meaning you do not need to file a separate annual return if your employer certifies that your taxes are correctly computed. Freelancers and those with multiple income sources must file BIR Form 1701 by April 15. All earners in the Philippines need a Tax Identification Number (TIN) from the Bureau of Internal Revenue (BIR) — registration is done at the Revenue District Office using Form 1902 (employed) or 1901 (self-employed).',
      },
    ],
  },
  thailand: {
    articleSlug: 'working-in-thailand-as-an-expat',
    sections: [
      {
        heading: 'Understanding Your Results',
        body: 'The calculator deducts the Social Security Fund (SSF) contribution (5%, capped at ฿750/month) from your gross salary, then applies the 50% employment income deduction (max ฿100,000 per year) and the ฿60,000 personal allowance to arrive at taxable income. The resulting amount is taxed at progressive PIT rates from 0% to 35%. Your effective tax rate is the percentage of total income tax relative to your gross salary — this is typically much lower than the marginal rate for most income levels, because the lower brackets apply to the first portions of your income.',
      },
      {
        heading: 'For Expats & Remote Workers',
        body: 'Thailand determines tax residency by physical presence: spending 180 days or more in Thailand during a calendar year makes you a tax resident. Tax residents benefit from the standard 50% deduction and personal allowance. Non-residents pay the same PIT rates but without these deductions. A significant rule change in January 2024 expanded the scope of foreign income that may be taxable for Thai residents: income earned from foreign sources and remitted to Thailand may now be subject to Thai PIT, regardless of when it was earned. Digital nomads and remote workers on the Thailand Privilege Card who spend more than 180 days in Thailand should seek professional advice on their foreign income exposure.',
      },
      {
        heading: 'Tax Filing Tips',
        body: 'Employed individuals in Thailand have PIT withheld monthly by their employer (Section 50(1) withholding). An annual PIT return (PND.91 for pure employment income) must be filed by March 31 of the following year at the Revenue Department or via the e-Filing portal. Self-employed individuals and those with mixed income use Form PND.90. A Thai Tax Identification Number (TIN) is required for filing — your employer typically obtains this for you, or you can register in person at the local Revenue Department Area Office. Thailand has tax treaties with over 60 countries, which may reduce your liability if you also pay taxes in your home country.',
      },
    ],
  },
  vietnam: {
    articleSlug: 'working-in-vietnam-as-an-expat',
    sections: [
      {
        heading: 'Understanding Your Results',
        body: 'Vietnam\'s PIT system deducts mandatory insurance contributions from your gross salary before applying the personal deduction and progressive tax brackets. Social insurance (8%), health insurance (1.5%), and unemployment insurance (1%) are calculated on your salary, capped at ₫36,000,000/month. After deducting these contributions and the ₫11,000,000 personal deduction, the remaining taxable income is subject to monthly progressive brackets from 5% to 35%. The result is your net take-home pay in Vietnamese Dong. Use the currency converter to see this in USD or EUR.',
      },
      {
        heading: 'For Expats & Remote Workers',
        body: 'Foreign nationals present in Vietnam for 183 days or more within a calendar year (or a 12-month period from first arrival) are tax residents, taxable on worldwide income at the same progressive brackets as Vietnamese citizens. Non-residents pay a flat 20% on gross Vietnam-sourced income with no deductions. Since December 2018, most foreign workers holding a valid work permit and working under a contract of one year or more are also subject to compulsory social insurance. The combined employee insurance burden of 10.5% is a significant factor in net take-home pay calculations for Vietnam-based workers.',
      },
      {
        heading: 'Tax Filing Tips',
        body: 'Employees at Vietnamese companies have PIT withheld monthly, with annual finalization required by March 31 using Form 02/QTT-TNCN if you have multiple income sources or if withheld tax differs from actual liability. Your employer issues a withholding certificate (Form 02/TNCN) summarizing taxes paid during the year. Freelancers and self-employed individuals register with the local District Tax Department and file quarterly. A Vietnamese tax code (mã số thuế) is required for all tax transactions — your employer usually registers you, or you can apply in person at the tax department with your passport, visa, and work permit.',
      },
    ],
  },
  indonesia: {
    articleSlug: 'working-in-indonesia-as-an-expat',
    sections: [
      {
        heading: 'Understanding Your Results',
        body: 'Indonesia\'s PPh 21 calculation starts with your gross monthly salary, subtracts BPJS employee contributions (Kesehatan 1%, JHT 2%, JP 1% — subject to salary ceilings), then annualizes the figure and subtracts the PTKP non-taxable threshold (Rp54,000,000/year for a single individual). Progressive brackets from 5% to 35% apply to the remaining annual taxable income, and the result is divided by 12 to get monthly tax. Your net take-home is gross minus BPJS contributions minus monthly income tax.',
      },
      {
        heading: 'For Expats & Remote Workers',
        body: 'Foreign nationals present in Indonesia for more than 183 days in any 12-month period, or who have the intention to reside there, are tax residents subject to the full PPh 21 calculation including the PTKP deduction and progressive brackets. Non-residents are subject to Article 26 withholding tax at a flat 20% on gross Indonesia-sourced income — no PTKP deduction applies. Indonesia launched a Digital Nomad Visa (E33G) in 2023 for remote workers earning from foreign sources. Holders who spend more than 183 days in Indonesia may technically become tax residents, though guidance on foreign-sourced digital income remains limited.',
      },
      {
        heading: 'Tax Filing Tips',
        body: 'All individuals earning income in Indonesia must register for an NPWP (Nomor Pokok Wajib Pajak) tax identification number, available online at ereg.pajak.go.id or in person at the local Tax Service Office (KPP). Employers file monthly PPh 21 withholding returns on behalf of employees. Annual individual tax returns (SPT Tahunan) are due March 31 using Form 1770S (simple, single employer) or Form 1770 (multiple income sources). The DJP Online portal (djponline.pajak.go.id) supports e-filing for most individual return types. BPJS JHT contributions (old-age savings) are refundable when you leave Indonesian employment.',
      },
    ],
  },
  malaysia: {
    articleSlug: 'working-in-malaysia-as-an-expat',
    sections: [
      {
        heading: 'Understanding Your Results',
        body: 'The calculator applies YA 2024 progressive brackets (0%–30%) to your chargeable income — that is, gross salary minus personal relief (RM9,000), EPF tax relief (up to RM4,000), and any spouse or child reliefs you have entered. EPF (11%), SOCSO (0.5%), and EIS (0.2%) are shown as separate contribution line items. Note that only EPF reduces your taxable income; SOCSO and EIS are not tax-deductible. Your effective tax rate is total deductions (tax + contributions) divided by gross salary.',
      },
      {
        heading: 'For Expats & Remote Workers',
        body: 'Foreign nationals present in Malaysia for 182 days or more in a calendar year are treated as tax residents and pay the same progressive rates with access to all personal reliefs. Those present for fewer than 182 days are non-residents and pay a flat 30% on all Malaysia-sourced employment income with no reliefs. Toggle "Expat mode" to see the flat-rate calculation. Foreign workers on Employment Passes are generally required to contribute to EPF and SOCSO. Upon leaving Malaysia permanently, EPF savings (both employee and employer contributions) are fully refundable.',
      },
      {
        heading: 'Tax Filing Tips',
        body: 'Malaysian employers withhold monthly income tax via the PCB (Potongan Cukai Bulanan) Schedular Tax Deduction system. Submit Form TP1 to your employer to claim spouse, child, and other reliefs in the monthly PCB calculation — otherwise the default single-person rate is used and you may over-withhold. Annual income tax returns (Form BE for employment income) are due by 30 April. File online via the MyTax portal (mytax.hasil.gov.my). All earners must register with LHDN and obtain a Tax Identification Number (TIN) — registration is available through the MyTax portal or in person at any LHDN branch.',
      },
    ],
  },
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
  const guide = GUIDE[slug];

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

      {guide && (
        <>
          <section className="mt-12 max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {country.name} Tax Guide
            </h2>
            <div className="space-y-6">
              {guide.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-base font-medium text-gray-800 mb-2">{section.heading}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href={`/blog/${guide.articleSlug}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Read our complete expat &amp; remote work guide for {country.name} →
              </Link>
            </div>
          </section>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQ[slug].map(({ q, a }) => (
                <details key={q} className="group border border-gray-200 rounded-lg bg-white">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium text-gray-900 list-none">
                    <span>{q}</span>
                    <span className="mt-0.5 shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

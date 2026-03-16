import type { Article } from './types';

const article: Article = {
  slug: 'working-in-indonesia-as-an-expat',
  title: 'Working in Indonesia as an Expat: Tax Guide 2025',
  description:
    'Complete guide to Indonesia PPh 21 income tax for foreigners, the 183-day residency rule, BPJS contributions, NPWP tax registration, KITAS work visa, and remote work considerations for 2025.',
  country: 'indonesia',
  publishDate: '2025-01-15',
  sections: [
    {
      heading: 'Tax Residency: The 183-Day Rule',
      body: `Indonesia's income tax system under the Income Tax Law (Undang-Undang Pajak Penghasilan) determines individual tax obligations based on residency status. A foreign national becomes a tax resident of Indonesia if they are present in Indonesia for more than 183 days within any 12-month period, or if they are present in Indonesia during a tax year and have the intention to reside there.

The "intention to reside" test means that even if you have not yet reached 183 days, you may be treated as a resident if your circumstances suggest permanent establishment — for example, having a long-term lease, family present in Indonesia, or a multi-year employment contract with an Indonesian entity.

Indonesian tax residents are taxed on worldwide income, meaning income from both Indonesian and foreign sources is potentially subject to Indonesian income tax. Non-residents — those present for fewer than 183 days without the intention to reside — are taxed only on Indonesia-sourced income at a flat withholding tax rate of 20%, with no PTKP deduction or progressive bracket calculation.

Indonesia has signed double tax avoidance agreements (P3B) with approximately 70 countries. If your home country has a tax treaty with Indonesia, you may be able to claim reduced withholding rates or exemptions on certain types of income. The Directorate General of Taxes (DJP) administers treaty benefits — claiming them typically requires a Certificate of Domicile (SKD) from your home country's tax authority.`,
    },
    {
      heading: 'PPh 21 Income Tax for Foreign Workers',
      body: `Income tax withheld from employees in Indonesia is governed by Article 21 of the Income Tax Law, commonly known as PPh 21. For tax residents, PPh 21 applies progressive annual brackets to taxable income after subtracting the PTKP (non-taxable income threshold) and certain deductions.

For 2025, the PTKP for a single individual with no dependents is Rp54,000,000/year. A married individual receives an additional Rp4,500,000/year, and each dependent adds another Rp4,500,000/year (up to three dependents).

After subtracting the PTKP, the remaining net income is taxed at progressive rates: 5% on annual net taxable income up to Rp60,000,000; 15% on Rp60,000,001–Rp250,000,000; 25% on Rp250,000,001–Rp500,000,000; 30% on Rp500,000,001–Rp5,000,000,000; and 35% on income above Rp5,000,000,000.

Taxable income for employees is calculated as annual gross salary minus BPJS employee contributions minus the PTKP threshold. Importantly, a position cost allowance (biaya jabatan) of 5% of gross income, capped at Rp500,000/month (Rp6,000,000/year), was historically deductible, but this was standardized into the calculation methodology — your employer's payroll system should handle this automatically.

For non-resident foreigners, a flat 20% withholding tax applies to gross Indonesia-sourced income without any PTKP or bracket calculation. This is Article 26 withholding tax (PPh Pasal 26). Treaty relief may reduce this rate for qualifying income types.`,
    },
    {
      heading: 'BPJS Contributions for Expats',
      body: `BPJS (Badan Penyelenggara Jaminan Sosial) is Indonesia's social security agency, split into two bodies: BPJS Ketenagakerjaan (employment/labor social security) and BPJS Kesehatan (national health insurance).

Foreign nationals working in Indonesia under a formal employment arrangement are required to enroll in BPJS Ketenagakerjaan. This covers three programs with the following employee contribution rates for 2025: JKN-KIS (BPJS Kesehatan, national health) at 1% of salary, capped at a salary ceiling of around Rp12,000,000/month; JHT (Jaminan Hari Tua, old-age savings) at 2% of salary; and JP (Jaminan Pensiun, pension) at 1% of salary, capped at the JP salary ceiling of Rp10,547,400/month.

Employers contribute significantly more: 4% for JKN-KIS (health), 3.7% for JHT, 2% for JP, plus accident insurance (JKK) at 0.24%–1.74% depending on job risk category, and death insurance (JKM) at 0.3%. The total employer burden can reach 10%–12% of salary on top of the employee's gross.

BPJS Kesehatan enrollment provides access to Indonesia's tiered healthcare system — from Puskesmas (community health centers) through to hospitals. Many expats supplement this with private international health insurance for access to private hospitals and international coverage, as the BPJS system, while improving, has limitations in terms of waiting times and facility quality at lower tiers.

Upon departure from Indonesia, JHT (old-age savings) contributions are refundable. Expats can apply for a lump-sum JHT withdrawal after resigning from Indonesian employment, regardless of age.`,
    },
    {
      heading: 'NPWP Tax Registration in Indonesia',
      body: `Every individual earning income in Indonesia — including foreign nationals — is required to register with the Directorate General of Taxes (DJP) and obtain a Nomor Pokok Wajib Pajak (NPWP), Indonesia's Tax Identification Number. The NPWP is a 15-digit number and serves as your primary identifier for all tax filings, payments, and correspondence with the DJP.

For employed foreigners, the employer typically facilitates NPWP registration as part of the onboarding process, since they need the number to file PPh 21 withholding returns. However, the legal obligation to register rests with the individual.

Registration can be done online through the DJP's ereg system (ereg.pajak.go.id) or in person at the nearest Tax Service Office (Kantor Pelayanan Pajak — KPP). Required documents for foreigners typically include a valid passport, KITAS (temporary residence permit), and a letter from your employer or evidence of income.

Once registered, you are required to file an annual individual income tax return (SPT Tahunan PPh OP) using Form 1770S (for employees with a single employer and income under Rp60M) or Form 1770 (for those with multiple income sources, self-employment, or income above Rp60M). The deadline is March 31 for salaried employees. Failure to file carries a penalty of Rp100,000 for individuals.

The DJP has significantly digitized its services through the DJP Online portal (djponline.pajak.go.id), which allows online filing, payment, and tax clearance certificates — the latter being required for certain visa renewals.`,
    },
    {
      heading: 'Remote Work and the KITAS Visa',
      body: `Indonesia offers several long-term stay options for foreign nationals. The most common for workers is the KITAS (Kartu Izin Tinggal Terbatas — Temporary Stay Permit Card), which comes in various categories including KITAS for employment (KITAS kerja, requiring a sponsor/employer), KITAS for family reunification, and the investor KITAS.

Working in Indonesia without a valid KITAS and work permit (RPTKA + IMTA) is a violation of Indonesian immigration law and can result in deportation and a re-entry ban. The Ministry of Manpower (Kemnaker) manages work permit approvals, which must be obtained by the employing company before the foreign worker arrives.

Indonesia launched a Digital Nomad Visa in 2023, targeting remote workers who earn income from outside Indonesia. Known as the Second Home Visa or the E33G remote worker visa, this option allows stays of up to 5–10 years but comes with a requirement to demonstrate sufficient foreign income and assets. Crucially, holders are expected to earn income from non-Indonesian sources — they are not permitted to work for Indonesian clients or entities.

From a tax perspective, digital nomad visa holders who spend more than 183 days in Indonesia may technically become tax residents. However, if income is entirely foreign-sourced and not remitted for work done for Indonesian entities, the practical enforcement risk remains low. Indonesia's tax authority has not yet issued comprehensive guidance specifically addressing the digital nomad visa and tax residency — making professional advice essential before committing to a long stay.`,
    },
    {
      heading: 'Cost of Living Context',
      body: `Indonesia is a geographically vast archipelago with enormous variation in living costs between islands and cities. Jakarta, the capital, has seen rapid cost-of-living increases due to urbanization and infrastructure development, but remains substantially cheaper than Singapore or Hong Kong.

A comfortable expat lifestyle in Jakarta — modern apartment in South Jakarta (Kemang, SCBD, or Senayan), regular dining at mid-range restaurants, gym membership, and private car or Grab usage — typically costs between Rp15,000,000 and Rp35,000,000 per month (roughly USD 950–2,200). Families with international school fees for children can add Rp20,000,000–Rp50,000,000/month or more.

Bali, particularly Canggu, Seminyak, and Ubud, has become a significant hub for digital nomads and creative professionals. Bali's living costs have risen sharply in recent years with increased expat demand, but a comfortable lifestyle still runs Rp10,000,000–Rp25,000,000/month (USD 630–1,570). Co-working spaces are abundant and high-quality internet is increasingly available.

Other cities like Surabaya, Bandung, and Yogyakarta offer substantially lower living costs than Jakarta or Bali, with the trade-off of smaller expat communities and fewer amenities tailored to foreign residents.

The Indonesian Rupiah (IDR) trades at approximately Rp15,000–Rp16,500 per US Dollar. Use the currency converter in our calculator to translate your net Indonesian salary into USD, EUR, or GBP for comparison with home-country compensation packages.`,
    },
  ],
  faqs: [
    {
      q: 'When do foreigners become tax residents in Indonesia?',
      a: 'Foreign nationals become Indonesian tax residents after being present in Indonesia for more than 183 days within any 12-month period, or earlier if they demonstrate the intention to reside permanently (e.g., long-term lease, family in Indonesia). Tax residents are taxed on worldwide income at progressive rates (5%–35%) after the PTKP deduction.',
    },
    {
      q: 'What is PTKP and how does it affect foreign workers?',
      a: 'PTKP (Penghasilan Tidak Kena Pajak) is the non-taxable income threshold. For a single individual in 2025, it is Rp54,000,000/year. Tax residents subtract PTKP before applying progressive brackets. Non-residents are not entitled to PTKP and pay a flat 20% on gross income.',
    },
    {
      q: 'Can foreign workers claim BPJS contributions back when leaving Indonesia?',
      a: 'Yes. The JHT (old-age savings) portion of BPJS Ketenagakerjaan can be withdrawn as a lump sum when you resign from Indonesian employment. This applies regardless of age. The JP (pension) funds are subject to different rules and may only be accessible at retirement age.',
    },
    {
      q: 'Do digital nomad visa holders in Indonesia pay income tax?',
      a: 'If a digital nomad visa holder spends more than 183 days in Indonesia, they may technically become a tax resident. If income is entirely foreign-sourced from non-Indonesian clients, the practical risk is limited, but Indonesia has not issued clear guidance on this. Professional advice is recommended.',
    },
  ],
};

export default article;

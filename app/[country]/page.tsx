import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCountry, COUNTRIES } from "@/lib/countries";
import { breadcrumbList } from "@/lib/seo";
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
    title: 'Philippines Income Tax Calculator 2026 — Net Salary & TRAIN Law',
    description:
      'Free Philippines income tax calculator for 2026. Enter your gross salary to see net take-home pay after income tax (TRAIN Law brackets 0%–35%), SSS (5%), PhilHealth (2.5%), and Pag-IBIG contributions. Supports resident and expat modes.',
    heading: 'Philippines Income Tax Calculator (2026)',
    intro:
      'Calculate your net take-home pay under the TRAIN Law (Republic Act 10963). ' +
      'Covers income tax brackets from 0% to 35%, SSS (5%, capped at ₱35,000/month), ' +
      'PhilHealth (2.5%), and Pag-IBIG (2%, max ₱200/month). ' +
      'Switch to expat mode for the flat 25% non-resident rate.',
  },
  thailand: {
    title: 'Thailand Income Tax Calculator 2026 — Net Salary & PIT Brackets',
    description:
      'Free Thailand personal income tax (PIT) calculator for 2026. Enter your gross salary to see net take-home pay after PIT (0%–35%), standard deduction (50%, max ฿100,000), personal allowance (฿60,000), and Social Security Fund (SSF) contributions.',
    heading: 'Thailand Income Tax Calculator (2026)',
    intro:
      'Calculate your net take-home pay under Thailand\'s personal income tax (PIT) system. ' +
      'Applies progressive rates from 0% to 35% on taxable income after a 50% standard deduction ' +
      '(max ฿100,000) and ฿60,000 personal allowance. ' +
      'Includes Social Security Fund (SSF) at 5%, capped at ฿875/month (salary ceiling ฿17,500 from January 2026). ' +
      'Non-residents pay the same progressive rates without deductions.',
  },
  vietnam: {
    title: 'Vietnam Income Tax Calculator 2026 — Net Salary & PIT Brackets',
    description:
      'Free Vietnam personal income tax (PIT) calculator for 2026. See net take-home pay under the new 5-bracket PIT law (5%–35% monthly brackets), social insurance (8%), health insurance (1.5%), unemployment insurance (1%), and the ₫15,500,000 personal deduction.',
    heading: 'Vietnam Income Tax Calculator (2026)',
    intro:
      'Calculate your net take-home pay under Vietnam\'s amended personal income tax (PIT) law, ' +
      'effective for the 2026 tax year. Five monthly progressive brackets from 5% to 35% apply ' +
      'after deducting social insurance (8%) and health insurance (1.5%) — capped at ₫50,600,000/month — ' +
      'unemployment insurance (1%), and the ₫15,500,000 personal deduction. ' +
      'Non-residents pay a flat 20% on Vietnam-sourced income.',
  },
  indonesia: {
    title: 'Indonesia PPh 21 Tax Calculator 2026 — Net Salary & Income Tax',
    description:
      'Free Indonesia PPh 21 income tax calculator for 2026. Enter your gross salary to see net take-home pay after income tax (5%–35%), PTKP non-taxable threshold (Rp54,000,000/year), BPJS Kesehatan (1%), BPJS JHT (2%), and BPJS JP (1%) pension contributions.',
    heading: 'Indonesia Income Tax Calculator — PPh 21 (2026)',
    intro:
      'Calculate your net take-home pay under Indonesia\'s PPh 21 income tax law. ' +
      'Progressive brackets from 5% to 35% apply after subtracting the PTKP non-taxable threshold ' +
      '(Rp54,000,000/year for a single individual) and BPJS contributions: ' +
      'Kesehatan (1%), JHT Old-Age savings (2%), and JP Pension (1%, capped at Rp11,086,300/month). ' +
      'Non-residents pay a flat 20% withholding tax.',
  },
  malaysia: {
    title: 'Malaysia Income Tax Calculator 2026 — Net Salary & EPF Contributions',
    description:
      'Free Malaysia income tax calculator for YA 2026. Enter your gross salary to see net take-home pay after income tax (0%–30% progressive rates), EPF contributions (11%), SOCSO (0.5%, capped RM6,000/month), and EIS (0.2%). Includes personal relief (RM9,000) and EPF tax relief (up to RM4,000). Supports resident and expat modes.',
    heading: 'Malaysia Income Tax Calculator (YA 2026)',
    intro:
      'Calculate your net take-home pay under Malaysia\'s YA 2026 income tax rates. ' +
      'Progressive brackets from 0% to 30% apply to chargeable income after personal relief (RM9,000) ' +
      'and EPF tax relief (up to RM4,000). Mandatory contributions: EPF at 11%, ' +
      'SOCSO at 0.5% and EIS at 0.2% (both capped at RM6,000/month). ' +
      'Non-residents pay a flat 30% withholding tax.',
  },
};

const FAQ: Record<string, { q: string; a: string }[]> = {
  philippines: [
    {
      q: 'How is income tax calculated in the Philippines in 2026?',
      a: 'Under the TRAIN Law (RA 10963), annual taxable income up to ₱250,000 is tax-free. Income from ₱250,001 to ₱400,000 is taxed at 15%; ₱400,001–₱800,000 at 20%; ₱800,001–₱2,000,000 at 25%; ₱2,000,001–₱8,000,000 at 30%; and above ₱8,000,000 at 35%.',
    },
    {
      q: 'What is the SSS contribution rate in the Philippines for 2026?',
      a: 'The employee SSS contribution rate is 5% of monthly salary credit, capped at a ₱35,000 salary ceiling (max contribution ₱1,750/month).',
    },
    {
      q: 'How much is PhilHealth contribution in 2026?',
      a: 'PhilHealth premium is 5% of basic monthly salary, with the employee shoulder 2.5%. The salary floor is ₱10,000 and ceiling is ₱100,000.',
    },
    {
      q: 'What is the Pag-IBIG contribution rate?',
      a: 'Employees contribute 2% of monthly compensation to Pag-IBIG, capped at ₱200/month (₱10,000 salary ceiling).',
    },
    {
      q: 'What salary is tax-free in the Philippines?',
      a: 'Annual taxable income up to ₱250,000 — roughly ₱20,833 per month — is completely exempt from income tax under the TRAIN Law. Because mandatory SSS, PhilHealth, and Pag-IBIG contributions are excluded from taxable income, a slightly higher gross salary can still result in zero income tax.',
    },
    {
      q: 'Is 13th month pay taxable in the Philippines?',
      a: '13th month pay and other benefits (bonuses, incentives) are tax-exempt up to a combined ₱90,000 per year. Only the amount exceeding ₱90,000 is added to your taxable income.',
    },
    {
      q: 'How much tax do I pay on a ₱50,000 monthly salary in the Philippines?',
      a: 'On a ₱50,000 monthly salary (₱600,000 per year), income tax is roughly ₱5,200 per month and mandatory contributions come to about ₱3,950 (SSS ₱2,500, PhilHealth ₱1,250, Pag-IBIG ₱200), leaving an approximate take-home pay of ₱40,850. Enter your exact salary in the calculator above for a precise breakdown.',
    },
    {
      q: 'Do freelancers pay income tax in the Philippines?',
      a: 'Yes. Self-employed individuals and freelancers earning above ₱250,000 per year must register with the BIR and can choose between the graduated TRAIN Law rates or a simplified flat 8% tax on gross receipts above ₱250,000 (in lieu of both income tax and percentage tax).',
    },
  ],
  thailand: [
    {
      q: 'How is personal income tax calculated in Thailand in 2026?',
      a: 'Thailand PIT uses progressive rates: 0% on the first ฿150,000; 5% on ฿150,001–฿300,000; 10% on ฿300,001–฿500,000; 15% on ฿500,001–฿750,000; 20% on ฿750,001–฿1,000,000; 25% on ฿1,000,001–฿2,000,000; 30% on ฿2,000,001–฿5,000,000; 35% above ฿5,000,000. Taxable income = gross income − 50% standard deduction (max ฿100,000) − ฿60,000 personal allowance.',
    },
    {
      q: 'What is the Social Security Fund (SSF) rate in Thailand?',
      a: 'Employees contribute 5% of salary to the Social Security Fund, capped at ฿875/month (฿17,500 salary ceiling, raised from ฿15,000 in January 2026).',
    },
    {
      q: 'What is the tax-free income threshold in Thailand?',
      a: 'After applying the 50% standard deduction (max ฿100,000) and ฿60,000 personal allowance, the effective tax-free threshold is ฿150,000 of net taxable income, meaning most employees earning under roughly ₿310,000/year pay no income tax.',
    },
    {
      q: 'How are non-residents taxed in Thailand?',
      a: 'Non-residents are subject to the same progressive PIT rates (0%–35%) but are generally not entitled to the standard deduction and personal allowance.',
    },
    {
      q: 'How much take-home pay is ฿100,000 per month in Thailand?',
      a: 'On a ฿100,000 monthly salary, income tax is roughly ฿10,200 per month and the Social Security Fund contribution is ฿875, leaving an approximate take-home pay of ฿88,900 for a tax resident with standard deductions. Use the calculator above for your exact figure.',
    },
    {
      q: 'Is foreign income taxable in Thailand?',
      a: 'Since January 2024, Thai tax residents (180+ days in Thailand) who remit foreign-sourced income into Thailand may owe Thai PIT on it, regardless of the year it was earned. Income kept offshore is generally not taxed. Digital nomads spending most of the year in Thailand should review their remittances carefully.',
    },
    {
      q: 'When is the tax filing deadline in Thailand?',
      a: 'The annual personal income tax return (Form PND.91 for employment income) is due by March 31 of the following year, with a short extension typically granted for online filing via the Revenue Department e-Filing portal.',
    },
  ],
  vietnam: [
    {
      q: 'How is personal income tax calculated in Vietnam in 2026?',
      a: 'From the 2026 tax year Vietnam PIT applies five progressive monthly brackets: 5% on ₫0–₫10M; 10% on ₫10M–₫30M; 20% on ₫30M–₫60M; 30% on ₫60M–₫100M; 35% above ₫100M. Taxable income = gross salary − social insurance (8%) − health insurance (1.5%) − unemployment insurance (1%) − ₫15,500,000 personal deduction.',
    },
    {
      q: 'What are the social insurance rates in Vietnam for employees?',
      a: 'Employees contribute 8% for social insurance, 1.5% for health insurance, and 1% for unemployment insurance — a total of 10.5% of monthly salary. SI and HI are capped at 20× the reference salary (₫50,600,000/month from July 2026); UI is capped at 20× the regional minimum wage (₫106,200,000/month in Region I).',
    },
    {
      q: 'What is the personal deduction for PIT in Vietnam?',
      a: 'From the 2026 tax year the personal deduction is ₫15,500,000 per month (₫186,000,000/year). Each dependent adds ₫6,200,000/month.',
    },
    {
      q: 'How are non-residents taxed in Vietnam?',
      a: 'Non-residents pay a flat 20% withholding tax on Vietnam-sourced income, with no deductions applied.',
    },
    {
      q: 'How much take-home pay is ₫30,000,000 per month in Vietnam?',
      a: 'On a ₫30,000,000 monthly salary, insurance contributions total about ₫3,150,000 (10.5%) and income tax about ₫635,000, leaving an approximate take-home pay of ₫26,200,000 for a single tax resident. Enter your salary in the calculator above for an exact breakdown.',
    },
    {
      q: 'Is 13th month salary taxable in Vietnam?',
      a: 'Yes. The 13th month salary and other bonuses are treated as ordinary employment income and taxed at the progressive PIT rates in the month they are paid. Unlike the Philippines, Vietnam has no tax-exempt bonus threshold.',
    },
    {
      q: 'Do foreign workers pay social insurance in Vietnam?',
      a: 'Yes. Since 2018, foreign employees with a work permit and a Vietnamese labor contract of one year or more are subject to compulsory social insurance and health insurance, giving a combined employee contribution of 9.5% (foreigners are exempt from the 1% unemployment insurance).',
    },
  ],
  indonesia: [
    {
      q: 'How is PPh 21 income tax calculated in Indonesia in 2026?',
      a: 'Indonesia PPh 21 uses annual progressive brackets: 5% on Rp0–Rp60M; 15% on Rp60M–Rp250M; 25% on Rp250M–Rp500M; 30% on Rp500M–Rp5B; 35% above Rp5B. Taxable income = annual gross − PTKP (Rp54,000,000 for a single individual) − BPJS contributions.',
    },
    {
      q: 'What is PTKP in Indonesia?',
      a: 'PTKP (Penghasilan Tidak Kena Pajak) is the non-taxable income threshold. For a single individual with no dependents it is Rp54,000,000/year. Married individuals and each dependent add additional allowances.',
    },
    {
      q: 'What are BPJS contribution rates in Indonesia for employees?',
      a: 'Employees pay: BPJS Kesehatan (health) 1%; BPJS JHT (old-age savings) 2%; BPJS JP (pension) 1% capped at Rp11,086,300/month salary (from March 2026).',
    },
    {
      q: 'How are non-resident foreigners taxed in Indonesia?',
      a: 'Non-resident foreign employees are subject to a flat 20% withholding tax on Indonesia-sourced income, without PTKP deductions.',
    },
    {
      q: 'How much take-home pay is Rp10,000,000 per month in Indonesia?',
      a: 'On a Rp10,000,000 monthly salary, BPJS employee contributions total about Rp400,000 (4%) and income tax about Rp265,000, leaving an approximate take-home pay of Rp9,300,000 for a single tax resident. Use the calculator above for your exact figure.',
    },
    {
      q: 'Is THR (religious holiday allowance) taxable in Indonesia?',
      a: 'Yes. THR — the mandatory 13th-salary equivalent paid before the religious holiday — is treated as ordinary employment income and is subject to PPh 21 at the progressive rates.',
    },
    {
      q: 'Do I need an NPWP to work in Indonesia?',
      a: 'Yes. All individuals earning income in Indonesia should register for an NPWP tax identification number. Without one, the PPh 21 withheld from your salary is surcharged by 20% (i.e. 120% of the normal rate), so registering promptly saves money.',
    },
    {
      q: 'Does Indonesia’s digital nomad visa make me tax-free?',
      a: 'The E33G remote worker visa targets nomads employed by companies outside Indonesia. Holders who stay more than 183 days in a 12-month period can still become Indonesian tax residents under domestic law, so long stays should be planned with professional advice — the visa itself is not a blanket tax exemption.',
    },
  ],
  malaysia: [
    {
      q: 'How is income tax calculated in Malaysia for YA 2026?',
      a: 'Chargeable income is taxed at progressive rates: 0% up to RM5,000; 1% on RM5,001–RM20,000; 3% on RM20,001–RM35,000; 8% on RM35,001–RM50,000; 13% on RM50,001–RM70,000; 21% on RM70,001–RM100,000; 24% on RM100,001–RM400,000; 24.5% on RM400,001–RM600,000; 25% on RM600,001–RM2,000,000; 30% above RM2,000,000. Chargeable income = gross income minus personal relief (RM9,000) and other approved reliefs.',
    },
    {
      q: 'What are the EPF contribution rates in Malaysia?',
      a: 'Employees contribute 11% of monthly salary to EPF (Employees Provident Fund). There is no salary ceiling for EPF contributions. Employers contribute an additional 12% (or 13% for salaries below RM5,000). Up to RM4,000 of employee EPF contributions can be claimed as a tax relief.',
    },
    {
      q: 'What are SOCSO and EIS and do they apply to expats?',
      a: 'SOCSO (Social Security Organisation) provides work injury and invalidity coverage at 0.5% employee contribution, capped at RM6,000/month salary. EIS (Employment Insurance System) provides unemployment benefits at 0.2%, also capped at RM6,000/month. Both generally apply to Employment Pass holders working for Malaysian employers. Neither is deductible for income tax purposes.',
    },
    {
      q: 'What is the tax rate for non-residents in Malaysia?',
      a: 'Non-residents (present fewer than 182 days in Malaysia in a year) are taxed at a flat 30% on all Malaysia-sourced employment income. No personal reliefs, EPF deductions, or progressive brackets apply.',
    },
    {
      q: 'How much take-home pay is RM8,000 per month in Malaysia?',
      a: 'On an RM8,000 monthly salary, a tax resident pays roughly RM590 in monthly income tax plus RM880 EPF, about RM30 SOCSO, and RM12 EIS, leaving an approximate take-home pay of RM6,480. Enter your exact salary in the calculator above for a precise breakdown.',
    },
    {
      q: 'Can foreigners withdraw their EPF when leaving Malaysia?',
      a: 'Yes. Foreign workers who leave Malaysia permanently can withdraw their full EPF balance — both employee and employer contributions plus dividends — and the withdrawal is not taxed.',
    },
    {
      q: 'Is foreign-sourced income taxable in Malaysia?',
      a: 'Foreign-sourced income received in Malaysia by resident individuals is generally exempt from tax (an exemption currently extended to the end of 2036, subject to conditions such as the income having been subjected to tax abroad). Income earned in Malaysia is always taxable.',
    },
    {
      q: 'What is PCB (Potongan Cukai Bulanan)?',
      a: 'PCB, also called MTD (Monthly Tax Deduction), is Malaysia’s pay-as-you-earn withholding system: your employer deducts estimated income tax from each month’s salary and remits it to LHDN. Submitting Form TP1 for your reliefs keeps the monthly deduction close to your true liability.',
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
        body: 'The calculator deducts the Social Security Fund (SSF) contribution (5%, capped at ฿875/month) from your gross salary, then applies the 50% employment income deduction (max ฿100,000 per year) and the ฿60,000 personal allowance to arrive at taxable income. The resulting amount is taxed at progressive PIT rates from 0% to 35%. Your effective tax rate is the percentage of total income tax relative to your gross salary — this is typically much lower than the marginal rate for most income levels, because the lower brackets apply to the first portions of your income.',
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
        body: 'Vietnam\'s PIT system deducts mandatory insurance contributions from your gross salary before applying the personal deduction and progressive tax brackets. Social insurance (8%) and health insurance (1.5%) are calculated on your salary capped at ₫50,600,000/month, and unemployment insurance (1%) on salary capped at ₫106,200,000/month. After deducting these contributions and the ₫15,500,000 personal deduction, the remaining taxable income is subject to the five monthly progressive brackets (5% to 35%) of the 2026 PIT law. The result is your net take-home pay in Vietnamese Dong. Use the currency converter to see this in USD or EUR.',
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
        body: 'The calculator applies YA 2026 progressive brackets (0%–30%) to your chargeable income — that is, gross salary minus personal relief (RM9,000), EPF tax relief (up to RM4,000), and any spouse or child reliefs you have entered. EPF (11%), SOCSO (0.5%), and EIS (0.2%) are shown as separate contribution line items. Note that only EPF reduces your taxable income; SOCSO and EIS are not tax-deductible. Your effective tax rate is total deductions (tax + contributions) divided by gross salary.',
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

function buildJsonLd(slug: string, name: string, seo: { title: string; description: string }) {
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
  const breadcrumbSchema = breadcrumbList([
    { name: `${name} Tax Calculator`, path: `/${slug}` },
  ]);
  return [appSchema, faqSchema, breadcrumbSchema];
}

export const dynamicParams = false;

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
      url: `/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
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

  const jsonLd = buildJsonLd(slug, country.name, seo);

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
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--cream)' }}>{seo.heading}</h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--forest-300)' }}>{seo.intro}</p>
      </div>
      <TaxCalculator country={country} />

      {guide && (
        <>
          <section className="mt-12 max-w-3xl">
            <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--cream)' }}>
              {country.name} Tax Guide
            </h2>
            <div className="space-y-6">
              {guide.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-base font-medium mb-2" style={{ color: 'var(--gold-400)' }}>{section.heading}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-200)' }}>{section.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <Link
                href={`/resources/guides/${guide.articleSlug}`}
                className="nav-link text-sm font-medium hover:underline block"
              >
                Read our complete expat &amp; remote work guide for {country.name} →
              </Link>
              <Link
                href="/compare"
                className="nav-link text-sm font-medium hover:underline block"
              >
                Compare {country.name} with another country →
              </Link>
            </div>
          </section>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {FAQ[slug].map(({ q, a }) => (
                <details key={q} className="group rounded-lg" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)' }}>
                  <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium list-none" style={{ color: 'var(--cream)' }}>
                    <span>{q}</span>
                    <span className="mt-0.5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--forest-400)' }}>
                      ▾
                    </span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: 'var(--forest-200)', borderTop: '1px solid var(--forest-700)' }}>{a}</div>
                </details>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

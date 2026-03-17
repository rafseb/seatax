import type { Article } from './types';

const article: Article = {
  slug: 'working-in-malaysia-as-an-expat',
  title: 'Working in Malaysia as an Expat: Tax Guide 2024',
  description:
    'Complete guide to Malaysia income tax for foreigners, the 182-day residency rule, EPF, SOCSO and EIS contributions, tax reliefs and deductions, MyTax registration, and cost of living in Kuala Lumpur for 2024.',
  country: 'malaysia',
  publishDate: '2025-01-15',
  sections: [
    {
      heading: 'Tax Residency: The 182-Day Rule',
      body: `Malaysia's income tax system, administered by the Inland Revenue Board (Lembaga Hasil Dalam Negeri — LHDN), determines tax obligations based on residency status. A foreign national is treated as a Malaysian tax resident in a calendar year if they are physically present in Malaysia for 182 days or more in that year.

There is also a secondary test: if you are present in Malaysia for fewer than 182 days in a given year but your stay is linked to a period of at least 182 consecutive days spanning two calendar years (excluding temporary absences for business, illness, or social visits outside Malaysia), you may still qualify as a resident.

Malaysian tax residents are taxed on Malaysian-sourced income only — Malaysia operates a territorial tax system. Foreign-sourced income remitted into Malaysia was exempt until 2022; from 1 January 2022, foreign-sourced income received in Malaysia by residents is subject to tax (with some transitional exemptions for certain categories). However, for most salaried employees working for a Malaysian employer, the practical impact is primarily on local employment income.

Non-residents — those present for fewer than 182 days — are taxed at a flat rate of 30% on all Malaysian-sourced income, with no access to personal reliefs, tax deductions, or progressive brackets. This flat rate applies regardless of income level.

Malaysia has double taxation agreements (DTAs) with over 70 countries. If your home country has a DTA with Malaysia, you may be entitled to exemptions or reduced withholding rates on certain income types. Claiming DTA benefits typically requires a Certificate of Tax Residence from your home country's tax authority.`,
    },
    {
      heading: 'Income Tax for Employees (YA 2024 Rates)',
      body: `Individual income tax in Malaysia is assessed on a Year of Assessment (YA) basis corresponding to the calendar year. For resident employees, the progressive tax brackets for YA 2024 apply to chargeable income — that is, gross employment income minus approved deductions and personal reliefs.

The YA 2024 tax brackets for residents are: 0% on the first RM5,000; 1% on RM5,001–RM20,000; 3% on RM20,001–RM35,000; 8% on RM35,001–RM50,000; 13% on RM50,001–RM70,000; 21% on RM70,001–RM100,000; 24% on RM100,001–RM400,000; 24.5% on RM400,001–RM600,000; 25% on RM600,001–RM2,000,000; and 30% on income above RM2,000,000.

Malaysian employers are required to withhold monthly income tax under the Schedular Tax Deduction (STD) system, known locally as PCB (Potongan Cukai Bulanan). PCB is not a final tax — it is a monthly withholding that is reconciled when you file your annual return. If your actual tax liability differs from the PCB withheld, you will either pay the shortfall or receive a refund.

Annual tax returns (Form BE for employees without business income) are due by 30 April of the following year. The MyTax portal (mytax.hasil.gov.my) allows online filing, PCB calculators, and electronic payment. e-Filing is strongly encouraged by LHDN and deadlines are enforced with late filing penalties.

It is important to understand that the tax brackets apply to chargeable income after reliefs — not to gross income. A resident employee earning RM8,000/month (RM96,000/year) who claims personal relief (RM9,000), EPF relief (up to RM4,000), and is single will have a chargeable income of approximately RM83,000, falling primarily in the 21% bracket.`,
    },
    {
      heading: 'EPF, SOCSO, and EIS Contributions',
      body: `Malaysia has three mandatory employee contribution schemes that apply to most private-sector employees.

The Employees Provident Fund (EPF, or KWSP) is Malaysia's mandatory retirement savings scheme. Employee contributions are 11% of monthly salary with no salary ceiling — so higher earners contribute proportionally more. Employers contribute an additional 12% (or 13% for salaries below RM5,000). EPF contributions are deductible for income tax purposes, subject to a cap of RM4,000 per year on the employee's EPF contribution relief.

SOCSO (Social Security Organisation, or PERKESO) covers work injury and invalidity protection. The employee contribution is 0.5% of monthly salary, capped at a monthly salary ceiling of RM5,000 — so the maximum employee SOCSO contribution is RM25/month (RM300/year). Unlike EPF, SOCSO contributions are not deductible for income tax purposes.

EIS (Employment Insurance System) provides short-term unemployment benefits. The employee contributes 0.2% of monthly salary, also capped at the RM5,000 salary ceiling — so the maximum employee EIS contribution is RM10/month (RM120/year). EIS contributions are likewise not tax-deductible for employees.

Foreign nationals are generally required to contribute to EPF and SOCSO if they hold a valid Employment Pass and work for a Malaysian employer. However, some categories of foreign workers (particularly those on short-term assignments) may be exempt from EPF. Upon departing Malaysia permanently, foreign EPF contributors can make a full withdrawal of their EPF savings — a key benefit that makes EPF a meaningful component of total compensation for expats planning to repatriate.`,
    },
    {
      heading: 'Tax Reliefs and Deductions',
      body: `One of the features of Malaysia's income tax system most beneficial to residents is the range of personal reliefs that reduce chargeable income. These reliefs can meaningfully lower the effective tax rate for many workers.

The individual personal relief is RM9,000 per year — available to all resident individuals automatically. This alone removes the first RM9,000 from taxable income before any bracket calculation.

EPF tax relief: Employee EPF contributions are deductible up to RM4,000 per year. This means an employee contributing 11% of salary can claim up to RM4,000 back against their taxable income, regardless of how much they actually contributed.

Spouse relief: A resident taxpayer with a non-working or low-income spouse can claim a RM4,000 spousal relief. This applies when the spouse has no income or income below the filing threshold.

Child relief: Each qualifying child provides a relief of RM2,000 per year (for children under 18, or up to 23 if in full-time education). There are additional reliefs for disabled children. This calculator applies the standard RM2,000/child for basic dependent relief calculation.

Other reliefs available (not included in this calculator's base calculation): life insurance premiums (up to RM3,000), medical insurance (up to RM3,000), education fees (up to RM7,000), medical expenses for parents (up to RM8,000), and purchase of books/equipment. The full list is substantial, meaning the actual tax liability for many employees is lower than a simple bracket calculation would suggest.

Non-resident employees cannot claim any of these reliefs — they pay the flat 30% rate on gross income.`,
    },
    {
      heading: 'Work Permits and TIN Registration',
      body: `Foreign nationals working in Malaysia for a Malaysian employer require a valid Employment Pass (EP). The EP is employer-sponsored and category-dependent: Category I for monthly salaries above RM10,000; Category II for RM5,000–RM9,999; Category III (short-term, up to 12 months) for RM3,000–RM4,999. The sponsoring employer applies through the Expatriate Services Division (ESD) of the Immigration Department.

Once working in Malaysia, both residents and non-residents with employment income are required to register with LHDN and obtain a Tax Identification Number (TIN). Registration is done through the MyTax portal or at a nearest LHDN branch. New residents should register and ensure their employer is enrolled for PCB withholding within 30 days of commencing employment.

For the PCB monthly withholding, employees should submit Form TP1 to their employer to declare reliefs (such as spouse and child reliefs) that the employer should factor into the monthly PCB deduction. Without TP1, employers will use the default single-person formula, which may result in over-withholding.

Digital nomads and remote workers who wish to work from Malaysia without a local employer can apply for the DE Rantau Nomad Pass — Malaysia's digital nomad visa for remote workers earning from outside Malaysia. This pass allows stays of up to 12 months (renewable for another 12 months) with a minimum monthly income requirement of USD 24,000/year. DE Rantau holders are not considered to have Malaysian-sourced income from their foreign employment, though those who stay 182+ days may technically become tax residents — an area where professional tax advice is recommended.`,
    },
    {
      heading: 'Cost of Living Context',
      body: `Malaysia offers one of Southeast Asia's most attractive cost-to-quality-of-life ratios for expatriates, particularly in Kuala Lumpur. The city has world-class infrastructure, excellent healthcare, a large English-speaking population, and significantly lower living costs than Singapore — while offering comparable urban amenities.

A comfortable expat lifestyle in Kuala Lumpur — a furnished apartment in KLCC, Mont Kiara, or Bangsar, regular restaurant dining, gym membership, and transportation — typically costs between RM6,000 and RM15,000 per month (roughly USD 1,350–3,350). Families with children attending international schools should budget an additional RM3,000–RM7,000/month or more for school fees.

The Klang Valley (Kuala Lumpur and surrounding areas) is the primary business hub, but cities like Penang (George Town), Johor Bahru, and Kota Kinabalu offer substantially lower costs with growing expat communities. Penang in particular has become a popular destination for retirees and remote workers under the Malaysia My Second Home (MM2H) program.

The Malaysian Ringgit (MYR) has traded at approximately RM4.4–RM4.7 per US Dollar in recent years. Healthcare costs in Malaysia are notably low: private hospital consultations at internationally accredited hospitals (Gleneagles, Pantai, KPJ) typically cost RM80–RM200, compared to USD 200–500+ in the United States. Many expat packages include private health insurance that covers these facilities comprehensively.

Use the currency converter in our calculator to translate your net Malaysian salary into USD, EUR, or GBP for comparison with home-country compensation packages.`,
    },
  ],
  faqs: [
    {
      q: 'When does a foreigner become a tax resident in Malaysia?',
      a: 'A foreign national becomes a Malaysian tax resident when they are physically present in Malaysia for 182 days or more in a calendar year. There is also a linked-period test for stays that span two calendar years. Tax residents pay progressive rates (0%–30%) with access to personal reliefs; non-residents pay a flat 30% on all Malaysian-sourced income with no reliefs.',
    },
    {
      q: 'Can foreign workers withdraw their EPF contributions when leaving Malaysia?',
      a: 'Yes. Foreign nationals who contributed to EPF and are leaving Malaysia permanently can make a full lump-sum withdrawal of their EPF savings (both employee and employer contributions). This withdrawal is tax-free. The application is made through KWSP (EPF) and typically requires proof of departure and cancellation of Employment Pass.',
    },
    {
      q: 'What is PCB and how does monthly tax withholding work in Malaysia?',
      a: 'PCB (Potongan Cukai Bulanan) is the monthly Schedular Tax Deduction withheld by employers. It is a pre-payment of annual tax, not a final tax. At year-end, you file Form BE to reconcile actual tax liability against PCB paid. Submit Form TP1 to your employer to claim reliefs (spouse, children) in the monthly PCB calculation — otherwise you may over-withhold and need to claim a refund.',
    },
    {
      q: 'What is the tax rate for non-resident foreigners in Malaysia?',
      a: 'Non-residents (those present fewer than 182 days in Malaysia) are taxed at a flat 30% on all Malaysian-sourced employment income. No personal reliefs, EPF deductions, or progressive brackets apply. This rate applies regardless of income level. EPF, SOCSO, and EIS contributions technically still apply to employment pass holders, though some short-term arrangements may be structured differently.',
    },
  ],
};

export default article;

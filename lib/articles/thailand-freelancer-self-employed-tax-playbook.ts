import type { Article } from './types';

const article: Article = {
  slug: 'thailand-freelancer-self-employed-tax-playbook',
  title: 'Freelancer & Self-Employed Tax Playbook: Thailand 2026',
  description:
    'How freelancers and self-employed expats handle tax in Thailand — legal basis and work permits, personal income tax and expense deductions, the ฿1.8M VAT threshold, voluntary social security, and the half-year and annual filing cycle.',
  country: 'thailand',
  publishDate: '2026-06-10',
  category: 'freelancer',
  sections: [
    {
      heading: 'Who This Playbook Is For',
      body: `This guide is for freelancers, independent contractors, online-business owners, and self-employed professionals who are based in Thailand or planning to be — people whose income does not arrive as a tidy salary from a single Thai employer. The rules that apply to you differ in important ways from those for salaried staff, and the gap between "what people do" and "what is technically required" is wider here than in most areas of expat life.

The honest starting point is that Thailand's framework was not designed around the modern remote freelancer. Much of what location-independent workers do — earning from foreign clients while living in Thailand — sits in a grey zone that this playbook will map rather than pretend away. Where the rules are clear, we will be specific; where they are not, we will flag it.

For the underlying residency and bracket details, read this alongside our main Thailand expat tax guide. None of this is a substitute for advice from a Thai accountant on your specific situation, especially before VAT registration or any large remittance.`,
    },
    {
      heading: 'The Legal Basis: Work Permits and Structure',
      body: `The first question is not "how much tax" but "on what basis am I working." Thai law requires a work permit to perform work in Thailand, and "work" is defined broadly. A freelancer physically present in Thailand and providing services — even to foreign clients — is, strictly read, working in Thailand and therefore in scope. In practice, remote workers serving foreign clients on long-stay visas such as the Privilege Card occupy a grey area that is rarely enforced but is not formally sanctioned.

Those who want a clean structure have a few routes. Registering a Thai limited company lets you sponsor your own work permit and invoice clients locally, but it brings Thai corporate obligations, accounting, and (commonly) a ratio of Thai employees per work permit — a meaningful commitment. Others keep their business incorporated abroad and bank income offshore, treating Thailand purely as a place of residence; this keeps the local footprint small but does not by itself resolve the work-permit question if you are physically working from Thailand.

The Long-Term Resident (LTR) visa's "Work-from-Thailand Professional" category is the closest thing to a sanctioned route for higher-earning remote employees, though it is aimed at employees of established foreign companies rather than solo freelancers. Choose your structure first; the tax treatment follows from it.`,
    },
    {
      heading: 'Personal Income Tax for the Self-Employed',
      body: `Self-employed individuals who are Thai tax residents file personal income tax (PIT) on their assessable income using the same progressive brackets as everyone else: the first ฿150,000 is exempt, then rates step from 5% up to 35% on income above ฿5,000,000. What differs is how taxable income is calculated.

Unlike employees, the self-employed deduct business expenses before the brackets apply. For many categories of professional and freelance income, the Revenue Code lets you choose between deducting actual documented expenses or applying a standard lump-sum deduction (a fixed percentage of gross income that varies by income type). Keeping proper records lets you use whichever is more favourable, and for service freelancers with low overheads the standard percentage is often the better deal.

A resident freelancer also keeps the ฿60,000 personal allowance and any other applicable allowances. Because the brackets bite only after deductions and allowances, modest freelance earnings can carry a low effective rate — you can sanity-check the bracket maths for a given income level using our Thailand tax calculator.`,
    },
    {
      heading: 'VAT and the ฿1.8 Million Threshold',
      body: `Value Added Tax is the obligation freelancers most often overlook. Once your gross revenue from providing services in Thailand exceeds ฿1,800,000 in a year, you are required to register for VAT with the Revenue Department, charge 7% VAT, file monthly VAT returns (Form PP.30), and issue compliant tax invoices.

Below that threshold, VAT registration is generally optional and most small freelancers stay unregistered. The threshold is a gross-revenue test, not a profit test, so a freelancer with high turnover and low margins can cross it surprisingly fast — it is worth tracking your rolling annual revenue rather than discovering the breach after the fact.

Note that the VAT question turns on services rendered in Thailand. Exported services to foreign clients can, in defined circumstances, qualify for a 0% rate rather than exemption, which is a meaningful distinction with documentation requirements. This is exactly the kind of point where a short consultation with a Thai accountant pays for itself.`,
    },
    {
      heading: 'Social Security When You Have No Employer',
      body: `Salaried employees are enrolled in Thailand's Social Security Fund (SSF) automatically, with employee and employer each contributing 5% on a capped salary. Freelancers and the self-employed have no employer to share the load, so participation is voluntary.

If you previously contributed as an employee, you can continue voluntarily as an insured person under Section 39, preserving access to certain SSF benefits at a fixed monthly contribution. Those who were never employed in Thailand can opt into the Section 40 scheme for the self-employed, which offers tiered, lower-cost packages covering a narrower set of benefits. Neither is mandatory for a freelancer with no Thai employer.

Whether this is worth doing depends on your situation: many self-employed expats rely on private health insurance instead and skip the SSF entirely, while those wanting to maintain continuity of benefits choose to keep paying. There is no statutory deduction forced on you the way there is for employees.`,
    },
    {
      heading: 'The Filing Cycle and Staying Clean',
      body: `Self-employed taxpayers in Thailand face a two-stage annual cycle rather than a single return. A half-year return (Form PND.94) reports the first six months of certain categories of income and is due by the end of September, with the tax paid then credited against your annual liability. The full-year return (Form PND.90, the form for income beyond simple employment) is then due by the end of March, with the e-filing deadline typically running a little later than the paper one.

To file at all you need a Thai Tax Identification Number (TIN), obtained from your local Revenue Department Area Office with your passport, visa, and proof of address. From there, good habits matter more than complexity: keep numbered invoices, retain expense receipts if you intend to deduct actuals, and set aside tax as you earn rather than scrambling in March.

The recurring watch-item for freelancers earning from abroad is the January 2024 foreign-income rule: as a Thai tax resident (180+ days), money you remit into Thailand can fall within the PIT net. Track what you bring in and when. Our companion guide on Thailand's annual filing and visa-renewal cycle walks through the full calendar, and the tax calculator below lets you model net income at any earnings level.`,
    },
  ],
  faqs: [
    {
      q: 'Do I need a work permit to freelance in Thailand?',
      a: 'Strictly, yes — Thai law defines "work" broadly, so a freelancer physically working in Thailand is in scope even when serving foreign clients. Remote work for foreign clients on long-stay visas is a rarely-enforced grey area. Cleaner routes include registering a Thai company to sponsor your own permit or qualifying for the LTR visa.',
    },
    {
      q: 'How is freelance income taxed in Thailand?',
      a: 'Self-employed residents file PIT on the same progressive brackets (exempt up to ฿150,000, then 5% to 35%), but deduct business expenses first — choosing between actual documented expenses or a standard lump-sum percentage that varies by income type. The ฿60,000 personal allowance also applies.',
    },
    {
      q: 'When must a freelancer register for VAT in Thailand?',
      a: 'When gross revenue from services rendered in Thailand exceeds ฿1,800,000 in a year, VAT registration is mandatory: you charge 7%, file monthly PP.30 returns, and issue tax invoices. It is a gross-revenue test, not profit, so high-turnover freelancers can cross it quickly.',
    },
    {
      q: 'What are the filing deadlines for the self-employed in Thailand?',
      a: 'There are two stages: a half-year return (PND.94) covering the first six months of certain income, due end of September; and the annual return (PND.90), due end of March (e-filing usually a little later). You need a Thai TIN from the Revenue Department to file.',
    },
  ],
};

export default article;

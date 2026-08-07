import type { Article } from './types';

const article: Article = {
  slug: 'indonesia-freelancer-self-employed-tax-playbook',
  title: 'Freelancer & Self-Employed Tax Playbook: Indonesia 2026',
  description:
    'How freelancers and self-employed expats handle tax in Indonesia — NPWP registration, the 0.5% final MSME rate vs deemed-profit norms, the IDR 4.8 billion VAT threshold, BPJS enrolment, and monthly instalments with annual SPT filing.',
  country: 'indonesia',
  publishDate: '2026-08-07',
  category: 'freelancer',
  sections: [
    {
      heading: 'Who This Playbook Is For',
      body: `This guide is for freelancers, independent professionals and small-business owners based in Indonesia — anyone whose income is not a salary with PPh 21 already withheld by an employer.

Indonesia gives self-employed individuals a genuinely useful set of options: a simplified final tax on turnover, a deemed-profit calculation that avoids full bookkeeping, or ordinary self-assessment on audited net income. Picking the right one materially changes your bill and your administrative load.

The catch is scope. Indonesian tax residents are taxed on **worldwide income**. There is no remittance basis and no general territorial exemption for individuals, so foreign client income is assessable once you are resident. A narrow exception exists for certain newly-arrived foreign skilled workers, covered below. Read this alongside our Indonesia expat tax guide and the tax residency guide for the 183-day mechanics.`,
    },
    {
      heading: 'Getting an NPWP and Registering',
      body: `Everything starts with an **NPWP** — the Indonesian tax identification number, issued by the Directorate General of Taxes (DJP). Registration can be done online through the DJP portal or in person at the tax office covering your residence.

For foreign nationals, an NPWP generally follows from holding a KITAS or KITAP and being resident for tax purposes. Note the sequencing: you obtain your immigration status first, then your tax number. Holding a work KITAS makes NPWP registration effectively mandatory, and its absence is increasingly awkward — banks, landlords and clients all ask for it, and the withholding rate applied to you can be higher without one.

Freelancers doing business under a trading name may also need a business identification number (NIB) through the OSS system, depending on activity. Individuals providing professional services to clients often operate without one, but if you are selling goods, running a physical location, or need licences, the OSS route becomes relevant.

Registration does not confer work rights. A foreigner performing work in Indonesia needs the appropriate permit and sponsoring arrangement — see our guide to working in Southeast Asia for how the visa and permit layers interact.`,
    },
    {
      heading: 'Three Ways Your Income Can Be Taxed',
      body: `**Option A — the 0.5% final MSME rate.** Under the small-business regime, individuals with gross turnover below IDR 4.8 billion may pay a final tax of 0.5% of monthly gross turnover, with an annual turnover allowance meaning the first tranche of revenue is not taxed. Because it is *final*, it settles the liability on that income outright — nothing further is computed at year end for it. The regime is time-limited for individuals (a defined number of years from first use), after which you move to ordinary assessment. Its simplicity is unmatched, but there are no expense deductions and no personal allowances applied against it.

**Option B — deemed-profit norms (Norma Penghitungan).** Individuals with gross turnover below IDR 4.8 billion who notify the tax office may compute net income using a published percentage of turnover set by profession and region, then apply the ordinary PPh 21 progressive brackets and the PTKP personal allowance to that deemed profit. This is often the sweet spot for professionals: no full bookkeeping, but you still get the brackets starting at 5% and the PTKP threshold.

**Option C — ordinary self-assessment on actual net income.** Full bookkeeping, actual deductible expenses, progressive brackets, PTKP. Mandatory above the IDR 4.8 billion turnover level and worth electing below it when your real costs are high.

The comparison is not obvious. A consultant with minimal costs may do better under the 0.5% final rate; one with staff and an office usually does better on norms or actual accounts, because the PTKP allowance and the 5% starting bracket bite. Our Indonesia tax calculator shows how the PPh 21 brackets and PTKP interact, which gives you the baseline for options B and C.`,
    },
    {
      heading: 'VAT and the IDR 4.8 Billion Threshold',
      body: `The same IDR 4.8 billion figure that governs the small-business regimes is also the **VAT (PPN) registration threshold**. Cross it in gross turnover and registration as a taxable entrepreneur (PKP) becomes mandatory: you charge VAT, issue tax invoices through the e-Faktur system, and file monthly VAT returns.

Indonesia restructured its VAT rates in 2025, and the headline rate applying to ordinary goods and services differs from the rate applying to designated luxury categories. Because this was revised close to implementation and commentary from the period is unreliable, confirm the current applicable rate with the DJP or an Indonesian accountant rather than trusting a figure from an article — including this one.

Exported services can qualify for zero-rated treatment in defined circumstances, which is materially different from exemption and carries documentation requirements. If your client base is entirely overseas, this is worth specific advice before you register.

As everywhere, the threshold is a turnover test rather than a profit test. Track rolling annual turnover deliberately; crossing it unnoticed means back-filing with penalties.`,
    },
    {
      heading: 'BPJS When You Have No Employer',
      body: `Employees have BPJS Kesehatan (health) and BPJS Ketenagakerjaan (employment) contributions split with their employer. Self-employed individuals enrol under the independent-participant route and fund the full amount themselves.

**BPJS Kesehatan** operates a class-based premium for independent participants, with the class determining your hospital accommodation entitlement rather than your standard of care. Enrolment is framed as mandatory for residents, and proof of coverage is increasingly requested in administrative processes. Many expat freelancers carry BPJS as a floor and private international cover on top — see our health insurance guide for how the two layers work together.

**BPJS Ketenagakerjaan** offers voluntary participation for the self-employed covering work accident, death and old-age savings components. It is inexpensive relative to the protection offered and is frequently overlooked.

None of these are deductible against the 0.5% final regime, which is one more input into the option comparison in the previous section.`,
    },
    {
      heading: 'The Filing Calendar',
      body: `Indonesia runs on **monthly instalments plus an annual return**, and both halves matter.

**Monthly:** taxpayers under the 0.5% final regime remit that amount monthly on gross turnover. Those on ordinary assessment pay PPh 25 monthly instalments calculated from the prior year's liability. VAT-registered taxpayers file monthly VAT returns on their own deadline.

**Annually:** individual taxpayers file the **SPT Tahunan** — the annual return — with a statutory deadline of the end of March following the tax year. Filing is done through the DJP Online e-Filing system, which requires an EFIN obtained in person at the tax office; get this well before March, because obtaining an EFIN in deadline season is a poor use of a day.

The annual return reconciles the year: instalments paid are credited, any shortfall (PPh 29) is settled before filing, and any overpayment can be refunded subject to audit. Income already subject to final tax is reported but not recomputed.

Late filing attracts an administrative fine, and underpayment attracts monthly interest. The more consequential risk for foreigners is the interaction with immigration renewals — tax compliance and permit renewal are increasingly cross-checked, so a lapsed filing record can become an immigration problem rather than merely a financial one.`,
    },
  ],
  faqs: [
    {
      q: 'How is freelance income taxed in Indonesia?',
      a: 'You generally have three routes: a 0.5% final tax on monthly gross turnover under the small-business regime (available below IDR 4.8 billion turnover and time-limited for individuals), deemed-profit norms where a published percentage of turnover is treated as net income and then run through the progressive brackets with the PTKP allowance, or ordinary self-assessment on actual audited net income.',
    },
    {
      q: 'Does Indonesia tax foreign income for residents?',
      a: 'Yes. Indonesian tax residents are taxed on worldwide income, with no remittance basis and no general territorial exemption for individuals. A limited regime allows certain newly-arrived foreign skilled workers to be taxed on Indonesian-source income only for an initial period; eligibility is narrow and worth confirming before relying on it.',
    },
    {
      q: 'What is the VAT registration threshold in Indonesia?',
      a: 'IDR 4.8 billion in gross annual turnover — the same figure that caps the small-business regimes. Above it, registration as a taxable entrepreneur (PKP) is mandatory, with e-Faktur tax invoices and monthly VAT returns. Indonesia restructured its VAT rates in 2025, so confirm the current applicable rate with the DJP rather than relying on published commentary.',
    },
    {
      q: 'Do self-employed foreigners in Indonesia need BPJS?',
      a: 'BPJS Kesehatan enrolment is framed as mandatory for residents, with independent participants choosing a premium class and paying the full amount themselves. BPJS Ketenagakerjaan is voluntary for the self-employed and covers work accident, death and old-age savings. Most expat freelancers carry BPJS as a floor plus private international cover.',
    },
    {
      q: 'When is the Indonesian annual tax return due?',
      a: 'The individual SPT Tahunan is due by the end of March following the tax year, filed through DJP Online. You need an EFIN, obtained in person at the tax office — get it well ahead of the deadline. Monthly obligations run alongside: 0.5% final tax or PPh 25 instalments, plus monthly VAT returns if registered.',
    },
  ],
};

export default article;

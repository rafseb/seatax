import type { Article } from './types';

const article: Article = {
  slug: 'philippines-freelancer-self-employed-tax-playbook',
  title: 'Freelancer & Self-Employed Tax Playbook: Philippines 2026',
  description:
    'How freelancers and self-employed expats handle tax in the Philippines — BIR registration, the 8% flat option vs graduated rates, the ₱3M VAT threshold, percentage tax, voluntary SSS/PhilHealth/Pag-IBIG, and the quarterly filing cycle.',
  country: 'philippines',
  publishDate: '2026-08-07',
  category: 'freelancer',
  sections: [
    {
      heading: 'Who This Playbook Is For',
      body: `This guide is for freelancers, independent contractors, online-business owners, and self-employed professionals based in the Philippines — people whose income does not arrive as a salary from a single employer with tax already withheld. Your obligations differ from a salaried employee's in one fundamental way: nobody withholds on your behalf, so registration, computation, and payment are all yours.

The Philippines is unusually clear-cut compared with its neighbours. The Bureau of Internal Revenue (BIR) has an explicit registration path for self-employed individuals and professionals, a published choice between two tax treatments, and a defined quarterly cycle. The friction is administrative rather than legal — the rules exist and are knowable; the queues are the hard part.

One point that matters enormously for foreign freelancers: resident aliens in the Philippines are taxed on Philippine-source income only. Unlike Vietnam or Indonesia, becoming a resident does not pull your worldwide earnings into the net. Read this alongside our main Philippines expat tax guide and the tax residency guide for the residency mechanics.`,
    },
    {
      heading: 'Registering With the BIR',
      body: `Self-employed individuals register with the Revenue District Office (RDO) covering their place of business or residence. The core steps are obtaining a Taxpayer Identification Number (TIN) if you do not already have one, filing the registration form for self-employed individuals and professionals, paying the annual registration fee where applicable, and having your books of accounts stamped.

You must also secure authority to print official receipts, or register for a BIR-accredited electronic receipting arrangement. This is the step freelancers most often skip and most often regret: issuing a compliant official receipt is a legal requirement for every service you bill, and corporate clients will refuse to pay without one.

Foreign nationals need an ACR I-Card or equivalent immigration documentation supporting their right to be in the country, and the right to engage in the activity being registered. Registration with the BIR does not by itself confer work authorisation — that is a separate question handled by immigration and, for employment, the Department of Labor and Employment.`,
    },
    {
      heading: 'The Big Choice: 8% Flat vs Graduated Rates',
      body: `This is the decision that defines your tax bill. Self-employed individuals and professionals whose gross receipts do not exceed the VAT threshold may elect one of two treatments, and the election is made at registration or at the first quarterly return of the year.

**Option A — 8% flat tax on gross receipts.** You pay 8% on gross receipts and other non-operating income in excess of ₱250,000, and that single payment replaces both the graduated income tax and the percentage tax. There are no expense deductions and no personal allowances beyond the ₱250,000 exclusion. Its appeal is simplicity: one rate, one computation, minimal bookkeeping.

**Option B — graduated rates on net income.** You apply the ordinary TRAIN Law brackets (0% up to ₱250,000, then 15% to 35%) to your net income after deducting business expenses, and separately pay percentage tax on gross receipts. You may deduct actual substantiated expenses or elect the Optional Standard Deduction of 40% of gross receipts, which requires no receipts to support it.

The rough rule: the 8% option wins when your expense ratio is low — typical for service freelancers, writers, developers and consultants with little overhead. Graduated rates win when real costs are high, or when income is low enough that the bracket structure and the OSD together beat a flat 8%. Model both at your actual numbers before electing; the election generally binds for the taxable year.`,
    },
    {
      heading: 'VAT, Percentage Tax and the ₱3 Million Threshold',
      body: `The VAT registration threshold for the Philippines is ₱3,000,000 in gross annual sales or receipts. Cross it and VAT registration becomes mandatory: you charge 12% VAT, file VAT returns, and issue VAT-compliant invoices. Crossing the threshold also removes the 8% flat option — it is available only to non-VAT taxpayers.

Below the threshold, non-VAT taxpayers on graduated rates pay percentage tax on gross receipts instead. Note that the percentage tax rate was temporarily reduced during the pandemic-era relief period and subsequently reverted; confirm the current rate with the BIR or your accountant rather than relying on older articles, which are frequently out of date on this exact point.

Because the threshold is a gross-receipts test rather than a profit test, a high-turnover, low-margin business can cross it while earning very little. Track your rolling annual receipts deliberately — discovering the breach at year end means back-filing and penalties, not a warning letter.

Services exported to foreign clients may qualify for zero-rated VAT treatment in defined circumstances, which is materially different from exemption and carries its own documentation requirements. If most of your clients are overseas, this is worth a consultation.`,
    },
    {
      heading: 'Contributions When You Have No Employer',
      body: `Employees have SSS, PhilHealth and Pag-IBIG deducted automatically, with the employer paying a matching share. Self-employed individuals must enrol themselves and pay both portions, and the Social Security Act makes SSS coverage mandatory for self-employed persons rather than optional.

SSS contributions for the self-employed are based on a declared monthly earnings bracket, and that declaration matters beyond the immediate cost: your eventual pension, sickness and maternity benefits are calculated from your contribution history, so declaring artificially low earnings to save money now permanently reduces what you can claim later.

PhilHealth membership is likewise mandatory under universal health care, with self-employed members paying the full premium based on declared income. Pag-IBIG (HDMF) offers a self-employed membership route and is the gateway to its housing loan programmes.

Unlike an employee, none of this is deductible against the 8% flat option — another factor to weigh when choosing your treatment. Our Philippines tax calculator itemises the employee-side contribution amounts, which gives you a useful floor for what the equivalent self-employed enrolment costs.`,
    },
    {
      heading: 'The Filing Calendar',
      body: `The Philippine self-employed cycle is quarterly plus annual, and missing a quarter is the most common freelancer failure.

**Quarterly income tax (Form 1701Q)** is filed for the first three quarters, with deadlines falling in May, August and November. Each return is cumulative — you compute year-to-date income and credit what you have already paid, rather than treating each quarter in isolation.

**Annual income tax return** is due 15 April following the close of the calendar year. Taxpayers using the 8% flat rate or the OSD generally file the simplified Form 1701A; those itemising deductions or with mixed income file Form 1701.

**Percentage tax or VAT returns** run on their own quarterly or monthly schedule depending on your registration status, and are separate filings from the income tax returns above.

Books of accounts must be maintained and, for manual books, registered with the BIR. Penalties for late filing combine a surcharge, interest, and a compromise penalty, so a return filed late and paid in full still costs more than one filed on time. Set calendar reminders a week ahead of each statutory date — the eFPS and eBIRForms systems are reliably slowest on deadline day.`,
    },
  ],
  faqs: [
    {
      q: 'Should I choose the 8% flat tax or graduated rates in the Philippines?',
      a: 'The 8% flat rate on gross receipts above ₱250,000 usually wins for service freelancers with low expenses — developers, writers, consultants — because it replaces both income tax and percentage tax with one simple computation. Graduated rates with the 40% Optional Standard Deduction tend to win when your real costs are high or your income is modest. Model both before electing; the choice generally binds for the year.',
    },
    {
      q: 'Do foreign freelancers in the Philippines pay tax on overseas income?',
      a: 'No. Resident aliens in the Philippines are taxed on Philippine-source income only — worldwide taxation applies to Filipino citizens, not to foreign residents. This is a significant difference from Vietnam and Indonesia, where residents are taxed on worldwide income.',
    },
    {
      q: 'When must a Philippine freelancer register for VAT?',
      a: 'When gross annual sales or receipts exceed ₱3,000,000. Registration means charging 12% VAT, filing VAT returns and issuing VAT-compliant invoices. Crossing the threshold also disqualifies you from the 8% flat tax option. It is a gross-receipts test, not a profit test.',
    },
    {
      q: 'Do self-employed people in the Philippines have to pay SSS and PhilHealth?',
      a: 'Yes. SSS coverage is mandatory for self-employed persons under the Social Security Act, and PhilHealth membership is mandatory under universal health care. You pay both the employee and employer portions yourself, based on a declared monthly income bracket — and that declaration determines your future benefit entitlements, so under-declaring costs you later.',
    },
    {
      q: 'What are the tax filing deadlines for freelancers in the Philippines?',
      a: 'Quarterly income tax returns (Form 1701Q) are due in May, August and November on a cumulative basis, and the annual return (Form 1701A or 1701) is due 15 April. Percentage tax or VAT returns follow a separate schedule. Late filing attracts a surcharge, interest and a compromise penalty.',
    },
  ],
};

export default article;

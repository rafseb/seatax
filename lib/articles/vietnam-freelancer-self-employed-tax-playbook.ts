import type { Article } from './types';

const article: Article = {
  slug: 'vietnam-freelancer-self-employed-tax-playbook',
  title: 'Freelancer & Self-Employed Tax Playbook: Vietnam 2026',
  description:
    'How freelancers and self-employed expats handle tax in Vietnam — business household registration, the deemed-rate method on revenue, the small-revenue exemption, VAT, worldwide income for residents, and the filing cycle.',
  country: 'vietnam',
  publishDate: '2026-08-07',
  category: 'freelancer',
  sections: [
    {
      heading: 'Who This Playbook Is For',
      body: `This guide is for freelancers, independent contractors and self-employed professionals living in Vietnam — people billing clients directly rather than drawing a salary with tax withheld at source.

Vietnam handles self-employment differently from most of the region, and misunderstanding this is the single biggest source of confusion. Business income earned by individuals is generally not taxed on profit using the progressive salary brackets. Instead it is taxed under a **deemed-rate method applied to revenue**: a fixed percentage of what you bill, with no deduction for costs. Once you internalise that, the rest of the system makes sense.

The second thing to understand is scope. Vietnamese tax residents are taxed on **worldwide income** — there is no remittance basis and no territorial exemption. If you cross the residency threshold, income from foreign clients paid into a foreign account is in scope. Read this alongside our Vietnam expat tax guide and the tax residency guide, which covers Vietnam's 183-day-in-any-12-months rule.`,
    },
    {
      heading: 'Registering as a Business Household',
      body: `The standard vehicle for an individual trading in Vietnam is the **business household** (hộ kinh doanh) — a registered sole-trader form obtained through the district-level business registration office. Registration produces a tax code and brings you into the deemed-rate regime described below.

For foreigners this route is not always straightforward. Business household registration has historically been oriented toward Vietnamese nationals, and practice varies by province. Foreigners with substantial local activity more commonly establish a limited liability company, which is a clean, well-trodden path with 100% foreign ownership permitted in most service sectors — at the cost of corporate accounting, audit obligations and higher running overhead.

The third pattern, common among remote workers, is to keep the business incorporated abroad and treat Vietnam purely as a place of residence. This keeps the Vietnamese footprint minimal but does not resolve your personal tax position: if you are a Vietnamese tax resident, your worldwide income is assessable regardless of where the entity or the bank account sits. It also does not create work authorisation — see our guide to working in Southeast Asia for the work-permit and TRC mechanics.`,
    },
    {
      heading: 'How Freelance Income Is Actually Taxed',
      body: `Individual business income is taxed under a **percentage-of-revenue method**, with the rate set by activity type. For services — the category covering most freelancers, consultants, developers and designers — the combined burden is customarily expressed as two components applied to gross revenue: a value added tax component and a personal income tax component.

For general services, the commonly applied figures are **5% VAT plus 2% PIT on gross revenue**, giving roughly 7% all-in. Different activity classes carry different percentages: goods distribution, construction, leasing and transport each have their own pairs. Because the base is revenue rather than profit, your cost structure is irrelevant to the computation — a freelancer with 90% margins and one with 20% margins pay the same on the same billings.

Small-scale operators fall outside the net entirely. Business individuals with annual revenue below a statutory floor are exempt from both VAT and PIT on that business income. That floor was historically VND 100 million per year and has been legislated upward under the amended VAT law; confirm the figure applying to your tax year before relying on it, as this threshold has been actively revised.

Employment income remains separate and is taxed on the progressive monthly brackets with the personal and dependant deductions — that is what our Vietnam take-home pay calculator models. If you have both a Vietnamese salary and freelance billings, the two streams are computed under different regimes.`,
    },
    {
      heading: 'Worldwide Income: The Rule That Catches People Out',
      body: `Vietnam taxes residents on worldwide income. This deserves emphasis because so much nomad commentary assumes a remittance or territorial basis that simply does not exist here.

Residency is established by 183 days of presence in a calendar year **or in any 12 consecutive months from the date of arrival**. The rolling-window limb is the trap: arrive in September, stay through the following June, and you can become a Vietnamese tax resident without having spent 183 days in either calendar year. There is also a limb based on having a permanent residence or a leased dwelling in Vietnam for a qualifying period, which can establish residency even below the day count unless you can prove tax residency elsewhere.

For a resident freelancer with only foreign clients, the practical position is that your foreign business income is assessable in Vietnam. Where your home country also taxes it, relief comes through Vietnam's double tax treaty network rather than through any domestic exemption — treaties allocate taxing rights and relieve double taxation, but they do not let you pick a jurisdiction.

Non-residents are taxed at a flat 20% on Vietnam-source income only. As with everywhere in the region, flat non-resident treatment is not automatically cheaper: it applies from the first dong with no deductions. Toggle expat mode in the Vietnam calculator to compare the two at your income.`,
    },
    {
      heading: 'Invoicing, E-Invoices and Records',
      body: `Vietnam has moved decisively to mandatory electronic invoicing, and this is now a live compliance requirement rather than a formality. Registered business entities must issue e-invoices through an authorised provider, with data transmitted to the tax authority. Vietnamese corporate clients will require a valid e-invoice to book your fee as a deductible expense, so in practice your ability to win local business depends on being able to issue one.

Foreign clients generally accept an ordinary commercial invoice, which is why remote freelancers serving only overseas customers often operate without ever confronting the e-invoice question. That works until it does not — it does nothing for your personal residency position, and it forecloses local clients entirely.

Keep records of gross revenue by activity class, since the deemed rate depends on classification and misclassification is the most common assessment adjustment. Bank statements showing inbound client payments are the practical backbone of any later substantiation.`,
    },
    {
      heading: 'Filing, Deadlines and Penalties',
      body: `Business households under the deemed method are typically assessed on a **presumptive annual basis** — the tax office sets an expected revenue level in consultation with you, and tax is paid in instalments across the year, with adjustment if actual revenue materially diverges. Larger or more sophisticated operators file on a declaration basis with periodic returns instead.

Individuals with employment income file annual personal income tax finalisation, generally due within the first quarter or four months following year end depending on whether you or your employer finalises. Where you have both salary and business income, the streams are declared under their respective regimes but land in the same annual compliance window.

Late payment attracts daily interest, and under-declaration penalties are assessed as a percentage of the shortfall. Vietnam has also tightened enforcement around individuals receiving significant inbound foreign transfers, with banking data increasingly available to the tax authority — the practical anonymity that remote freelancers assumed a decade ago is eroding fast.

Rules in this area have moved repeatedly, particularly the small-revenue exemption threshold and e-invoice obligations. Treat this playbook as orientation and confirm current figures with a Vietnamese accountant before acting. Our Vietnam annual tax filing and visa renewal guide covers the practical calendar.`,
    },
  ],
  faqs: [
    {
      q: 'How is freelance income taxed in Vietnam?',
      a: 'Not on profit. Individual business income is taxed under a deemed-rate method applied to gross revenue, with the percentage set by activity class. For general services the customary combination is 5% VAT plus 2% PIT on revenue — roughly 7% all-in — with no deduction for business costs. Employment income is separate and uses the progressive monthly brackets.',
    },
    {
      q: 'Does Vietnam tax foreign income for residents?',
      a: 'Yes. Vietnamese tax residents are taxed on worldwide income. There is no remittance basis and no territorial exemption, so income from foreign clients paid into a foreign account is in scope once you are resident. Relief for double taxation comes through treaties, not through a domestic exemption.',
    },
    {
      q: 'When do I become a tax resident in Vietnam?',
      a: 'At 183 days of presence in a calendar year, or in any 12 consecutive months from your date of arrival. The rolling-window limb catches people who never spend 183 days in a single calendar year. There is also a limb based on having a permanent residence or qualifying leased dwelling in Vietnam.',
    },
    {
      q: 'Is there a tax-free threshold for small freelancers in Vietnam?',
      a: 'Yes — business individuals with annual revenue below a statutory floor are exempt from both VAT and PIT on that business income. The floor was historically VND 100 million per year and has been legislated upward under the amended VAT law, so confirm the figure for your tax year rather than relying on older sources.',
    },
    {
      q: 'Can a foreigner register as a business household in Vietnam?',
      a: 'It is possible but inconsistent in practice — the business household form has historically been oriented toward Vietnamese nationals and treatment varies by province. Foreigners with substantial local activity more often set up a limited liability company, which permits full foreign ownership in most service sectors at the cost of corporate accounting obligations.',
    },
  ],
};

export default article;

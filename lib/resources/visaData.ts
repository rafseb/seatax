import type { CountryVisaData, VisaEntry } from './types';

const philippinesVisas: VisaEntry[] = [
  {
    name: 'Visa-Free Tourist Entry',
    category: 'tourist',
    maxStay: '30 days',
    renewable: true,
    workPermitted: false,
    fee: 'None on entry; extension fee applies',
    notes:
      'Citizens of most countries enter visa-free for 30 days. Extendable at BI offices in 29-day increments up to a maximum of 3 years total stay. Does not authorise employment.',
    officialUrl: 'https://immigration.gov.ph/visa-free-countries',
  },
  {
    name: 'Temporary Visitor Visa (9a)',
    category: 'tourist',
    maxStay: '59 days',
    renewable: true,
    workPermitted: false,
    fee: 'USD 30 (single entry)',
    notes:
      'For nationals not eligible for visa-free entry, or visitors wanting a longer initial stay. Can be extended at any BI office in 29 or 59-day increments.',
    officialUrl: 'https://immigration.gov.ph/types-of-visas/non-immigrant-visa',
  },
  {
    name: 'Pre-Arranged Employment Visa (9g)',
    category: 'employment',
    maxStay: '1 year (renewable)',
    renewable: true,
    workPermitted: true,
    notes:
      'Required for foreign nationals employed by a Philippine-based company. Must be sponsored by a DOLE-registered employer and accompanied by an Alien Employment Permit (AEP) from DOLE.',
    officialUrl: 'https://immigration.gov.ph/types-of-visas/non-immigrant-visa',
  },
  {
    name: 'Special Resident Retiree Visa (SRRV)',
    category: 'retirement',
    maxStay: 'Indefinite (multiple-entry)',
    renewable: false,
    workPermitted: false,
    minIncome: 'USD 800–1,500/month pension or USD 10,000–50,000 bank deposit',
    fee: 'USD 1,400 application fee',
    notes:
      'Administered by the Philippine Retirement Authority (PRA). Multiple sub-categories based on age and health status. Required deposit varies by category.',
    officialUrl: 'https://www.pra.gov.ph/srrv',
  },
  {
    name: "Special Investor's Resident Visa (SIRV)",
    category: 'investor',
    maxStay: 'Indefinite',
    renewable: false,
    workPermitted: true,
    minIncome: 'USD 75,000 minimum qualifying investment',
    fee: 'USD 200',
    notes:
      'Issued by the Board of Investments (BOI). Grants permanent resident status to investors in BOI-registered enterprises or in the Philippine Stock Exchange.',
    officialUrl: 'https://www.boi.gov.ph/incentives/sirv/',
  },
  {
    name: 'Non-Quota Immigrant Visa (13a) — Spouse of Filipino',
    category: 'dependent',
    maxStay: 'Permanent (1-year probationary period first)',
    renewable: false,
    workPermitted: true,
    fee: 'PHP 8,620 (probationary); PHP 10,620 (permanent conversion)',
    notes:
      'Granted to foreign spouses of Filipino citizens. A 1-year probationary visa is issued first, convertible to permanent resident status after 1 year. Allows employment without a separate AEP.',
    officialUrl: 'https://immigration.gov.ph/types-of-visas/immigrant-visa',
  },
  {
    name: 'Special Work Permit (SWP)',
    category: 'employment',
    maxStay: '6 months (non-renewable)',
    renewable: false,
    workPermitted: true,
    fee: 'PHP 9,000',
    notes:
      'Short-term work authorisation for consultants and project-based workers. Suitable for intra-company transferees needing to work without a full 9g visa.',
    officialUrl: 'https://immigration.gov.ph/services/special-work-permit',
  },
];

const thailandVisas: VisaEntry[] = [
  {
    name: 'Visa Exemption (Tourist Entry)',
    category: 'tourist',
    maxStay: '60 days (extended from 30 days, effective November 2024)',
    renewable: false,
    workPermitted: false,
    notes:
      'Citizens of 64+ countries receive a 60-day visa-exempt stamp on arrival as of November 2024. A single 30-day extension is available at an immigration office. Employment strictly prohibited.',
    officialUrl: 'https://www.immigration.go.th',
  },
  {
    name: 'Tourist Visa (TR)',
    category: 'tourist',
    maxStay: '60 days',
    renewable: true,
    workPermitted: false,
    fee: 'THB 1,000 (single entry) / THB 3,500 (METV multiple entry)',
    notes:
      'Obtained from a Thai embassy before travel. Single-entry TR extendable by 30 days. Multiple-entry Tourist Visa (METV) valid for 6 months with 60 days permitted per entry.',
    officialUrl: 'https://www.immigration.go.th',
  },
  {
    name: 'Non-Immigrant B (Business / Work)',
    category: 'employment',
    maxStay: '90 days initial; 1-year extension once work permit is held',
    renewable: true,
    workPermitted: true,
    fee: 'THB 2,000 (single entry) / THB 5,000 (multiple entry)',
    notes:
      'Prerequisite for applying for a Thai Work Permit from the Department of Employment. Employer must sponsor the application. Annual extension processed at provincial immigration.',
    officialUrl: 'https://www.immigration.go.th',
  },
  {
    name: 'Non-Immigrant O-A (Long Stay Retirement)',
    category: 'retirement',
    maxStay: '1 year (renewable annually)',
    renewable: true,
    workPermitted: false,
    minIncome: 'THB 65,000/month or THB 800,000 seasoned in a Thai bank account',
    fee: 'THB 2,000 (single entry) / THB 5,000 (multiple entry)',
    notes:
      'For retirees aged 50 and above. Mandatory health insurance (minimum THB 40,000 outpatient / THB 400,000 inpatient) required since 2019. Annual renewal requires proof of funds.',
    officialUrl: 'https://www.immigration.go.th',
  },
  {
    name: 'Long-Term Resident (LTR) Visa — Work-from-Thailand Professional',
    category: 'digital-nomad',
    maxStay: '10 years (5-year initial + 5-year renewal)',
    renewable: true,
    workPermitted: true,
    minIncome: 'USD 80,000/year for past 2 years (or USD 40,000/year with degree or 5 years experience)',
    fee: 'THB 50,000',
    notes:
      "Thailand's official remote work visa launched in 2022. Permits working for overseas employers only. No separate Thai work permit required. Foreign-sourced income may be exempt from Thai PIT in qualifying cases.",
    officialUrl: 'https://ltr.boi.go.th/',
  },
  {
    name: 'Thailand Privilege Card (formerly Thailand Elite)',
    category: 'tourist',
    maxStay: '5 or 20 years membership (1-year stay permitted per entry)',
    renewable: true,
    workPermitted: false,
    fee: 'THB 900,000 – THB 2,500,000 one-time membership fee',
    notes:
      'Long-stay membership programme offering repeated 1-year stays without standard visa extensions. Does not grant the right to work in Thailand. Popular with retirees and passive-income earners.',
    officialUrl: 'https://www.thailandprivilege.com/',
  },
  {
    name: 'Non-Immigrant O (Family / Dependent)',
    category: 'dependent',
    maxStay: '90 days initial; 1-year extension',
    renewable: true,
    workPermitted: false,
    fee: 'THB 2,000 (single entry) / THB 5,000 (multiple entry)',
    notes:
      'For family members of Non-Immigrant B or O-A holders. A separate work permit is required if the dependent wishes to be employed.',
    officialUrl: 'https://www.immigration.go.th',
  },
];

const vietnamVisas: VisaEntry[] = [
  {
    name: 'E-Visa (EV)',
    category: 'tourist',
    maxStay: '90 days per entry',
    renewable: true,
    workPermitted: false,
    fee: 'USD 25',
    notes:
      'Available online to citizens of all countries since August 2023. Single or multiple entry, valid for 90 days. Renewal requires a new application. Apply at evisa.xuatnhapcanh.gov.vn.',
    officialUrl: 'https://evisa.xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Visa on Arrival (VOA)',
    category: 'tourist',
    maxStay: '30 or 90 days',
    renewable: false,
    workPermitted: false,
    fee: 'USD 25 stamping fee + approx. USD 20 pre-approval letter',
    notes:
      'Available at international airports only (not land borders). Requires a pre-approved letter. Largely superseded by the e-visa for most nationalities.',
    officialUrl: 'https://xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Business Visa (DN / NN)',
    category: 'employment',
    maxStay: '3–12 months',
    renewable: true,
    workPermitted: false,
    notes:
      'For foreign investors and business representatives. Does not automatically authorise paid employment — a separate Work Permit from the Ministry of Labour is required.',
    officialUrl: 'https://xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Work Permit + Temporary Residence Card (TRC)',
    category: 'employment',
    maxStay: '2 years (renewable)',
    renewable: true,
    workPermitted: true,
    notes:
      'Foreign employees must first obtain a Work Permit from the Ministry of Labour, then apply for a Temporary Residence Card (TRC). The TRC replaces the need for a separate visa and is tied to the work permit duration.',
    officialUrl: 'https://xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Investment Visa (DT)',
    category: 'investor',
    maxStay: '5–10 years depending on investment tier',
    renewable: true,
    workPermitted: true,
    minIncome: 'VND 3 billion – VND 100 billion investment (tier-dependent)',
    notes:
      'DT1 through DT4 categories determined by capital invested. DT1 (VND 100 billion+) grants a 10-year multiple-entry visa. Investors may manage their own enterprise without a separate work permit.',
    officialUrl: 'https://xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Digital Nomad — E-Visa Workaround (no formal visa exists)',
    category: 'digital-nomad',
    maxStay: '90 days at a time',
    renewable: true,
    workPermitted: false,
    notes:
      'Vietnam has no dedicated digital nomad visa as of early 2026. Remote workers typically use 90-day multiple-entry e-visas and renew by exiting and re-entering. Working for overseas employers on a tourist e-visa occupies a legal grey area.',
    officialUrl: 'https://evisa.xuatnhapcanh.gov.vn/',
  },
  {
    name: 'Student Visa (DH)',
    category: 'student',
    maxStay: 'Duration of enrolled programme',
    renewable: true,
    workPermitted: false,
    notes:
      'Issued to students enrolled at Vietnamese universities. Requires a letter of admission from the institution. Part-time paid work is not authorised; a separate work permit is required for employment.',
    officialUrl: 'https://xuatnhapcanh.gov.vn/',
  },
];

const indonesiaVisas: VisaEntry[] = [
  {
    name: 'Visa on Arrival (B213)',
    category: 'tourist',
    maxStay: '30 days',
    renewable: true,
    workPermitted: false,
    fee: 'IDR 500,000 (approx. USD 32)',
    notes:
      'Available to citizens of most countries at major international entry points. Extendable once for an additional 30 days (60 days total). Cannot be converted to another visa type while in-country.',
    officialUrl: 'https://www.imigrasi.go.id/en/visa-on-arrival/',
  },
  {
    name: 'Social / Cultural Visit Visa (B211A)',
    category: 'tourist',
    maxStay: '60 days (extendable to 180 days)',
    renewable: true,
    workPermitted: false,
    fee: 'Approx. USD 50–100 via approved Indonesian sponsor',
    notes:
      'Requires an Indonesian sponsor. Extendable four times in 30-day increments for a maximum of 180 days total. Popular with long-stay visitors and language learners.',
    officialUrl: 'https://www.imigrasi.go.id/en/',
  },
  {
    name: 'Limited Stay Visa (VITAS) / KITAS — Work',
    category: 'employment',
    maxStay: '6 months to 2 years',
    renewable: true,
    workPermitted: true,
    notes:
      'The VITAS is the entry visa; the KITAS is the in-country residency permit card. Employer must first obtain RPTKA approval from the Ministry of Manpower. Tied to a specific employer.',
    officialUrl: 'https://www.imigrasi.go.id/en/limited-stay-visa/',
  },
  {
    name: 'Second Home Visa (E33G)',
    category: 'digital-nomad',
    maxStay: '5 or 10 years (multiple-entry)',
    renewable: true,
    workPermitted: false,
    minIncome: 'USD 130,000 deposited in an Indonesian state bank, or equivalent property purchase',
    fee: 'USD 1,500 (5-year) / USD 3,000 (10-year)',
    notes:
      "Indonesia's premium long-stay visa for remote workers and high-net-worth individuals, launched in 2022. Holders may not be employed by an Indonesian company or earn Indonesian-sourced income.",
    officialUrl: 'https://www.imigrasi.go.id/en/second-home-visa/',
  },
  {
    name: 'Retirement KITAS',
    category: 'retirement',
    maxStay: '1 year (renewable up to 5 times)',
    renewable: true,
    workPermitted: false,
    minIncome: 'Proof of pension or retirement income; sufficient bank statement',
    notes:
      'For retirees aged 55 and above. Must be processed through an authorised retirement sponsor. Cannot engage in any paid employment or Indonesian business activity.',
    officialUrl: 'https://www.imigrasi.go.id/en/',
  },
  {
    name: 'Business Visit Visa (B211B)',
    category: 'employment',
    maxStay: '60 days (extendable to 180 days)',
    renewable: true,
    workPermitted: false,
    notes:
      'For business meetings, inspections, and training. Requires an Indonesian business entity as guarantor. Does not permit paid employment. Extendable in 30-day increments up to 180 days total.',
    officialUrl: 'https://www.imigrasi.go.id/en/',
  },
];

const malaysiaVisas: VisaEntry[] = [
  {
    name: 'Social Visit Pass (Tourist)',
    category: 'tourist',
    maxStay: '30–90 days depending on nationality',
    renewable: false,
    workPermitted: false,
    notes:
      'Citizens of most countries receive a Social Visit Pass on arrival. ASEAN and Commonwealth nationals typically receive 90 days; others receive 30 days. Extension of up to 30 days may be requested at immigration.',
    officialUrl: 'https://www.imi.gov.my',
  },
  {
    name: 'Employment Pass (EP) — Categories I, II and III',
    category: 'employment',
    maxStay: '1–5 years depending on category',
    renewable: true,
    workPermitted: true,
    minIncome: 'Category I: RM 10,000+/month; Category II: RM 5,000–9,999/month; Category III: RM 3,000–4,999/month',
    notes:
      'Issued by the Expatriate Services Division (ESD). Category I (5 years): senior professionals; Category II (2 years): mid-level roles; Category III (1 year, max 10 years total): semi-skilled positions.',
    officialUrl: 'https://esd.imi.gov.my/portal/employment-pass/',
  },
  {
    name: 'Malaysia My Second Home (MM2H)',
    category: 'retirement',
    maxStay: '5 years (renewable)',
    renewable: true,
    workPermitted: false,
    minIncome: 'RM 40,000/month offshore income; RM 1,000,000 liquid assets; RM 1,000,000 fixed deposit',
    fee: 'RM 5,000 application fee + RM 500 visa endorsement',
    notes:
      'Revamped in 2021 with substantially higher financial requirements. Up to 4 dependants permitted. Holders may not work for a Malaysian employer without a separate Employment Pass.',
    officialUrl: 'https://mm2h.gov.my/',
  },
  {
    name: 'DE Rantau Digital Nomad Pass',
    category: 'digital-nomad',
    maxStay: '3–12 months (renewable once; maximum 24 months)',
    renewable: true,
    workPermitted: true,
    minIncome: 'USD 24,000/year earned from overseas employers or clients',
    fee: 'RM 1,000 (individual); RM 500 per dependent',
    notes:
      "Malaysia's dedicated digital nomad pass launched by MDEC in 2022. Work must be for non-Malaysian companies or clients. Foreign-sourced income earned by DE Rantau holders is not subject to Malaysian personal income tax.",
    officialUrl: 'https://derantau.mdec.my/',
  },
  {
    name: 'Dependent Pass',
    category: 'dependent',
    maxStay: 'Co-terminus with principal Employment Pass',
    renewable: true,
    workPermitted: false,
    notes:
      'Issued to spouses and unmarried children under 18 of Employment Pass holders. To work, the dependent must obtain a Dependent Pass Work Authorization letter from the ESD.',
    officialUrl: 'https://esd.imi.gov.my/portal/dependent-pass/',
  },
  {
    name: 'Professional Visit Pass (PVP)',
    category: 'employment',
    maxStay: '12 months (non-renewable)',
    renewable: false,
    workPermitted: true,
    notes:
      'For foreign professionals and intra-company transferees on a short-term or project basis. Requires sponsorship by a Malaysian company. Does not lead to permanent residence.',
    officialUrl: 'https://www.imi.gov.my',
  },
  {
    name: 'Student Pass',
    category: 'student',
    maxStay: 'Duration of study (up to 24 months per issuance)',
    renewable: true,
    workPermitted: false,
    notes:
      'For international students enrolled in Malaysian universities and colleges. Applications processed through the institution via the Education Malaysia Global Services (EMGS) portal.',
    officialUrl: 'https://educationmalaysia.gov.my/student-pass-application/',
  },
];

export const VISA_DATA: CountryVisaData[] = [
  { country: 'philippines', lastReviewed: '2026-01-15', visas: philippinesVisas },
  { country: 'thailand',    lastReviewed: '2026-01-15', visas: thailandVisas },
  { country: 'vietnam',     lastReviewed: '2026-01-15', visas: vietnamVisas },
  { country: 'indonesia',   lastReviewed: '2026-01-15', visas: indonesiaVisas },
  { country: 'malaysia',    lastReviewed: '2026-01-15', visas: malaysiaVisas },
];

export function getVisaData(slug: string): CountryVisaData | undefined {
  return VISA_DATA.find((d) => d.country === slug);
}

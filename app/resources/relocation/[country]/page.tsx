import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import { pageMetadata, breadcrumbList } from '@/lib/seo';

interface Props {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return {};
  return pageMetadata({
    title: `Relocating to ${country.name} — Expat Checklist`,
    description: `A step-by-step overview of the key tasks when relocating to ${country.name} as an expat — visa, banking, tax registration, health insurance, and more.`,
    path: `/resources/relocation/${slug}`,
  });
}

interface ChecklistSection {
  title: string;
  items: string[];
}

interface CountryChecklist {
  intro: string;
  sections: ChecklistSection[];
}

const CHECKLISTS: Record<string, CountryChecklist> = {
  philippines: {
    intro:
      'The Philippines is one of the most English-friendly countries in Southeast Asia, making the relocation process relatively accessible. Most tasks can be completed within 4–8 weeks of arrival.',
    sections: [
      {
        title: '🛂 Visa & Immigration',
        items: [
          'Most nationalities receive a 30-day visa-free stamp on arrival — extend immediately at any Bureau of Immigration (BI) office for an additional 29 days (₱3,030)',
          'For stays beyond 59 days, apply for a tourist visa extension at BI; extensions are available in 2-month increments up to a maximum of 2 years',
          'Working expats need an Alien Employment Permit (AEP) from the DOLE, plus a 9(g) pre-arranged employment visa via the employer',
          'Retirees: apply for a Special Resident Retiree\'s Visa (SRRV) through the Philippine Retirement Authority — requires a time deposit of $10,000–$50,000 USD depending on age',
          'Keep photocopies of your passport, visa stamps, and all BI receipts — required for bank account opening and TIN registration',
        ],
      },
      {
        title: '🏠 Housing',
        items: [
          'BGC (Bonifacio Global City) and Makati are the most expat-friendly areas in Metro Manila — reliable internet, walkable, good transport links',
          'Cebu City is the main alternative outside Manila — lower cost, smaller scale, growing tech and coworking scene',
          'Furnished condos are common and often preferred by expats; Airbnb and Facebook Groups (e.g. "Expats in BGC") are effective for initial searches',
          'Standard lease terms: 1-year minimum; expect 2 months advance rent + 2 months security deposit',
          'Negotiate rent in Philippine Pesos — landlords sometimes list in USD for expats; paying in PHP at a fair rate is usually preferable',
        ],
      },
      {
        title: '🏦 Banking',
        items: [
          'BDO (Banco de Oro), BPI (Bank of the Philippine Islands), and UnionBank are the most foreigner-friendly options',
          'Required documents: valid passport, proof of address (utility bill or lease agreement), ACR I-Card (for long-stay visa holders), and initial deposit (typically ₱5,000–₱10,000)',
          'ACR I-Card (Alien Certificate of Registration Identity Card) is issued by BI after you register — required for most banking and government transactions',
          'UnionBank offers an online-only account that can be opened without an ACR I-Card, making it useful as a first account',
          'International fintech alternatives: Wise and Revolut work well in the Philippines for transfers and spending while your local account is being set up',
        ],
      },
      {
        title: '📋 Tax Registration',
        items: [
          'Foreigners earning income from Philippine sources must obtain a Tax Identification Number (TIN) from the Bureau of Internal Revenue (BIR)',
          'Employment visa holders: your employer typically registers you; otherwise apply at the BIR Revenue District Office (RDO) covering your address',
          'Required documents: passport, visa, proof of address; bring originals and photocopies',
          'If working remotely for a foreign employer, consult a local tax adviser — tax residency rules apply after 180 days in the country per year',
          'See the Philippines tax calculator for current income tax rates and bracket thresholds',
        ],
      },
      {
        title: '🏥 Health Insurance',
        items: [
          'PhilHealth (national insurance) is available for voluntary foreign members but only covers public hospitals — most expats use private facilities',
          'Private international health insurance is strongly recommended: look for inpatient, outpatient, and emergency evacuation coverage',
          'No minimum coverage is required for most visa categories, but it is required if your employer mandates it under their AEP conditions',
          'Major private hospital networks (Makati Medical Center, St. Luke\'s, The Medical City) accept most international insurers with direct billing',
        ],
      },
      {
        title: '📱 SIM Card & Internet',
        items: [
          'Buy a SIM card at the airport or any Globe/Smart store — bring your passport for registration (mandatory under the SIM Registration Act)',
          'Globe and Smart are the two main carriers; both offer competitive prepaid and postpaid plans; Globe is generally considered stronger in Metro Manila',
          'Fixed fibre broadband: PLDT, Converge, and Globe are the main providers; Converge is often fastest but may have limited coverage outside key areas',
          'When signing up for home broadband, bring your passport, lease agreement, and initial payment — installation typically takes 3–7 business days',
        ],
      },
      {
        title: '⚡ Utilities',
        items: [
          'Electricity: supplied by Meralco in Metro Manila (and other providers in other regions) — your landlord usually handles the connection; you pay Meralco directly each month',
          'Water: Manila Water or Maynilad depending on your location — again usually set up by the landlord',
          'In furnished condos, utilities are often included up to a monthly cap; review the lease carefully',
          'Monthly electricity costs vary widely — air conditioning is the dominant expense; budget ₱3,000–₱8,000 per month for a 1-bedroom condo',
        ],
      },
      {
        title: '📍 Address Registration',
        items: [
          'Formal address registration with the barangay (local neighbourhood unit) is not mandatory for most expats, but a Barangay Certificate of Residency is sometimes requested when opening bank accounts or applying for documents',
          'Obtain one by visiting the barangay hall nearest your address with your passport and lease agreement — usually issued same-day for a small fee',
          'ACR I-Card registration with the Bureau of Immigration is the main formal requirement for long-stay visa holders — apply within 60 days of arrival',
        ],
      },
    ],
  },
  thailand: {
    intro:
      'Thailand has a well-established expat infrastructure and is used to welcoming foreign residents. The main complexity is the visa system — immigration rules change periodically, so verify current requirements before applying.',
    sections: [
      {
        title: '🛂 Visa & Immigration',
        items: [
          'Most nationalities receive a 30-day visa exemption on arrival (extendable once for ฿1,900 at any immigration office)',
          'For longer stays, the TR (Tourist Visa) gives 60 days from a Thai embassy abroad, extendable to 90 days in-country',
          'Non-Immigrant B visa is required for employment — your employer sponsors the visa and work permit (bai anuyat thamngaan); both must be held simultaneously',
          'Long-Term Resident (LTR) Work-from-Thailand Professional visa: 10-year visa for remote workers earning $80,000+ from a foreign employer; requires health insurance with minimum $50,000 USD coverage',
          'Retirement visa (Non-Immigrant OA or O-A): 1-year renewable; requires ฿800,000 in a Thai bank account or ฿65,000/month pension income; mandatory health insurance (฿40,000 outpatient / ฿400,000 inpatient minimum)',
          '90-day reporting is mandatory for all non-immigrant visa holders — done online via the Immigration Bureau website or in person at an immigration office',
        ],
      },
      {
        title: '🏠 Housing',
        items: [
          'Bangkok (Sukhumvit, Sathorn, Silom) offers the most expat-focused housing stock; Chiang Mai is the leading alternative for digital nomads and retirees',
          'Condos are the most common expat rental type — fully furnished units are standard; monthly rent ranges from ฿12,000 (Chiang Mai, basic) to ฿60,000+ (Bangkok, prime areas)',
          'Search via DDProperty, Hipflat, or Facebook groups such as "Expats in Bangkok Housing"; agent fees are typically paid by the landlord',
          'Standard lease: 1-year minimum; 2 months security deposit + 1 month advance rent; some landlords prefer shorter-term arrangements for higher monthly rates',
          'Foreigners cannot own land or houses; condominiums may be owned by foreigners up to 49% of the building\'s total units',
        ],
      },
      {
        title: '🏦 Banking',
        items: [
          'Kasikorn Bank (KBank), Bangkok Bank, and SCB are the most foreigner-friendly; KBank has the best English-language app',
          'Required documents: passport, Non-Immigrant visa (tourist visa usually insufficient), proof of address (lease agreement or utility bill), and sometimes a letter from your employer or embassy',
          'Opening a bank account on a tourist visa has become more difficult — a Non-Immigrant visa is now typically required; some branches in tourist areas are more flexible',
          'Bangkok Bank allows online transfers to overseas accounts and has established links with international banks for wire transfers',
          'Wise and Revolut are useful for managing money before your local account is set up',
        ],
      },
      {
        title: '📋 Tax Registration',
        items: [
          'Tax residents (present in Thailand 180+ days in a calendar year) must obtain a Tax ID (เลขประจำตัวผู้เสียภาษี) from the Revenue Department',
          'Employment visa holders: your employer typically handles registration; otherwise apply at the Area Revenue Office covering your district',
          'Required documents: passport, visa, work permit (if applicable), proof of address',
          'Thailand taxes income remitted to Thailand in the year it is earned — complex rules apply for foreign-sourced income; consult a Thai tax adviser for your specific situation',
          'See the Thailand tax calculator for current PIT brackets and contribution rates',
        ],
      },
      {
        title: '🏥 Health Insurance',
        items: [
          'Non-Immigrant OA visa: mandatory minimum coverage of ฿40,000 outpatient and ฿400,000 inpatient — must be shown at each annual renewal',
          'LTR visa: minimum $50,000 USD equivalent coverage required',
          'Private hospitals (Bumrungrad, Samitivej, Bangkok Hospital) are world-class and widely accept international insurance with direct billing',
          'Thai domestic insurers (AXA Thailand, Pacific Cross) offer competitive long-stay plans; international plans (Cigna, AIA, Pacific Cross International) are better for frequent travellers',
        ],
      },
      {
        title: '📱 SIM Card & Internet',
        items: [
          'AIS, DTAC (now merged with True Move H), and True Move H are the main carriers — AIS is generally considered best for coverage outside cities',
          'Tourist SIMs available at the airport (฿299–฿699 for 15–30 days unlimited data); switch to a regular prepaid or postpaid plan with your Non-Immigrant visa',
          'Fixed fibre broadband: True Move H and AIS are the main residential ISPs; plans start around ฿500–฿900/month for 100Mbps',
          'Bring your passport to any carrier store — SIM registration is mandatory',
        ],
      },
      {
        title: '⚡ Utilities',
        items: [
          'Electricity: supplied by the Provincial Electricity Authority (PEA) or Metropolitan Electricity Authority (MEA) — landlord usually handles connection; you pay monthly based on actual usage',
          'In furnished condos, landlords sometimes charge a flat per-unit electricity rate slightly above the government rate — check the lease',
          'Water: supplied by the Metropolitan Waterworks Authority (MWA) or Provincial Waterworks Authority (PWA) — typically low cost (฿100–฿300/month for a 1-bedroom)',
          'Air conditioning dominates electricity costs — budget ฿1,500–฿4,000/month depending on usage',
        ],
      },
      {
        title: '📍 Address Registration (TM30)',
        items: [
          'TM30 (Residence Notification) must be filed by your landlord or accommodation provider within 24 hours of your arrival — in practice, most landlords in expat-heavy areas handle this routinely',
          'If your landlord does not file TM30, you may face a ฿1,600 fine at immigration — confirm with your landlord that it has been submitted',
          'When you move, TM30 must be re-filed for the new address; keep the receipt as proof',
          '90-day reporting (TM47) is separate from TM30 — this is your own responsibility as the visa holder',
        ],
      },
    ],
  },
  vietnam: {
    intro:
      'Vietnam has streamlined its entry process with an expanded e-visa programme. The main challenges for long-stay expats are banking access and obtaining a work permit, both of which require more paperwork than in some neighbouring countries.',
    sections: [
      {
        title: '🛂 Visa & Immigration',
        items: [
          'E-visa (DL): available to most nationalities for 90 days, multiple entry — apply online at evisa.xuatnhapcanh.gov.vn for $25 USD; processing takes 3 business days',
          'Visa exemptions exist for some nationalities (e.g. ASEAN members, Germany, France, UK for up to 45 days) — check current agreements as these change',
          'Work permit (giấy phép lao động) is required for employment — your employer applies on your behalf; requires a criminal background check, health certificate, and notarised diplomas',
          'Business visa (DN) is available for company directors and investors; a temporary residence card (TRC) can be issued for 1–2 years and replaces the need for frequent border runs',
          'After 183 days in Vietnam in a calendar year you are considered a tax resident — plan accordingly',
        ],
      },
      {
        title: '🏠 Housing',
        items: [
          'Ho Chi Minh City (District 1, District 2/Thao Dien, Phu Nhuan) and Hanoi (Tay Ho, Ba Dinh) offer the most expat-friendly neighbourhoods',
          'Da Nang is the preferred choice for digital nomads — beach access, low cost, manageable size, and a growing international community',
          'Search via Batdongsan.com.vn, Facebook groups ("Expats in HCMC Housing"), or local real estate agents who speak English',
          'Furnished apartments are standard for expats; a 1-bedroom in Thao Dien typically runs $600–$1,200 USD/month; Da Nang is 30–50% cheaper',
          'Most landlords prefer USD for rent payments; leases are typically 1 year with 2–3 months deposit; ensure the lease is in Vietnamese and English',
        ],
      },
      {
        title: '🏦 Banking',
        items: [
          'Techcombank, HSBC Vietnam, and VPBank are the most foreigner-friendly; HSBC is the easiest for international transfers',
          'Required documents: valid passport, visa, work permit or temporary residence card (TRC) — a tourist visa alone is generally insufficient for account opening',
          'HSBC Vietnam allows account opening with a valid e-visa in some branches, but this varies — call ahead to confirm current requirements',
          'Transfers to foreign accounts have historically faced restrictions; HSBC and Citibank (now VPBank Premier) have the smoothest international transfer processes',
          'Wise is widely used by expats in Vietnam as a complement to a local account for international payments',
        ],
      },
      {
        title: '📋 Tax Registration',
        items: [
          'Tax code (mã số thuế cá nhân) is issued by the General Department of Taxation — your employer usually handles registration for work permit holders',
          'Self-employed or freelance expats must register at the local Tax Department office with their passport, visa, and proof of address',
          'Vietnam taxes residents (183+ days/year) on worldwide income via a 7-bracket PIT system (5%–35%)',
          'Foreign-sourced income remitted to Vietnam is taxable — consult a local tax adviser (Deloitte, PwC, and Grant Thornton have strong Vietnam practices)',
          'See the Vietnam tax calculator for current PIT brackets and social insurance rates',
        ],
      },
      {
        title: '🏥 Health Insurance',
        items: [
          'Work permit holders can enrol in the state health insurance scheme (Bảo hiểm y tế) — employer typically contributes; covers public hospitals only',
          'Public hospital quality varies significantly — international-grade private hospitals in HCMC (FV Hospital, Vinmec), Hanoi, and Da Nang are preferred by most expats',
          'International health insurance with emergency medical evacuation is strongly recommended — air evacuation to Singapore or Thailand is standard for serious cases',
          'Cigna, AXA, and Allianz are common choices for international plans with Vietnam-based doctors',
        ],
      },
      {
        title: '📱 SIM Card & Internet',
        items: [
          'Viettel, Mobifone, and Vietnamobile are the main carriers — Viettel has the best rural coverage; Mobifone is popular in urban areas',
          'SIMs available at the airport and any carrier store — bring your passport; prepaid SIMs cost around 50,000–100,000 VND with a data package',
          'Fixed fibre broadband: VNPT, Viettel, and FPT Telecom are the main ISPs; installation typically requires a work permit or residence permit; FPT is popular with expats for its faster speeds and English-language support',
          'Vietnam\'s urban internet speeds rank well regionally — fibre plans from 200,000 VND/month for 100Mbps',
        ],
      },
      {
        title: '⚡ Utilities',
        items: [
          'Electricity: supplied by EVN (Vietnam Electricity) — typically included in rent for furnished apartments or handled by your landlord; if separate, EVN bills on a tiered progressive rate',
          'Water: supplied by local water companies — very low cost (usually under 100,000 VND/month)',
          'In many furnished expat apartments, utilities are bundled into the rent or charged at a fixed monthly fee — check the lease carefully',
          'Air conditioning is the main electricity cost — budget 300,000–800,000 VND/month for a 1-bedroom depending on usage',
        ],
      },
      {
        title: '📍 Address Registration',
        items: [
          'Temporary residence registration (đăng ký tạm trú) is required for foreign nationals staying more than 30 days — your landlord is legally obligated to file this with the local police precinct',
          'In practice, most landlords in expat-friendly areas handle this routinely; ask your landlord to confirm and provide you with a copy',
          'Work permit holders receive a Temporary Residence Card (TRC) which serves as the main residence document — apply at the Immigration Department (Phòng Quản lý Xuất nhập cảnh)',
          'The TRC eliminates the need for a separate temporary residence registration while it is valid',
        ],
      },
    ],
  },
  indonesia: {
    intro:
      'Indonesia\'s relocation process is more bureaucratically intensive than some neighbouring countries, partly due to its geography and the role of KITAS (limited stay permit) in most formal transactions. Building relationships with a local agent or relocation service can significantly reduce friction.',
    sections: [
      {
        title: '🛂 Visa & Immigration',
        items: [
          'Most nationalities receive a 30-day visa-free entry at designated ports of entry (Jakarta, Bali, Batam, Surabaya); extendable once to 60 days at an immigration office',
          'Social/Cultural Visa (B211A): 60 days, extendable up to 180 days in 30-day increments (total 6 months) — requires a local Indonesian sponsor (often a visa agent or guesthouse)',
          'KITAS (Kartu Izin Tinggal Terbatas / Limited Stay Permit): required for employment, business, or long-term residence; employer or sponsor applies; validity 6–12 months, renewable',
          'Second Home Visa (E33G): 5 or 10 years; requires approximately $130,000 USD in an Indonesian bank account or equivalent property ownership',
          'KITAS holders receive an SKTT (Surat Keterangan Tempat Tinggal) — a residence address card required for most formal transactions; obtain this from your local kelurahan (sub-district office)',
        ],
      },
      {
        title: '🏠 Housing',
        items: [
          'Bali (Canggu, Seminyak, Ubud) is the dominant expat and digital nomad destination; Jakarta (Kemang, SCBD, Menteng) for business-focused expats',
          'Foreigners cannot own freehold land in Indonesia; long-term leases (Hak Pakai) of up to 30 years are the common arrangement for housing',
          'Search via Rumah123, OLX Indonesia, or local Facebook groups ("Expats in Bali Housing", "Expats in Jakarta")',
          'Furnished villas and apartments are standard in Bali; Jakarta has a wider range of serviced apartment towers popular with expat employees',
          'Rent is often paid 6–12 months in advance in Bali (common practice, not a deposit) — budget accordingly; Jakarta rentals are more likely to be monthly',
        ],
      },
      {
        title: '🏦 Banking',
        items: [
          'BCA (Bank Central Asia), Mandiri, and BNI are the most foreigner-friendly; BCA has the best ATM network and mobile banking',
          'Required documents: valid passport, KITAS (most banks require a KITAS rather than a tourist visa), SKTT, and NPWP (tax number — see below)',
          'Opening a bank account without a KITAS is very difficult — plan to open your account after KITAS is issued, or use international fintech (Wise, Revolut) in the interim',
          'BRI (Bank Rakyat Indonesia) serves rural areas well if you are based outside Bali or Jakarta',
          'International transfers from Indonesian accounts face some bureaucratic requirements — banks require supporting documentation for larger outward transfers',
        ],
      },
      {
        title: '📋 Tax Registration',
        items: [
          'NPWP (Nomor Pokok Wajib Pajak) is the Indonesian tax identification number — required for banking, SIM card (in some cases), and vehicle ownership',
          'KITAS holders earning in Indonesia must obtain an NPWP from the Directorate General of Taxes (DJP) — apply at the local KPP (Tax Service Office) or online via the DJP portal',
          'Required documents: passport, KITAS, SKTT, proof of address',
          'Indonesia taxes residents (183+ days/year) on Indonesian-sourced income under the PPh 21 (Article 21) withholding system; your employer handles payroll deductions',
          'See the Indonesia tax calculator for current PPh 21 brackets and BPJS contribution rates',
        ],
      },
      {
        title: '🏥 Health Insurance',
        items: [
          'KITAS holders are required to register with BPJS Kesehatan (national health insurance) — your employer typically handles this for employment KITAS holders',
          'BPJS only covers public hospitals (Puskesmas, Rumah Sakit Umum) — quality varies significantly; most expats pair BPJS with a private international policy',
          'International hospitals in Bali (BIMC, Siloam), Jakarta (Siloam, Pondok Indah, Medistra) accept international insurance with direct billing',
          'Emergency medical evacuation coverage is particularly important given Indonesia\'s geography — serious cases often require transport to Bali, Singapore, or Darwin',
        ],
      },
      {
        title: '📱 SIM Card & Internet',
        items: [
          'Telkomsel, Indosat Ooredoo Hutchison (IOH), and XL Axiata are the main carriers; Telkomsel has the widest rural coverage across the archipelago',
          'SIMs available at the airport or any carrier store — bring your passport; prepaid starter packs cost around IDR 10,000–30,000',
          'Fixed fibre broadband: IndiHome (Telkom), First Media, and Biznet are the main residential ISPs; availability varies by area — Biznet is generally fastest where available',
          'In Bali and Jakarta, mobile data (Telkomsel or IOH) serves as an effective backup where fibre is unavailable',
        ],
      },
      {
        title: '⚡ Utilities',
        items: [
          'Electricity: supplied by PLN (Perusahaan Listrik Negara) — your landlord typically handles the connection; pay monthly via the PLN mobile app, Tokopedia, or convenience stores',
          'Power outages are more frequent outside Bali and Jakarta — a UPS (uninterruptible power supply) is worth considering for home office setups in less urban areas',
          'Water: piped water quality is not drinkable — budget for bottled water (galon) delivered to your home at around IDR 20,000–25,000 per 19-litre gallon',
          'Air conditioning is the dominant electricity cost — budget IDR 500,000–1,500,000/month for a 1-bedroom unit',
        ],
      },
      {
        title: '📍 Address Registration',
        items: [
          'KITAS holders must register their address at the local kelurahan (sub-district office) to obtain an SKTT — required for banking and many other services',
          'Required documents: passport, KITAS, lease agreement; bring originals and photocopies; the SKTT is usually issued within a few days',
          'Your landlord or a local relocation agent can assist with navigating the kelurahan registration process — strongly recommended for first-time arrivals',
          'For business visa holders (B211A) without a KITAS, address registration is handled differently — your visa agent or sponsor can advise',
        ],
      },
    ],
  },
  malaysia: {
    intro:
      'Malaysia is one of the easiest Southeast Asian countries for expat relocation — English is widely spoken, bureaucracy is relatively streamlined, and the country has actively courted foreign residents through programmes like MM2H and DE Rantau.',
    sections: [
      {
        title: '🛂 Visa & Immigration',
        items: [
          'Most nationalities receive 90 days visa-free on arrival (no extension available on a tourist entry)',
          'Employment Pass (EP): issued for professional roles with salary above RM 5,000/month; employer applies through the Expatriate Services Division (ESD) portal; processing takes 4–8 weeks',
          'DE Rantau Digital Nomad Pass: specifically for freelancers and remote workers earning from non-Malaysian clients; minimum $24,000 USD annual income; valid 3–12 months, renewable',
          'Malaysia My Second Home (MM2H): long-term residence visa (10 years); requires MYR 1.5 million in liquid assets + MYR 500,000 time deposit; has been reformed several times — verify current requirements',
          'Dependant\'s Pass for spouse and children under 21 of EP holders — apply simultaneously with the EP; allows spouse to apply for a separate EP if they work',
          'Residence Pass–Talent (RP-T): for highly skilled professionals; valid 10 years, no sponsoring employer required',
        ],
      },
      {
        title: '🏠 Housing',
        items: [
          'Kuala Lumpur (Mont Kiara, Bangsar, KLCC, Damansara Heights) are the most popular expat neighbourhoods; good public transport links via MRT',
          'Penang (George Town) is the leading alternative — heritage character, walkable old town, lower cost, growing creative scene; good ferry and flight connections to KL',
          'Search via PropertyGuru, iProperty, or Facebook groups ("Expats in KL Housing"); local agents typically charge the landlord 1 month\'s commission',
          'Furnished condos with security and facilities (pool, gym) are the standard expat choice — MYR 2,500–6,000/month in Mont Kiara, less in Bangsar or Damansara',
          'Standard lease: 1-year minimum; 2 months security deposit + 0.5 month utility deposit; stamp duty on the tenancy agreement is split between landlord and tenant',
        ],
      },
      {
        title: '🏦 Banking',
        items: [
          'Maybank, CIMB, and HSBC Malaysia are the most expat-friendly; CIMB has good online banking and is widely used by foreigners',
          'Required documents: passport, valid visa (Employment Pass, DE Rantau, or MM2H — tourist stamp usually insufficient), proof of address, and a letter from employer (for EP holders)',
          'HSBC Malaysia makes it easier to transfer internationally and is linked globally for Premier customers',
          'CIMB Clicks and Maybank2u are the main online banking platforms — both have English interfaces and mobile apps',
          'Wise and Revolut work well for receiving foreign currency and international payments while your local account is being established',
        ],
      },
      {
        title: '📋 Tax Registration',
        items: [
          'Tax residents (present in Malaysia 182+ days in a calendar year) must obtain an Income Tax File Number from the Inland Revenue Board (Lembaga Hasil Dalam Negeri / LHDN)',
          'Employment Pass holders: your employer registers you and handles PCB (Potongan Cukai Berjadual) monthly tax deductions under the payroll system',
          'Register at any LHDN branch with your passport, visa, and employment contract; the tax file number is typically issued on the same visit',
          'Malaysia taxes residents on Malaysian-sourced income only; foreign-sourced income remitted to Malaysia from 2022 onwards may be taxable — consult a local tax adviser',
          'See the Malaysia tax calculator for current PCB brackets and EPF/SOCSO/EIS contribution rates',
        ],
      },
      {
        title: '🏥 Health Insurance',
        items: [
          'MM2H visa holders are required to maintain health insurance — proof required at renewal; minimum coverage amounts vary by age',
          'DE Rantau pass holders are not required to have insurance, but it is strongly advised given that DE Rantau holders do not benefit from any mandatory employer coverage',
          'Malaysia\'s private hospital network is one of the best in the region — KPJ, Pantai, and Gleneagles are the main chains; competitive pricing compared to Singapore',
          'Local Malaysian insurers (AXA Affin, Great Eastern, Prudential BSN Takaful) offer competitive long-stay plans; international plans remain better for frequent inter-regional travel',
        ],
      },
      {
        title: '📱 SIM Card & Internet',
        items: [
          'Maxis, Celcom Digi (merged 2023), and U Mobile are the main carriers; Maxis is generally considered best for coverage and customer service',
          'SIMs available at the airport or any carrier store — bring your passport; registration is mandatory',
          'Postpaid plans (which offer better rates and international roaming) require your passport and visa — tourist stamp may not be accepted at all carriers; try Maxis or Digi for the most flexible requirements',
          'Fixed fibre broadband: Unifi (Telekom Malaysia), Maxis Fibre, and TIME dotCom are the main options; TIME is the fastest in areas it covers (primarily Klang Valley condos)',
          'Unifi Home plans start around MYR 100/month for 100Mbps and are widely available in urban areas',
        ],
      },
      {
        title: '⚡ Utilities',
        items: [
          'Electricity: supplied by Tenaga Nasional Berhad (TNB) — your landlord handles connection for condos; for individual landed houses, you apply at TNB with your passport, lease, and a deposit',
          'Water: supplied by state water companies (e.g. Syabas in Selangor, Air Selangor from 2020) — very low cost; typically less than MYR 30/month for a 1-bedroom',
          'In condos, electricity is metered per unit and TNB bills you directly; management fees cover common areas, security, and facilities',
          'Air conditioning is the main electricity cost — budget MYR 200–500/month for a 1-bedroom condo with reasonable usage',
        ],
      },
      {
        title: '📍 Address Registration',
        items: [
          'Employment Pass holders should update their address with the Immigration Department when moving — your employer\'s HR typically handles this during the EP application',
          'No mandatory barangay/kelurahan-style address registration; however, your Malaysian address is recorded in the EPF (KWSP) and LHDN systems — update these when you move',
          'MyKad (Malaysian Identity Card) is for citizens and permanent residents only — long-stay expats carry their passport and visa as the primary ID document',
          'Ensure your employer has your current address on file — it appears on the Employment Pass and may need to be updated if you relocate within Malaysia',
        ],
      },
    ],
  },
};

const sectionStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default async function RelocationCountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();

  const checklist = CHECKLISTS[slug];
  if (!checklist) notFound();

  const breadcrumbLd = breadcrumbList([
    { name: 'Resources', path: '/resources' },
    { name: 'Relocation', path: '/resources/relocation' },
    { name: country.name, path: `/resources/relocation/${slug}` },
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="mb-4">
        <Link href="/resources/relocation" className="text-sm nav-link">
          ← Relocation Checklists
        </Link>
      </div>

      <header className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Relocation Guide
        </p>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{country.flag}</span>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--cream)' }}>
            Relocating to {country.name}
          </h1>
        </div>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          {checklist.intro}
        </p>
      </header>

      <div className="space-y-4">
        {checklist.sections.map((section) => (
          <div key={section.title} className="p-5" style={sectionStyle}>
            <h2 className="text-base font-bold mb-3" style={{ color: 'var(--cream)' }}>
              {section.title}
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-2" style={{ color: 'var(--forest-300)' }}>
              {section.items.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-2 text-sm">
        <Link href={`/resources/visas/${slug}`} className="nav-link">
          Visa options for {country.name} →
        </Link>
        <Link href="/resources/health-insurance" className="nav-link">
          Health insurance guide →
        </Link>
        <Link href="/resources/guides" className="nav-link">
          Expat tax guides →
        </Link>
        <Link href={`/${slug}`} className="nav-link">
          {country.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}

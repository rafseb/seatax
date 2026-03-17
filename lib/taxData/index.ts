export interface Bracket {
  income: string;
  rate: string;
}

export interface TaxInfoData {
  brackets: Bracket[];
  contributions: { label: string; rate: string; note?: string }[];
  expatNote: string;
  sources: { label: string; url: string }[];
}

export const TAX_INFO: Record<string, TaxInfoData> = {
  philippines: {
    brackets: [
      { income: '0 – ₱250,000', rate: '0%' },
      { income: '₱250,001 – ₱400,000', rate: '15%' },
      { income: '₱400,001 – ₱800,000', rate: '20%' },
      { income: '₱800,001 – ₱2,000,000', rate: '25%' },
      { income: '₱2,000,001 – ₱8,000,000', rate: '30%' },
      { income: '₱8,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'SSS', rate: '5%', note: 'Capped at ₱35,000 monthly salary (2025)' },
      { label: 'PhilHealth', rate: '2.5%', note: 'Min ₱500, max ₱2,500/month' },
      { label: 'Pag-IBIG', rate: '2%', note: 'Max ₱200/month' },
    ],
    expatNote: 'Non-residents are taxed at a flat 25% on gross Philippine-sourced compensation. Mandatory contributions (SSS, PhilHealth, Pag-IBIG) generally do not apply.',
    sources: [
      { label: 'BIR — Income Tax (TRAIN Law)', url: 'https://www.bir.gov.ph/index.php/tax-information/income-tax.html' },
      { label: 'SSS — Contribution Table', url: 'https://www.sss.gov.ph/sss-contribution-table/' },
      { label: 'PhilHealth — Premium Contributions', url: 'https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf' },
      { label: 'Pag-IBIG — Contribution Schedule', url: 'https://www.pagibigfund.gov.ph/document/pdf/circulars/HDMF%20Circular%20No.%20460.pdf' },
    ],
  },
  thailand: {
    brackets: [
      { income: '0 – ฿150,000', rate: '0%' },
      { income: '฿150,001 – ฿300,000', rate: '5%' },
      { income: '฿300,001 – ฿500,000', rate: '10%' },
      { income: '฿500,001 – ฿750,000', rate: '15%' },
      { income: '฿750,001 – ฿1,000,000', rate: '20%' },
      { income: '฿1,000,001 – ฿2,000,000', rate: '25%' },
      { income: '฿2,000,001 – ฿5,000,000', rate: '30%' },
      { income: '฿5,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'Social Security (SSF)', rate: '5%', note: 'Capped at ฿750/month (salary cap ฿15,000)' },
    ],
    expatNote: 'Non-residents are taxed at the same progressive rates on Thailand-sourced income. Social Security contributions generally do not apply to non-residents. Standard deductions and personal allowances are also excluded.',
    sources: [
      { label: 'Revenue Department — Personal Income Tax', url: 'https://www.rd.go.th/english/6045.html' },
      { label: 'Social Security Office — Contribution Rates', url: 'https://www.sso.go.th/wpr/main/sso_eng/' },
    ],
  },
  vietnam: {
    brackets: [
      { income: '0 – ₫5,000,000/mo', rate: '5%' },
      { income: '₫5,000,001 – ₫10,000,000/mo', rate: '10%' },
      { income: '₫10,000,001 – ₫18,000,000/mo', rate: '15%' },
      { income: '₫18,000,001 – ₫32,000,000/mo', rate: '20%' },
      { income: '₫32,000,001 – ₫52,000,000/mo', rate: '25%' },
      { income: '₫52,000,001 – ₫80,000,000/mo', rate: '30%' },
      { income: '₫80,000,001+/mo', rate: '35%' },
    ],
    contributions: [
      { label: 'Social Insurance (SI)', rate: '8%', note: 'Capped at ₫36,000,000/month' },
      { label: 'Health Insurance (HI)', rate: '1.5%', note: 'Capped at ₫36,000,000/month' },
      { label: 'Unemployment Insurance (UI)', rate: '1%', note: 'Capped at ₫36,000,000/month' },
    ],
    expatNote: 'Non-residents are taxed at a flat 20% on Vietnam-sourced income. Social insurance and health insurance contributions generally do not apply to non-resident foreigners.',
    sources: [
      { label: 'General Dept. of Taxation — PIT Law', url: 'https://www.gdt.gov.vn/' },
      { label: 'Vietnam Social Insurance — Contribution Rates', url: 'https://www.baohiemxahoi.gov.vn/' },
    ],
  },
  indonesia: {
    brackets: [
      { income: '0 – Rp60,000,000', rate: '5%' },
      { income: 'Rp60,000,001 – Rp250,000,000', rate: '15%' },
      { income: 'Rp250,000,001 – Rp500,000,000', rate: '25%' },
      { income: 'Rp500,000,001 – Rp5,000,000,000', rate: '30%' },
      { income: 'Rp5,000,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'BPJS Kesehatan', rate: '1%', note: 'Capped at Rp12,000,000/month salary' },
      { label: 'BPJS JHT (Old-Age)', rate: '2%', note: 'Employee share' },
      { label: 'BPJS JP (Pension)', rate: '1%', note: 'Capped at Rp10,547,400/month salary (2025)' },
    ],
    expatNote: 'Non-residents are subject to a flat 20% withholding tax on Indonesia-sourced income. BPJS contributions generally do not apply. PTKP (non-taxable threshold of Rp54,000,000/year) is excluded for non-residents.',
    sources: [
      { label: 'Direktorat Jenderal Pajak — PPh 21', url: 'https://www.pajak.go.id/id/pajak-penghasilan-pasal-21' },
      { label: 'BPJS Ketenagakerjaan — Contribution Rates', url: 'https://www.bpjsketenagakerjaan.go.id/' },
      { label: 'BPJS Kesehatan — Premium Rates', url: 'https://www.bpjs-kesehatan.go.id/' },
    ],
  },
  malaysia: {
    brackets: [
      { income: 'RM0 – RM5,000', rate: '0%' },
      { income: 'RM5,001 – RM20,000', rate: '1%' },
      { income: 'RM20,001 – RM35,000', rate: '3%' },
      { income: 'RM35,001 – RM50,000', rate: '8%' },
      { income: 'RM50,001 – RM70,000', rate: '13%' },
      { income: 'RM70,001 – RM100,000', rate: '21%' },
      { income: 'RM100,001 – RM400,000', rate: '24%' },
      { income: 'RM400,001 – RM600,000', rate: '24.5%' },
      { income: 'RM600,001 – RM2,000,000', rate: '25%' },
      { income: 'RM2,000,001+', rate: '30%' },
    ],
    contributions: [
      { label: 'EPF (Employee Provident Fund)', rate: '11%', note: 'Employee share; no salary ceiling' },
      { label: 'SOCSO (PERKESO)', rate: '0.5%', note: 'Capped at RM5,000/month salary' },
      { label: 'EIS (Employment Insurance)', rate: '0.2%', note: 'Capped at RM5,000/month salary' },
    ],
    expatNote: 'Non-residents are taxed at a flat 30% on Malaysia-sourced income. EPF, SOCSO, and EIS contributions do not apply. Tax reliefs (personal, EPF, spouse, child) are not available to non-residents.',
    sources: [
      { label: 'LHDN — Income Tax Rates (YA 2024)', url: 'https://www.hasil.gov.my/en/individual/individual-life-cycle/how-to-declare-income/tax-rate/' },
      { label: 'EPF — Contribution Rates', url: 'https://www.kwsp.gov.my/en/employer/contribution/contribution-rate' },
      { label: 'PERKESO — SOCSO & EIS Rates', url: 'https://www.perkeso.gov.my/index.php/en/employer/contribution-rate' },
    ],
  },
};

import type { Metadata } from 'next';
import Link from 'next/link';
import type { ArticleSection } from '@/lib/articles/types';
import ArticleBody from '@/components/ArticleBody';

export const metadata: Metadata = {
  title: 'Banking Guide for Expats in Southeast Asia',
  description:
    'How to open a bank account as a foreigner in SEA, move money internationally with low fees, and manage finances as an expat in Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/banking',
  },
};

const SECTIONS: ArticleSection[] = [
  {
    heading: 'Opening a Bank Account as a Foreigner',
    body: 'Most Southeast Asian countries allow foreigners to open a basic savings account with a valid passport and visa, though requirements vary by country and bank. A local address proof, employment letter or work permit, and Tax Identification Number (TIN) are commonly requested for full-featured accounts. Tourist-visa holders are typically limited to basic accounts or may be declined entirely.\n\nIn Thailand, Bangkok Bank and Kasikorn Bank are generally foreigner-friendly, accepting Non-Immigrant B visa holders. In Malaysia, CIMB and Maybank offer streamlined account opening for Employment Pass holders, and the DE Rantau Digital Nomad Pass is now accepted as valid documentation. In the Philippines, BDO, BPI, and Metrobank accept foreign nationals with ACR I-Card or 9g visa documentation. Indonesian banks (BCA, Mandiri, BNI) require a KITAS and NPWP for full-service accounts.',
  },
  {
    heading: 'International Transfers and Fintech Services',
    body: 'Traditional wire transfers between local banks and your home country can be slow and expensive — fees of USD 15–35 per transfer and exchange rate margins of 2–4% are common. For expats moving money regularly, digital alternatives provide a significantly better experience.\n\nWise (formerly TransferWise) offers mid-market exchange rates with transparent fees for transfers to and from most SEA currencies. Revolut provides multi-currency accounts and competitive exchange rates, though SEA support varies by country. For larger amounts (USD 10,000+), Instarem and OFX offer competitive rates with fewer fees. When receiving salary in a local currency, consider holding a portion in your home currency via a multi-currency account to manage exchange rate risk.',
  },
  {
    heading: 'Practical Tips for Expats',
    body: 'Maintain both a local account (for rent, utilities, and day-to-day expenses) and a home-country account (for any remaining obligations and emergency access). Most countries impose foreign exchange controls that limit how much local currency you can transfer out annually — keep this in mind before depositing large amounts into a local account.\n\nSome Employment Pass or KITAS holders report that local banks freeze or close accounts when the underlying visa changes or lapses. Maintain proof of current immigration status and notify your bank promptly of any visa changes. In Malaysia and Thailand, banks are required to perform periodic KYC (Know Your Customer) reviews — respond promptly to requests to avoid account suspension.\n\nFor digital nomads on tourist visas, international debit cards (Wise, Revolut, Charles Schwab for US citizens) often provide the most reliable day-to-day access with ATM fee reimbursement and no foreign transaction fees.',
  },
];

export default function BankingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Banking &amp; Money Guide for Expats in SEA
      </h1>

      <p className="text-gray-600 leading-relaxed mb-8">
        How to set up banking, move money internationally, and manage finances as an expat in
        Southeast Asia.
      </p>

      <ArticleBody sections={SECTIONS} localCurrency="" localSymbol="" />

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-2">
          Know your net take-home pay before you move
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Banking setup is easier when you know exactly how much you will take home. Use our free
          tax calculator to compare net salary after income tax and mandatory contributions across
          all five SEA countries.
        </p>
        <Link
          href="/resources"
          className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to all resources →
        </Link>
      </div>
    </div>
  );
}

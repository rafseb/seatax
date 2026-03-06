import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, COUNTRIES } from "@/lib/countries";
import TaxCalculator from "@/components/TaxCalculator";

interface Props {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return {
    title: `${country.flag} ${country.name} Income Tax Calculator — SEA Tax`,
    description: `Calculate your net take-home salary after income tax and mandatory contributions in ${country.name}. 2024/2025 tax rates.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  return <TaxCalculator country={country} />;
}

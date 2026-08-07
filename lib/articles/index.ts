import type { Article } from './types';
import philippines from './philippines-expat-guide';
import thailand from './thailand-expat-guide';
import vietnam from './vietnam-expat-guide';
import indonesia from './indonesia-expat-guide';
import malaysia from './malaysia-expat-guide';
import singapore from './singapore-expat-guide';
import bangkokCity from './living-in-bangkok-as-an-expat';
import chiangMaiCity from './living-in-chiang-mai-as-a-digital-nomad';
import baliCity from './living-in-bali-as-an-expat';
import hcmcCity from './living-in-ho-chi-minh-city-as-an-expat';
import kualaLumpurCity from './living-in-kuala-lumpur-as-an-expat';
import metroManilaCity from './living-in-metro-manila-as-an-expat';
import thailandFreelancer from './thailand-freelancer-self-employed-tax-playbook';
import philippinesFreelancer from './philippines-freelancer-self-employed-tax-playbook';
import vietnamFreelancer from './vietnam-freelancer-self-employed-tax-playbook';
import indonesiaFreelancer from './indonesia-freelancer-self-employed-tax-playbook';
import malaysiaFreelancer from './malaysia-freelancer-self-employed-tax-playbook';
import thailandCompliance from './thailand-annual-tax-filing-visa-renewal-guide';
import philippinesCompliance from './philippines-annual-tax-filing-visa-renewal-guide';
import vietnamCompliance from './vietnam-annual-tax-filing-visa-renewal-guide';
import indonesiaCompliance from './indonesia-annual-tax-filing-visa-renewal-guide';
import malaysiaCompliance from './malaysia-annual-tax-filing-visa-renewal-guide';

export const ARTICLES: Article[] = [
  philippines,
  thailand,
  vietnam,
  indonesia,
  malaysia,
  singapore,
  bangkokCity,
  chiangMaiCity,
  baliCity,
  hcmcCity,
  kualaLumpurCity,
  metroManilaCity,
  thailandFreelancer,
  philippinesFreelancer,
  vietnamFreelancer,
  indonesiaFreelancer,
  malaysiaFreelancer,
  thailandCompliance,
  philippinesCompliance,
  vietnamCompliance,
  indonesiaCompliance,
  malaysiaCompliance,
];

// The legacy /blog/[slug] route exists only to preserve the original five guide
// URLs for SEO continuity. New articles are published under /resources/guides
// only — they must not get duplicate /blog URLs.
export const LEGACY_BLOG_SLUGS = [
  'working-in-the-philippines-as-an-expat',
  'working-in-thailand-as-an-expat',
  'working-in-vietnam-as-an-expat',
  'working-in-indonesia-as-an-expat',
  'working-in-malaysia-as-an-expat',
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

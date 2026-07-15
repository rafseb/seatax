import { ogCard, accentFor, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  'SEA Tax Calculator — net take-home pay for Philippines, Thailand, Vietnam, Indonesia, and Malaysia';

export default function Image() {
  return ogCard({
    tag: 'Southeast Asia · 2026',
    title: 'Income Tax & Take-Home Pay Calculator',
    subtitle: 'Philippines · Thailand · Vietnam · Indonesia · Malaysia',
    accent: accentFor(),
  });
}

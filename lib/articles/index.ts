import type { Article } from './types';
import philippines from './philippines-expat-guide';
import thailand from './thailand-expat-guide';
import vietnam from './vietnam-expat-guide';
import indonesia from './indonesia-expat-guide';

export const ARTICLES: Article[] = [philippines, thailand, vietnam, indonesia];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

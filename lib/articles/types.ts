export interface ArticleSection {
  heading: string;
  body: string;
}

export type ArticleCategory = 'tax-guide' | 'city-guide' | 'freelancer' | 'compliance';

export interface Article {
  slug: string;
  title: string;
  description: string;
  country: string;
  publishDate: string;
  category?: ArticleCategory;
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
}

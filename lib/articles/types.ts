export interface ArticleSection {
  heading: string;
  body: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  country: string;
  publishDate: string;
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
}

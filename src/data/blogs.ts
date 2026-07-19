export type BlogPost = {
  id: string;
  title: string;
  category: 'Technology' | 'AI' | 'Website Tips' | 'Business' | 'PC Building' | 'Cloud' | 'Cyber Security';
  excerpt: string;
  date: string;
  readTime: string;
  slug?: string;
  html?: string;
};

// Prefer generated index (created by scripts/generate-blog-index.mjs).
// During development/build the `prebuild` script will create `blogPosts.generated.ts`.
export { blogPosts } from './blogPosts.generated';


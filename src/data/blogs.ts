export type BlogPost = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug?: string;
  html?: string;
};

// Prefer generated index (created by scripts/generate-blog-index.mjs).
// During development/build the `prebuild` script will create `blogPosts.generated.ts`.
import { blogPosts as generatedBlogPosts } from './blogPosts.generated';
export const blogPosts: BlogPost[] = generatedBlogPosts;


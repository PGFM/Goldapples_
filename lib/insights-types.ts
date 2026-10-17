export type ResearchPaper = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  externalUrl: string;
  pdfUrl: string;
  status: "published" | "draft";
  publishedAt: string;
  updatedAt: string;
};

export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "quote"
  | "list"
  | "callout"
  | "html"
  | "divider";

export type ContentBlock = {
  id: string;
  type: BlockType;
  content?: string;
  level?: 2 | 3 | 4;
  imageUrl?: string;
  caption?: string;
  alt?: string;
  width?: "normal" | "wide" | "full";
  attribution?: string;
  calloutTitle?: string;
  listStyle?: "unordered" | "ordered";
  items?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  readTime: string;
  status: "published" | "draft";
  publishedAt: string;
  updatedAt: string;
  blocks: ContentBlock[];
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "pdf";
  size: number;
  uploadedAt: string;
};

export type InsightsCmsSettings = {
  showArticlesSection: boolean;
};

export type InsightsCmsData = {
  settings: InsightsCmsSettings;
  papers: ResearchPaper[];
  posts: BlogPost[];
  media: MediaItem[];
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

import fs from "fs";
import path from "path";
import {
  slugify,
  type ResearchPaper,
  type BlockType,
  type ContentBlock,
  type BlogPost,
  type MediaItem,
  type InsightsCmsSettings,
  type InsightsCmsData,
} from "./insights-types";

export {
  slugify,
  type ResearchPaper,
  type BlockType,
  type ContentBlock,
  type BlogPost,
  type MediaItem,
  type InsightsCmsSettings,
  type InsightsCmsData,
};

import os from "os";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "insights-cms.json");
const TMP_FILE_PATH = path.join(os.tmpdir(), "goldapples-insights-cms.json");

export const ADMIN_COOKIE_NAME = "goldapples_admin_session";
export const ADMIN_SESSION_TOKEN = "ga_session_authenticated_v1";
export const ADMIN_USERNAME = "goldapples";
export const ADMIN_PASSWORD = "goldapples_admin";

export function getCmsData(): InsightsCmsData {
  try {
    // If running on a read-only preview environment (like Vercel) where a /tmp override was saved, read that first
    const activePath =
      fs.existsSync(TMP_FILE_PATH) && process.env.VERCEL
        ? TMP_FILE_PATH
        : DATA_FILE_PATH;

    if (!fs.existsSync(activePath)) {
      return {
        settings: { showArticlesSection: true },
        papers: [],
        posts: [],
        media: [],
      };
    }
    const raw = fs.readFileSync(activePath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<InsightsCmsData>;
    return {
      settings: {
        showArticlesSection:
          parsed.settings?.showArticlesSection !== undefined
            ? Boolean(parsed.settings.showArticlesSection)
            : true,
      },
      papers: Array.isArray(parsed.papers) ? parsed.papers : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      media: Array.isArray(parsed.media) ? parsed.media : [],
    };
  } catch {
    return {
      settings: { showArticlesSection: true },
      papers: [],
      posts: [],
      media: [],
    };
  }
}

export function saveCmsData(data: InsightsCmsData): void {
  const serialized = JSON.stringify(data, null, 2);
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, serialized, "utf-8");
  } catch {
    // Fallback for read-only serverless preview environments (e.g., Vercel)
    fs.writeFileSync(TMP_FILE_PATH, serialized, "utf-8");
  }
}

export function getPublishedPapers(): ResearchPaper[] {
  const { papers } = getCmsData();
  return papers.filter((p) => p.status === "published");
}

export function getPublishedPosts(): BlogPost[] {
  const { posts } = getCmsData();
  return posts.filter((p) => p.status === "published");
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const { posts } = getCmsData();
  return posts.find((p) => p.slug === slug);
}

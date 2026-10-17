import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TOKEN,
  getCmsData,
  saveCmsData,
  slugify,
  type ResearchPaper,
  type BlogPost,
} from "@/lib/insights-cms";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_TOKEN;
}

export async function GET() {
  const data = getCmsData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await req.json()) as {
      action:
        | "save-paper"
        | "delete-paper"
        | "save-post"
        | "delete-post"
        | "toggle-articles-section";
      paper?: Partial<ResearchPaper>;
      post?: Partial<BlogPost>;
      id?: string;
      showArticlesSection?: boolean;
    };

    const data = getCmsData();
    const now = new Date().toISOString();

    if (payload.action === "toggle-articles-section") {
      data.settings = {
        ...data.settings,
        showArticlesSection:
          payload.showArticlesSection !== undefined
            ? Boolean(payload.showArticlesSection)
            : !data.settings.showArticlesSection,
      };
      saveCmsData(data);
      revalidatePath("/insights");
      return NextResponse.json({ data });
    }

    if (payload.action === "save-paper" && payload.paper) {
      const p = payload.paper;
      const id = p.id || `paper-${Date.now()}`;
      const existingIndex = data.papers.findIndex((item) => item.id === id);

      const savedPaper: ResearchPaper = {
        id,
        title: (p.title || "Untitled Paper").trim(),
        subtitle: (p.subtitle || "").trim(),
        author: (p.author || "J. Ayo Makinde").trim(),
        description: (p.description || "").trim(),
        externalUrl: (p.externalUrl || "").trim(),
        pdfUrl: (p.pdfUrl || "").trim(),
        status: p.status === "draft" ? "draft" : "published",
        publishedAt:
          existingIndex >= 0
            ? data.papers[existingIndex].publishedAt
            : p.publishedAt || now,
        updatedAt: now,
      };

      if (existingIndex >= 0) {
        data.papers[existingIndex] = savedPaper;
      } else {
        data.papers.unshift(savedPaper);
      }

      saveCmsData(data);
      revalidatePath("/insights");
      return NextResponse.json({ data, savedPaper });
    }

    if (payload.action === "delete-paper" && payload.id) {
      data.papers = data.papers.filter((item) => item.id !== payload.id);
      saveCmsData(data);
      revalidatePath("/insights");
      return NextResponse.json({ data });
    }

    if (payload.action === "save-post" && payload.post) {
      const p = payload.post;
      const id = p.id || `post-${Date.now()}`;
      const existingIndex = data.posts.findIndex((item) => item.id === id);
      const rawTitle = (p.title || "Untitled Article").trim();
      const baseSlug = slugify(p.slug || rawTitle) || `article-${Date.now()}`;

      // Ensure unique slug among other posts
      let uniqueSlug = baseSlug;
      let counter = 2;
      while (
        data.posts.some(
          (item) => item.slug === uniqueSlug && item.id !== id,
        )
      ) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      const savedPost: BlogPost = {
        id,
        title: rawTitle,
        slug: uniqueSlug,
        excerpt: (p.excerpt || "").trim(),
        author: (p.author || "J. Ayo Makinde").trim(),
        category: (p.category || "Perspectives").trim(),
        featuredImage: (p.featuredImage || "").trim(),
        featuredImageAlt: (p.featuredImageAlt || "").trim(),
        readTime: (p.readTime || "4 min read").trim(),
        status: p.status === "draft" ? "draft" : "published",
        publishedAt:
          existingIndex >= 0
            ? data.posts[existingIndex].publishedAt
            : p.publishedAt || now,
        updatedAt: now,
        blocks: Array.isArray(p.blocks) ? p.blocks : [],
      };

      if (existingIndex >= 0) {
        data.posts[existingIndex] = savedPost;
      } else {
        data.posts.unshift(savedPost);
      }

      saveCmsData(data);
      revalidatePath("/insights");
      revalidatePath(`/insights/${savedPost.slug}`);
      return NextResponse.json({ data, savedPost });
    }

    if (payload.action === "delete-post" && payload.id) {
      const removed = data.posts.find((item) => item.id === payload.id);
      data.posts = data.posts.filter((item) => item.id !== payload.id);
      saveCmsData(data);
      revalidatePath("/insights");
      if (removed) {
        revalidatePath(`/insights/${removed.slug}`);
      }
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("CMS save error:", err);
    return NextResponse.json(
      { error: "Failed to save CMS changes." },
      { status: 500 },
    );
  }
}

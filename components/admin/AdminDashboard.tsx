"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Upload,
  Check,
  AlertCircle,
  LogOut,
  Eye,
  ArrowUp,
  ArrowDown,
  Copy,
  Type,
  Heading as HeadingIcon,
  List,
  Quote,
  Code,
  Sparkles,
  Minus,
  Search,
  ChevronLeft,
  Lock,
  User,
} from "lucide-react";
import {
  slugify,
  type ResearchPaper,
  type BlogPost,
  type ContentBlock,
  type BlockType,
  type MediaItem,
} from "@/lib/insights-types";
import { BlockRenderer } from "@/components/insights/BlockRenderer";

type AdminTab =
  | "overview"
  | "posts"
  | "post-editor"
  | "papers"
  | "paper-editor"
  | "media";

const DEFAULT_CATEGORIES = [
  "Communication Intelligence",
  "Leadership Communication",
  "Development Communication",
  "Organisational Alignment",
  "Media & Public Narrative",
  "Perspectives",
];

function createEmptyBlock(type: BlockType): ContentBlock {
  const id = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  switch (type) {
    case "heading":
      return { id, type: "heading", level: 2, content: "" };
    case "paragraph":
      return { id, type: "paragraph", content: "" };
    case "image":
      return {
        id,
        type: "image",
        imageUrl: "",
        caption: "",
        alt: "",
        width: "normal",
      };
    case "quote":
      return { id, type: "quote", content: "", attribution: "" };
    case "list":
      return { id, type: "list", listStyle: "unordered", items: [""] };
    case "callout":
      return {
        id,
        type: "callout",
        calloutTitle: "Key Takeaway",
        content: "",
      };
    case "html":
      return { id, type: "html", content: "<p>Custom HTML block</p>" };
    case "divider":
      return { id, type: "divider" };
  }
}

function createEmptyPost(): BlogPost {
  const now = new Date().toISOString();
  return {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    author: "J. Ayo Makinde",
    category: "Communication Intelligence",
    featuredImage: "",
    featuredImageAlt: "",
    readTime: "4 min read",
    status: "published",
    publishedAt: now,
    updatedAt: now,
    blocks: [createEmptyBlock("paragraph")],
  };
}

function createEmptyPaper(): ResearchPaper {
  const now = new Date().toISOString();
  return {
    id: "",
    title: "",
    subtitle: "",
    author: "J. Ayo Makinde",
    description: "",
    externalUrl: "",
    pdfUrl: "",
    status: "published",
    publishedAt: now,
    updatedAt: now,
  };
}

export function AdminDashboard() {
  const [authChecking, setAuthChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // CMS Data state
  const [showArticlesSection, setShowArticlesSection] = useState(true);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Navigation & Editor state
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Active Post being edited
  const [editingPost, setEditingPost] = useState<BlogPost>(createEmptyPost());
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [postPreviewMode, setPostPreviewMode] = useState(false);
  const [htmlPreviewIds, setHtmlPreviewIds] = useState<Record<string, boolean>>({});

  // Active Paper being edited
  const [editingPaper, setEditingPaper] = useState<ResearchPaper>(createEmptyPaper());

  // Saving & Toast notifications
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => {
        setToast((prev) => (prev?.message === message ? null : prev));
      }, 4000);
    },
    [],
  );

  const fetchCmsData = useCallback(async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/insights", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as {
          settings?: { showArticlesSection?: boolean };
          papers: ResearchPaper[];
          posts: BlogPost[];
          media: MediaItem[];
        };
        setShowArticlesSection(
          data.settings?.showArticlesSection !== undefined
            ? Boolean(data.settings.showArticlesSection)
            : true,
        );
        setPapers(data.papers || []);
        setPosts(data.posts || []);
        setMedia(data.media || []);
      }
    } catch {
      showToast("error", "Could not load CMS data.");
    } finally {
      setLoadingData(false);
    }
  }, [showToast]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth", { cache: "no-store" });
        const data = (await res.json()) as { authenticated: boolean };
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) {
          await fetchCmsData();
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, [fetchCmsData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as {
        authenticated?: boolean;
        error?: string;
      };
      if (res.ok && data.authenticated) {
        setAuthenticated(true);
        setPassword("");
        await fetchCmsData();
      } else {
        setLoginError(data.error || "Invalid login credentials.");
      }
    } catch {
      setLoginError("Network error while signing in.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setUsername("");
    setPassword("");
  }

  async function uploadFile(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await res.json()) as {
        url?: string;
        error?: string;
        data?: { media: MediaItem[] };
      };
      if (!res.ok || !result.url) {
        showToast("error", result.error || "File upload failed.");
        return null;
      }
      if (result.data?.media) {
        setMedia(result.data.media);
      }
      showToast("success", `Uploaded ${file.name}`);
      return result.url;
    } catch {
      showToast("error", "Error uploading file.");
      return null;
    } finally {
      setUploading(false);
    }
  }

  // ── Post Editor Handlers ──
  function startNewPost() {
    setEditingPost(createEmptyPost());
    setSlugManuallyEdited(false);
    setPostPreviewMode(false);
    setActiveTab("post-editor");
  }

  function startEditPost(post: BlogPost) {
    setEditingPost({
      ...post,
      blocks:
        post.blocks && post.blocks.length > 0
          ? post.blocks.map((b) => ({
              ...b,
              items: b.items ? [...b.items] : undefined,
            }))
          : [createEmptyBlock("paragraph")],
    });
    setSlugManuallyEdited(true);
    setPostPreviewMode(false);
    setActiveTab("post-editor");
  }

  async function handleSavePost(targetStatus?: "published" | "draft") {
    if (!editingPost.title.trim()) {
      showToast("error", "Please enter a post title before saving.");
      return;
    }
    setSaving(true);
    try {
      const postToSave: BlogPost = {
        ...editingPost,
        status: targetStatus || editingPost.status,
        slug: editingPost.slug || slugify(editingPost.title),
      };
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save-post", post: postToSave }),
      });
      const result = (await res.json()) as {
        data?: { posts: BlogPost[]; papers: ResearchPaper[] };
        savedPost?: BlogPost;
        error?: string;
      };
      if (res.ok && result.data && result.savedPost) {
        setPosts(result.data.posts);
        setEditingPost(result.savedPost);
        setSlugManuallyEdited(true);
        showToast(
          "success",
          result.savedPost.status === "published"
            ? "Article published and live on /insights!"
            : "Draft saved successfully.",
        );
      } else {
        showToast("error", result.error || "Failed to save article.");
      }
    } catch {
      showToast("error", "Network error saving article.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePost(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-post", id }),
      });
      const result = (await res.json()) as {
        data?: { posts: BlogPost[] };
      };
      if (res.ok && result.data) {
        setPosts(result.data.posts);
        showToast("success", "Article deleted.");
        if (activeTab === "post-editor" && editingPost.id === id) {
          setActiveTab("posts");
        }
      }
    } catch {
      showToast("error", "Failed to delete article.");
    }
  }

  // ── Block Manipulation Helpers ──
  function addBlock(type: BlockType, afterIndex?: number) {
    const newBlock = createEmptyBlock(type);
    setEditingPost((prev) => {
      const blocks = [...prev.blocks];
      if (afterIndex !== undefined && afterIndex >= 0) {
        blocks.splice(afterIndex + 1, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { ...prev, blocks };
    });
  }

  function updateBlock(id: string, patch: Partial<ContentBlock>) {
    setEditingPost((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setEditingPost((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.blocks.length) return prev;
      const blocks = [...prev.blocks];
      const [item] = blocks.splice(index, 1);
      blocks.splice(target, 0, item);
      return { ...prev, blocks };
    });
  }

  function duplicateBlock(index: number) {
    setEditingPost((prev) => {
      const source = prev.blocks[index];
      const copy: ContentBlock = {
        ...source,
        id: `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        items: source.items ? [...source.items] : undefined,
      };
      const blocks = [...prev.blocks];
      blocks.splice(index + 1, 0, copy);
      return { ...prev, blocks };
    });
  }

  function removeBlock(id: string) {
    setEditingPost((prev) => {
      const filtered = prev.blocks.filter((b) => b.id !== id);
      return {
        ...prev,
        blocks: filtered.length > 0 ? filtered : [createEmptyBlock("paragraph")],
      };
    });
  }

  // ── Paper Editor Handlers ──
  function startNewPaper() {
    setEditingPaper(createEmptyPaper());
    setActiveTab("paper-editor");
  }

  function startEditPaper(paper: ResearchPaper) {
    setEditingPaper({ ...paper });
    setActiveTab("paper-editor");
  }

  async function handleSavePaper(targetStatus?: "published" | "draft") {
    if (!editingPaper.title.trim()) {
      showToast("error", "Please enter a paper title before saving.");
      return;
    }
    setSaving(true);
    try {
      const paperToSave: ResearchPaper = {
        ...editingPaper,
        status: targetStatus || editingPaper.status,
      };
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save-paper", paper: paperToSave }),
      });
      const result = (await res.json()) as {
        data?: { papers: ResearchPaper[] };
        savedPaper?: ResearchPaper;
        error?: string;
      };
      if (res.ok && result.data && result.savedPaper) {
        setPapers(result.data.papers);
        setEditingPaper(result.savedPaper);
        showToast(
          "success",
          result.savedPaper.status === "published"
            ? "Research paper published on /insights!"
            : "Paper saved as draft.",
        );
      } else {
        showToast("error", result.error || "Failed to save paper.");
      }
    } catch {
      showToast("error", "Network error saving paper.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePaper(id: string, title: string) {
    if (!window.confirm(`Delete research paper "${title}"?`)) {
      return;
    }
    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-paper", id }),
      });
      const result = (await res.json()) as {
        data?: { papers: ResearchPaper[] };
      };
      if (res.ok && result.data) {
        setPapers(result.data.papers);
        showToast("success", "Research paper deleted.");
        if (activeTab === "paper-editor" && editingPaper.id === id) {
          setActiveTab("papers");
        }
      }
    } catch {
      showToast("error", "Failed to delete paper.");
    }
  }

  async function handleDeleteMedia(id: string) {
    if (!window.confirm("Remove this file from the Media Library?")) return;
    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = (await res.json()) as { data?: { media: MediaItem[] } };
      if (res.ok && result.data) {
        setMedia(result.data.media);
        showToast("success", "Media item removed.");
      }
    } catch {
      showToast("error", "Failed to delete media item.");
    }
  }

  async function handleToggleArticlesSection(nextValue: boolean) {
    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle-articles-section",
          showArticlesSection: nextValue,
        }),
      });
      const result = (await res.json()) as {
        data?: { settings?: { showArticlesSection?: boolean } };
      };
      if (res.ok && result.data) {
        const updated = Boolean(result.data.settings?.showArticlesSection);
        setShowArticlesSection(updated);
        showToast(
          "success",
          updated
            ? '"Recent Articles" section is now VISIBLE on the live Insights page.'
            : '"Recent Articles" section is now HIDDEN on the live Insights page.',
        );
      }
    } catch {
      showToast("error", "Failed to update section visibility.");
    }
  }

  // ── Loading / Login States ──
  if (authChecking) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-champagne">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-gold-deep border-t-transparent animate-spin" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-champagne/70">
            Loading Goldapples CMS...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ink flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-gold-deep/25 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[440px] border border-white/12 bg-[#181512] p-8 sm:p-10 shadow-2xl rounded-[4px]">
          <div className="mb-8 text-center">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              Goldapples Editorial Studio
            </span>
            <h1 className="mt-2 font-serif text-3xl text-white">
              Admin Sign In
            </h1>
            <p className="mt-2 text-sm text-champagne/65">
              Manage published research papers and articles.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 flex items-center gap-2.5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200 rounded-[3px]">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="block font-mono text-[11px] uppercase tracking-[0.14em] text-champagne/80 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="h-4 w-4 text-champagne/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="goldapples"
                  className="w-full rounded-[3px] border border-white/15 bg-black/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-deep focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block font-mono text-[11px] uppercase tracking-[0.14em] text-champagne/80 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-champagne/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-[3px] border border-white/15 bg-black/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-deep focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold py-3.5 px-6 text-sm font-semibold text-ink hover:brightness-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? "Signing In..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-champagne/50">
            <Link href="/insights" className="hover:text-gold transition-colors">
              ← Return to Insights
            </Link>
            <span>CMS v1.0</span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPapers = papers.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedPostsCount = posts.filter((p) => p.status === "published").length;
  const draftPostsCount = posts.filter((p) => p.status === "draft").length;
  const publishedPapersCount = papers.filter((p) => p.status === "published").length;

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-ink flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[4px] border px-5 py-3.5 shadow-xl transition-all ${
            toast.type === "success"
              ? "border-gold-deep bg-ink text-white"
              : "border-red-400 bg-red-950 text-red-100"
          }`}
        >
          {toast.type === "success" ? (
            <Check className="h-4 w-4 text-gold" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Left WordPress-Style Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-ink text-champagne shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
        <div>
          {/* Brand Top Bar */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                Goldapples
              </span>
              <span className="font-serif text-lg text-white">
                Insights CMS
              </span>
            </div>
            <Link
              href="/insights"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-[3px] border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-champagne hover:border-gold hover:text-white transition-colors"
              title="View live Insights page"
            >
              <span>Live</span>
              <ExternalLink className="h-3 w-3 text-gold" />
            </Link>
          </div>

          {/* Quick + New Buttons */}
          <div className="p-4 grid grid-cols-2 gap-2 border-b border-white/10">
            <button
              type="button"
              onClick={startNewPost}
              className="flex items-center justify-center gap-1.5 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-3 py-2 text-xs font-semibold text-ink hover:brightness-95 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Article</span>
            </button>
            <button
              type="button"
              onClick={startNewPaper}
              className="flex items-center justify-center gap-1.5 rounded-[3px] border border-champagne/30 bg-white/5 px-3 py-2 text-xs font-semibold text-champagne hover:border-gold hover:text-white transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-gold" />
              <span>New Paper</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 rounded-[3px] px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-gold-deep/20 text-gold border-l-2 border-gold"
                  : "text-champagne/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("posts");
              }}
              className={`flex items-center justify-between gap-3 rounded-[3px] px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "posts" || activeTab === "post-editor"
                  ? "bg-gold-deep/20 text-gold border-l-2 border-gold"
                  : "text-champagne/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="h-4 w-4 shrink-0" />
                <span>Articles &amp; Blogs</span>
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-champagne/80">
                {posts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("papers");
              }}
              className={`flex items-center justify-between gap-3 rounded-[3px] px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "papers" || activeTab === "paper-editor"
                  ? "bg-gold-deep/20 text-gold border-l-2 border-gold"
                  : "text-champagne/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>Research Papers</span>
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-champagne/80">
                {papers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`flex items-center justify-between gap-3 rounded-[3px] px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "media"
                  ? "bg-gold-deep/20 text-gold border-l-2 border-gold"
                  : "text-champagne/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <ImageIcon className="h-4 w-4 shrink-0" />
                <span>Media Library</span>
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-champagne/80">
                {media.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom User / Logout Bar */}
        <div className="hidden lg:flex flex-col gap-3 p-4 border-t border-white/10 text-xs text-champagne/60">
          <div className="flex items-center justify-between">
            <span>Signed in as</span>
            <span className="font-mono text-gold font-semibold">goldapples</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-[3px] border border-white/15 py-2 px-3 text-xs text-champagne hover:border-red-400/50 hover:text-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Workspace Header */}
        <header className="bg-white border-b border-ink/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {(activeTab === "post-editor" || activeTab === "paper-editor") && (
              <button
                type="button"
                onClick={() =>
                  setActiveTab(activeTab === "post-editor" ? "posts" : "papers")
                }
                className="inline-flex items-center gap-1 rounded-[3px] border border-ink/15 px-2.5 py-1.5 text-xs font-medium text-graphite hover:border-ink hover:text-ink cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            )}
            <h1 className="font-serif text-xl sm:text-2xl text-ink">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "posts" && "Recent Articles & Blogs"}
              {activeTab === "post-editor" &&
                (editingPost.id ? "Edit Article" : "Add New Article")}
              {activeTab === "papers" && "Published Research / SSRN Papers"}
              {activeTab === "paper-editor" &&
                (editingPaper.id
                  ? "Edit Research Paper"
                  : "Add New Research Paper")}
              {activeTab === "media" && "Media Library"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {loadingData && (
              <span className="font-mono text-xs text-steel">Syncing...</span>
            )}
            <Link
              href="/insights"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-[#FAF8F5] px-3.5 py-2 text-xs font-semibold text-ink hover:border-gold-deep transition-colors"
            >
              <Eye className="h-3.5 w-3.5 text-gold-deep" />
              <span>View Insights Page</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="lg:hidden inline-flex items-center gap-1 rounded-[3px] border border-ink/15 px-3 py-2 text-xs text-graphite hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Workspace Body */}
        <div className="flex-1 p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {/* ── FRONTEND VISIBILITY CONTROL BANNER FOR RECENT ARTICLES SECTION ── */}
          {(activeTab === "overview" || activeTab === "posts") && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[4px] border border-gold-deep/40 bg-white px-6 py-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <span
                  className={`h-3 w-3 rounded-full shrink-0 ${
                    showArticlesSection ? "bg-emerald-600" : "bg-steel/50"
                  }`}
                />
                <div>
                  <p className="font-serif text-base font-medium text-ink">
                    &ldquo;Recent Articles&rdquo; Section on Live Insights Page:{" "}
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ml-1 ${
                        showArticlesSection
                          ? "text-emerald-700"
                          : "text-amber-700"
                      }`}
                    >
                      {showArticlesSection ? "Visible Live" : "Hidden on Frontend"}
                    </span>
                  </p>
                  <p className="text-xs text-steel mt-0.5">
                    Toggle whether the Recent Articles section (after Applied
                    Methodology) is displayed to visitors on{" "}
                    <code>/insights</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleArticlesSection(true)}
                  className={`px-3.5 py-2 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer ${
                    showArticlesSection
                      ? "bg-emerald-700 text-white"
                      : "border border-ink/15 bg-[#FAF8F5] text-graphite hover:text-ink"
                  }`}
                >
                  Visible on Frontend
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleArticlesSection(false)}
                  className={`px-3.5 py-2 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer ${
                    !showArticlesSection
                      ? "bg-ink text-white"
                      : "border border-ink/15 bg-[#FAF8F5] text-graphite hover:text-ink"
                  }`}
                >
                  Hidden on Frontend
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 1: OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Row */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border border-ink/10 bg-white p-6 rounded-[4px] shadow-xs">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                    Published Papers
                  </span>
                  <p className="mt-2 font-serif text-4xl text-ink">
                    {publishedPapersCount}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("papers")}
                    className="mt-4 text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                  >
                    Manage SSRN Papers →
                  </button>
                </div>

                <div className="border border-ink/10 bg-white p-6 rounded-[4px] shadow-xs">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                    Published Articles
                  </span>
                  <p className="mt-2 font-serif text-4xl text-ink">
                    {publishedPostsCount}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("posts")}
                    className="mt-4 text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                  >
                    Manage Articles →
                  </button>
                </div>

                <div className="border border-ink/10 bg-white p-6 rounded-[4px] shadow-xs">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                    Article Drafts
                  </span>
                  <p className="mt-2 font-serif text-4xl text-ink">
                    {draftPostsCount}
                  </p>
                  <button
                    type="button"
                    onClick={startNewPost}
                    className="mt-4 text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                  >
                    + Write New Article →
                  </button>
                </div>

                <div className="border border-ink/10 bg-white p-6 rounded-[4px] shadow-xs">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                    Uploaded Media
                  </span>
                  <p className="mt-2 font-serif text-4xl text-ink">
                    {media.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("media")}
                    className="mt-4 text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                  >
                    Open Media Library →
                  </button>
                </div>
              </div>

              {/* Recent Content Panels */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent Articles */}
                <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-ink/10 flex items-center justify-between bg-[#FAF8F5]">
                    <h2 className="font-serif text-lg text-ink">
                      Recent Articles
                    </h2>
                    <button
                      type="button"
                      onClick={startNewPost}
                      className="inline-flex items-center gap-1 rounded-[3px] bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-graphite cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-gold" />
                      <span>Add New</span>
                    </button>
                  </div>
                  <div className="divide-y divide-ink/8">
                    {posts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${
                                post.status === "published"
                                  ? "bg-emerald-600"
                                  : "bg-amber-500"
                              }`}
                            />
                            <p className="font-serif text-base text-ink truncate">
                              {post.title}
                            </p>
                          </div>
                          <p className="mt-0.5 text-xs text-steel truncate">
                            {post.category} • {post.blocks?.length || 0} content
                            blocks
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditPost(post)}
                            className="rounded-[3px] border border-ink/15 px-2.5 py-1 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            Edit
                          </button>
                          <Link
                            href={`/insights/${post.slug}`}
                            target="_blank"
                            className="rounded-[3px] border border-ink/15 p-1.5 text-steel hover:text-ink"
                            title="View article"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Research Papers */}
                <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-ink/10 flex items-center justify-between bg-[#FAF8F5]">
                    <h2 className="font-serif text-lg text-ink">
                      Published Research / SSRN Papers
                    </h2>
                    <button
                      type="button"
                      onClick={startNewPaper}
                      className="inline-flex items-center gap-1 rounded-[3px] bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-graphite cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-gold" />
                      <span>Add Paper</span>
                    </button>
                  </div>
                  <div className="divide-y divide-ink/8">
                    {papers.map((paper) => (
                      <div
                        key={paper.id}
                        className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${
                                paper.status === "published"
                                  ? "bg-emerald-600"
                                  : "bg-amber-500"
                              }`}
                            />
                            <p className="font-serif text-base text-ink truncate">
                              {paper.title}
                            </p>
                          </div>
                          <p className="mt-0.5 text-xs text-steel truncate">
                            {paper.author}
                            {paper.subtitle ? ` — ${paper.subtitle}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditPaper(paper)}
                            className="rounded-[3px] border border-ink/15 px-2.5 py-1 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            Edit
                          </button>
                          {(paper.externalUrl || paper.pdfUrl) && (
                            <a
                              href={paper.externalUrl || paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-[3px] border border-ink/15 p-1.5 text-steel hover:text-ink"
                              title="Open paper link"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: ALL POSTS / ARTICLES LIST ── */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-ink/10 rounded-[4px]">
                <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="h-4 w-4 text-steel absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles by title, category..."
                      className="w-full rounded-[3px] border border-ink/15 pl-9 pr-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1 rounded-[3px] border border-ink/15 p-1 bg-[#FAF8F5]">
                    {(["all", "published", "draft"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1 rounded-[2px] text-xs font-medium capitalize cursor-pointer ${
                          statusFilter === st
                            ? "bg-ink text-white"
                            : "text-graphite hover:text-ink"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startNewPost}
                  className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-4 py-2.5 text-xs font-semibold text-ink hover:brightness-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Article</span>
                </button>
              </div>

              <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-ink/10 bg-[#FAF8F5] font-mono text-[11px] uppercase tracking-[0.12em] text-steel">
                        <th className="py-3.5 px-5">Title</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Author</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Blocks</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/8 text-sm">
                      {filteredPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="hover:bg-[#FAF8F5]/70 transition-colors"
                        >
                          <td className="py-4 px-5 max-w-md">
                            <button
                              type="button"
                              onClick={() => startEditPost(post)}
                              className="font-serif text-lg text-ink hover:text-gold-deep text-left font-medium cursor-pointer"
                            >
                              {post.title}
                            </button>
                            <p className="mt-1 text-xs text-steel line-clamp-1">
                              {post.excerpt}
                            </p>
                          </td>
                          <td className="py-4 px-4 text-xs font-mono text-graphite">
                            {post.category}
                          </td>
                          <td className="py-4 px-4 text-xs text-graphite">
                            {post.author}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                                post.status === "published"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  post.status === "published"
                                    ? "bg-emerald-600"
                                    : "bg-amber-500"
                                }`}
                              />
                              {post.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-steel">
                            {post.blocks?.length || 0}
                          </td>
                          <td className="py-4 px-5 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => startEditPost(post)}
                                className="inline-flex items-center gap-1 rounded-[3px] border border-ink/15 bg-white px-2.5 py-1.5 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href={`/insights/${post.slug}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 rounded-[3px] border border-ink/15 bg-white px-2.5 py-1.5 text-xs font-medium text-graphite hover:text-ink"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeletePost(post.id, post.title)
                                }
                                className="inline-flex items-center rounded-[3px] border border-red-200 bg-red-50/50 p-1.5 text-red-600 hover:bg-red-100 cursor-pointer"
                                title="Delete article"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredPosts.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-12 text-center text-sm text-steel"
                          >
                            No articles match your filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: WORDPRESS-LIKE BLOCK EDITOR FOR ARTICLES ── */}
          {activeTab === "post-editor" && (
            <div className="space-y-6">
              {/* Top Editor Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-ink/10 rounded-[4px] sticky top-0 z-20 shadow-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPostPreviewMode(false)}
                    className={`px-3.5 py-1.5 rounded-[3px] text-xs font-semibold cursor-pointer transition-colors ${
                      !postPreviewMode
                        ? "bg-ink text-white"
                        : "bg-[#FAF8F5] text-graphite hover:text-ink"
                    }`}
                  >
                    Block Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostPreviewMode(true)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[3px] text-xs font-semibold cursor-pointer transition-colors ${
                      postPreviewMode
                        ? "bg-ink text-white"
                        : "bg-[#FAF8F5] text-graphite hover:text-ink"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Live Article Preview</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSavePost("draft")}
                    className="rounded-[3px] border border-ink/20 bg-white px-4 py-2 text-xs font-semibold text-ink hover:border-ink cursor-pointer disabled:opacity-50"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSavePost("published")}
                    className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-5 py-2 text-xs font-semibold text-ink hover:brightness-95 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                    <span>
                      {saving
                        ? "Saving..."
                        : editingPost.id && editingPost.status === "published"
                          ? "Update Published Article"
                          : "Publish Article"}
                    </span>
                  </button>
                </div>
              </div>

              {postPreviewMode ? (
                /* Live Article Preview Canvas */
                <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden shadow-xs">
                  <div className="bg-ink px-8 py-12 text-white">
                    <div className="max-w-[760px] mx-auto">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                        {editingPost.category || "Perspectives"}
                      </span>
                      <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                        {editingPost.title || "Untitled Article"}
                      </h1>
                      {editingPost.excerpt && (
                        <p className="mt-4 font-serif text-xl italic text-gold-deep">
                          {editingPost.excerpt}
                        </p>
                      )}
                      <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-champagne/70">
                        By {editingPost.author || "J. Ayo Makinde"} •{" "}
                        {editingPost.readTime || "4 min read"}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 sm:p-12 max-w-[780px] mx-auto">
                    {editingPost.featuredImage && (
                      <figure className="mb-10 overflow-hidden rounded-[3px] border border-ink/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingPost.featuredImage}
                          alt={
                            editingPost.featuredImageAlt || editingPost.title
                          }
                          className="w-full max-h-[420px] object-cover"
                        />
                      </figure>
                    )}
                    <BlockRenderer blocks={editingPost.blocks} />
                  </div>
                </div>
              ) : (
                /* WordPress 2-Column Block Editor + Settings Sidebar */
                <div className="grid gap-6 lg:grid-cols-12 items-start">
                  {/* Left 8 Columns: Title, Excerpt & Content Blocks */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Post Title & Excerpt Card */}
                    <div className="border border-ink/10 bg-white p-6 sm:p-8 rounded-[4px] space-y-5">
                      <div>
                        <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                          Article Title
                        </label>
                        <input
                          type="text"
                          value={editingPost.title}
                          onChange={(e) => {
                            const title = e.target.value;
                            setEditingPost((prev) => ({
                              ...prev,
                              title,
                              slug: slugManuallyEdited
                                ? prev.slug
                                : slugify(title),
                            }));
                          }}
                          placeholder="Enter article title..."
                          className="w-full font-serif text-2xl sm:text-3xl text-ink border-b border-ink/15 pb-3 focus:border-gold-deep focus:outline-none"
                        />
                      </div>

                      {/* Permalink / Slug */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-steel bg-[#FAF8F5] px-3.5 py-2.5 rounded-[3px] border border-ink/8">
                        <span className="font-mono uppercase tracking-wider text-[10px] font-semibold text-graphite">
                          Permalink:
                        </span>
                        <span className="text-steel">/insights/</span>
                        <input
                          type="text"
                          value={editingPost.slug}
                          onChange={(e) => {
                            setSlugManuallyEdited(true);
                            setEditingPost((prev) => ({
                              ...prev,
                              slug: slugify(e.target.value),
                            }));
                          }}
                          placeholder="article-url-slug"
                          className="flex-1 min-w-[160px] bg-white border border-ink/15 rounded-[2px] px-2 py-1 font-mono text-xs text-ink focus:border-gold-deep focus:outline-none"
                        />
                      </div>

                      {/* Excerpt / Summary */}
                      <div>
                        <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                          Summary / Card Description (Shown on Insights Page)
                        </label>
                        <textarea
                          rows={2}
                          value={editingPost.excerpt}
                          onChange={(e) =>
                            setEditingPost((prev) => ({
                              ...prev,
                              excerpt: e.target.value,
                            }))
                          }
                          placeholder="Brief 1–2 sentence summary of this perspective or article..."
                          className="w-full rounded-[3px] border border-ink/15 p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Content Blocks Stack */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-graphite">
                          Article Content Blocks ({editingPost.blocks.length})
                        </span>
                        <span className="text-xs text-steel">
                          Add, reorder, or customize blocks below
                        </span>
                      </div>

                      {editingPost.blocks.map((block, index) => (
                        <div
                          key={block.id}
                          className="border border-ink/12 bg-white rounded-[4px] overflow-hidden shadow-2xs transition-all hover:border-gold-deep/50"
                        >
                          {/* Block Toolbar Header */}
                          <div className="bg-[#FAF8F5] border-b border-ink/8 px-4 py-2.5 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-gold-deep">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                                {block.type === "paragraph" && "Paragraph"}
                                {block.type === "heading" &&
                                  `Heading (H${block.level || 2})`}
                                {block.type === "image" && "Image"}
                                {block.type === "quote" && "Pullquote"}
                                {block.type === "list" &&
                                  `List (${block.listStyle === "ordered" ? "Numbered" : "Bulleted"})`}
                                {block.type === "callout" && "Callout Box"}
                                {block.type === "html" && "Custom HTML"}
                                {block.type === "divider" && "Signal Divider"}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveBlock(index, -1)}
                                disabled={index === 0}
                                className="p-1.5 text-steel hover:text-ink disabled:opacity-30 cursor-pointer"
                                title="Move block up"
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveBlock(index, 1)}
                                disabled={
                                  index === editingPost.blocks.length - 1
                                }
                                className="p-1.5 text-steel hover:text-ink disabled:opacity-30 cursor-pointer"
                                title="Move block down"
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => duplicateBlock(index)}
                                className="p-1.5 text-steel hover:text-ink cursor-pointer"
                                title="Duplicate block"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBlock(block.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                                title="Delete block"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Block Body Input */}
                          <div className="p-5">
                            {block.type === "paragraph" && (
                              <textarea
                                rows={4}
                                value={block.content || ""}
                                onChange={(e) =>
                                  updateBlock(block.id, {
                                    content: e.target.value,
                                  })
                                }
                                placeholder="Write paragraph text..."
                                className="w-full rounded-[3px] border border-ink/15 p-3 text-[16px] leading-relaxed text-ink focus:border-gold-deep focus:outline-none"
                              />
                            )}

                            {block.type === "heading" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono uppercase text-steel">
                                    Heading Level:
                                  </span>
                                  {([2, 3, 4] as const).map((lvl) => (
                                    <button
                                      key={lvl}
                                      type="button"
                                      onClick={() =>
                                        updateBlock(block.id, { level: lvl })
                                      }
                                      className={`px-2.5 py-1 rounded-[2px] font-mono text-xs font-semibold cursor-pointer ${
                                        (block.level || 2) === lvl
                                          ? "bg-ink text-white"
                                          : "bg-[#FAF8F5] text-graphite border border-ink/15"
                                      }`}
                                    >
                                      H{lvl}
                                    </button>
                                  ))}
                                </div>
                                <input
                                  type="text"
                                  value={block.content || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder="Enter section heading..."
                                  className="w-full font-serif text-xl sm:text-2xl text-ink rounded-[3px] border border-ink/15 p-3 focus:border-gold-deep focus:outline-none"
                                />
                              </div>
                            )}

                            {block.type === "image" && (
                              <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                  <label className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-3.5 py-2 text-xs font-semibold text-white hover:bg-graphite cursor-pointer">
                                    <Upload className="h-3.5 w-3.5 text-gold" />
                                    <span>
                                      {uploading
                                        ? "Uploading..."
                                        : "Upload Image"}
                                    </span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const url = await uploadFile(file);
                                          if (url) {
                                            updateBlock(block.id, {
                                              imageUrl: url,
                                            });
                                          }
                                        }
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    value={block.imageUrl || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        imageUrl: e.target.value,
                                      })
                                    }
                                    placeholder="Or paste image URL (/uploads/... or https://...)"
                                    className="flex-1 min-w-[220px] rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                                  />
                                </div>

                                {block.imageUrl && (
                                  <div className="overflow-hidden rounded-[3px] border border-ink/10 bg-[#FAF8F5] max-h-64 flex justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={block.imageUrl}
                                      alt={block.alt || "Preview"}
                                      className="max-h-60 w-auto object-contain"
                                    />
                                  </div>
                                )}

                                <div className="grid gap-3 sm:grid-cols-3">
                                  <input
                                    type="text"
                                    value={block.caption || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        caption: e.target.value,
                                      })
                                    }
                                    placeholder="Caption (optional)"
                                    className="rounded-[3px] border border-ink/15 px-3 py-2 text-xs focus:border-gold-deep focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={block.alt || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        alt: e.target.value,
                                      })
                                    }
                                    placeholder="Alt text for accessibility"
                                    className="rounded-[3px] border border-ink/15 px-3 py-2 text-xs focus:border-gold-deep focus:outline-none"
                                  />
                                  <select
                                    value={block.width || "normal"}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        width: e.target.value as
                                          | "normal"
                                          | "wide"
                                          | "full",
                                      })
                                    }
                                    className="rounded-[3px] border border-ink/15 px-3 py-2 text-xs focus:border-gold-deep focus:outline-none"
                                  >
                                    <option value="normal">
                                      Standard Width
                                    </option>
                                    <option value="wide">Wide Image</option>
                                    <option value="full">Full Width</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {block.type === "quote" && (
                              <div className="space-y-3">
                                <textarea
                                  rows={3}
                                  value={block.content || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder="Enter quotation or pullquote text..."
                                  className="w-full font-serif italic text-lg rounded-[3px] border border-ink/15 p-3 focus:border-gold-deep focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={block.attribution || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, {
                                      attribution: e.target.value,
                                    })
                                  }
                                  placeholder="Attribution / Speaker (e.g. J. Ayo Makinde)"
                                  className="w-full rounded-[3px] border border-ink/15 px-3 py-2 text-xs focus:border-gold-deep focus:outline-none"
                                />
                              </div>
                            )}

                            {block.type === "list" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono uppercase text-steel">
                                    List Type:
                                  </span>
                                  {(["unordered", "ordered"] as const).map(
                                    (style) => (
                                      <button
                                        key={style}
                                        type="button"
                                        onClick={() =>
                                          updateBlock(block.id, {
                                            listStyle: style,
                                          })
                                        }
                                        className={`px-3 py-1 rounded-[2px] text-xs font-medium cursor-pointer ${
                                          (block.listStyle || "unordered") ===
                                          style
                                            ? "bg-ink text-white"
                                            : "bg-[#FAF8F5] text-graphite border border-ink/15"
                                        }`}
                                      >
                                        {style === "unordered"
                                          ? "• Bullet List"
                                          : "1. Numbered List"}
                                      </button>
                                    ),
                                  )}
                                </div>

                                <div className="space-y-2">
                                  {(block.items || [""]).map((item, itemIdx) => (
                                    <div
                                      key={itemIdx}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="font-mono text-xs text-gold-deep w-5 text-right">
                                        {block.listStyle === "ordered"
                                          ? `${itemIdx + 1}.`
                                          : "•"}
                                      </span>
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                          const nextItems = [
                                            ...(block.items || [""]),
                                          ];
                                          nextItems[itemIdx] = e.target.value;
                                          updateBlock(block.id, {
                                            items: nextItems,
                                          });
                                        }}
                                        placeholder={`List item ${itemIdx + 1}...`}
                                        className="flex-1 rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const nextItems = (
                                            block.items || [""]
                                          ).filter((_, idx) => idx !== itemIdx);
                                          updateBlock(block.id, {
                                            items:
                                              nextItems.length > 0
                                                ? nextItems
                                                : [""],
                                          });
                                        }}
                                        className="p-1.5 text-steel hover:text-red-600 cursor-pointer"
                                        title="Remove list item"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateBlock(block.id, {
                                      items: [...(block.items || []), ""],
                                    })
                                  }
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                  <span>Add List Item</span>
                                </button>
                              </div>
                            )}

                            {block.type === "callout" && (
                              <div className="space-y-3 bg-champagne/25 p-4 border-l-4 border-gold-deep">
                                <input
                                  type="text"
                                  value={block.calloutTitle || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, {
                                      calloutTitle: e.target.value,
                                    })
                                  }
                                  placeholder="Callout Header (e.g. Key Insight)"
                                  className="w-full rounded-[3px] border border-ink/15 bg-white px-3 py-2 font-mono text-xs uppercase tracking-wider text-gold-deep focus:border-gold-deep focus:outline-none"
                                />
                                <textarea
                                  rows={3}
                                  value={block.content || ""}
                                  onChange={(e) =>
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder="Callout box message..."
                                  className="w-full rounded-[3px] border border-ink/15 bg-white p-3 font-serif text-base text-ink focus:border-gold-deep focus:outline-none"
                                />
                              </div>
                            )}

                            {block.type === "html" && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-[11px] uppercase text-steel">
                                    Raw HTML / Embed Code
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setHtmlPreviewIds((prev) => ({
                                        ...prev,
                                        [block.id]: !prev[block.id],
                                      }))
                                    }
                                    className="text-xs font-semibold text-gold-deep hover:underline cursor-pointer"
                                  >
                                    {htmlPreviewIds[block.id]
                                      ? "Edit HTML Code"
                                      : "Preview Rendered HTML"}
                                  </button>
                                </div>
                                {htmlPreviewIds[block.id] ? (
                                  <div
                                    className="rounded-[3px] border border-ink/15 bg-[#FAF8F5] p-4 prose max-w-none"
                                    dangerouslySetInnerHTML={{
                                      __html: block.content || "",
                                    }}
                                  />
                                ) : (
                                  <textarea
                                    rows={5}
                                    value={block.content || ""}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        content: e.target.value,
                                      })
                                    }
                                    placeholder="<div>Custom HTML, tables, or embeds...</div>"
                                    className="w-full rounded-[3px] border border-ink/15 bg-[#181512] p-3 font-mono text-xs text-champagne focus:border-gold-deep focus:outline-none"
                                  />
                                )}
                              </div>
                            )}

                            {block.type === "divider" && (
                              <div className="py-2 text-center text-xs font-mono uppercase tracking-widest text-gold-deep">
                                ─── Goldapples Signal Divider ───
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* WordPress Gutenberg-Style + Add Block Palette */}
                      <div className="border-2 border-dashed border-ink/15 bg-white/80 p-5 rounded-[4px]">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-steel mb-3">
                          + Insert Content Block
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => addBlock("paragraph")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Type className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Paragraph</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("heading")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <HeadingIcon className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Heading</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("image")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <ImageIcon className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Image</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("list")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <List className="h-3.5 w-3.5 text-gold-deep" />
                            <span>List</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("quote")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Quote className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Quote</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("callout")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Callout Box</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("html")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Code className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Custom HTML</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("divider")}
                            className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5 text-gold-deep" />
                            <span>Divider</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Columns: WordPress Document Settings Inspector */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Publishing & Metadata Box */}
                    <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden">
                      <div className="bg-[#FAF8F5] px-5 py-3.5 border-b border-ink/10 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink">
                        Article Settings
                      </div>
                      <div className="p-5 space-y-4 text-sm">
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-steel mb-1.5">
                            Status
                          </label>
                          <select
                            value={editingPost.status}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                status: e.target.value as "published" | "draft",
                              }))
                            }
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                          >
                            <option value="published">Published (Public)</option>
                            <option value="draft">Draft (Hidden)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-steel mb-1.5">
                            Category
                          </label>
                          <input
                            type="text"
                            list="goldapples-categories"
                            value={editingPost.category}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }))
                            }
                            placeholder="Select or type category..."
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                          />
                          <datalist id="goldapples-categories">
                            {DEFAULT_CATEGORIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-steel mb-1.5">
                            Author
                          </label>
                          <input
                            type="text"
                            value={editingPost.author}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                author: e.target.value,
                              }))
                            }
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-steel mb-1.5">
                            Reading Time
                          </label>
                          <input
                            type="text"
                            value={editingPost.readTime}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                readTime: e.target.value,
                              }))
                            }
                            placeholder="e.g. 5 min read"
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Featured Image Box */}
                    <div className="border border-ink/10 bg-white rounded-[4px] overflow-hidden">
                      <div className="bg-[#FAF8F5] px-5 py-3.5 border-b border-ink/10 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink">
                        Featured Image
                      </div>
                      <div className="p-5 space-y-4">
                        {editingPost.featuredImage ? (
                          <div className="space-y-3">
                            <div className="overflow-hidden rounded-[3px] border border-ink/10 bg-[#FAF8F5]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={editingPost.featuredImage}
                                alt={
                                  editingPost.featuredImageAlt || "Featured"
                                }
                                className="w-full h-44 object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setEditingPost((prev) => ({
                                  ...prev,
                                  featuredImage: "",
                                }))
                              }
                              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                            >
                              Remove Featured Image
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-ink/15 rounded-[3px] p-6 text-center bg-[#FAF8F5]">
                            <ImageIcon className="h-8 w-8 text-steel mx-auto mb-2" />
                            <p className="text-xs text-steel mb-3">
                              Upload a cover image for this article
                            </p>
                            <label className="inline-flex items-center gap-1.5 rounded-[3px] bg-ink px-3.5 py-2 text-xs font-semibold text-white hover:bg-graphite cursor-pointer">
                              <Upload className="h-3.5 w-3.5 text-gold" />
                              <span>
                                {uploading ? "Uploading..." : "Select Image"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadFile(file);
                                    if (url) {
                                      setEditingPost((prev) => ({
                                        ...prev,
                                        featuredImage: url,
                                      }));
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        )}

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-steel mb-1">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={editingPost.featuredImage}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                featuredImage: e.target.value,
                              }))
                            }
                            placeholder="/uploads/... or https://..."
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-1.5 text-xs focus:border-gold-deep focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-steel mb-1">
                            Image Alt Text
                          </label>
                          <input
                            type="text"
                            value={editingPost.featuredImageAlt}
                            onChange={(e) =>
                              setEditingPost((prev) => ({
                                ...prev,
                                featuredImageAlt: e.target.value,
                              }))
                            }
                            placeholder="Describe image..."
                            className="w-full rounded-[3px] border border-ink/15 px-3 py-1.5 text-xs focus:border-gold-deep focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 4: ALL RESEARCH PAPERS LIST ── */}
          {activeTab === "papers" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-ink/10 rounded-[4px]">
                <div className="relative flex-1 max-w-sm">
                  <Search className="h-4 w-4 text-steel absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search papers by title, subtitle, author..."
                    className="w-full rounded-[3px] border border-ink/15 pl-9 pr-3 py-2 text-sm focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={startNewPaper}
                  className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-4 py-2.5 text-xs font-semibold text-ink hover:brightness-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Research Paper</span>
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="border border-ink/10 bg-white p-6 sm:p-8 rounded-[4px] flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 border-b border-ink/10">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            paper.status === "published"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {paper.status}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-steel">
                          {paper.author}
                        </span>
                      </div>

                      <h3 className="mt-5 font-serif text-2xl text-ink">
                        {paper.title}
                      </h3>
                      {paper.subtitle && (
                        <p className="mt-1 font-serif text-base italic text-ink/75">
                          {paper.subtitle}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-graphite">
                        {paper.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditPaper(paper)}
                          className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-gold-deep cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit Paper</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeletePaper(paper.id, paper.title)
                          }
                          className="inline-flex items-center gap-1 rounded-[3px] border border-red-200 bg-red-50/50 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      {(paper.externalUrl || paper.pdfUrl) && (
                        <a
                          href={paper.externalUrl || paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-gold-deep hover:underline"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 5: RESEARCH PAPER EDITOR ── */}
          {activeTab === "paper-editor" && (
            <div className="max-w-3xl border border-ink/10 bg-white rounded-[4px] p-6 sm:p-10 shadow-xs space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Paper Title *
                  </label>
                  <input
                    type="text"
                    value={editingPaper.title}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g. Leadership Alignment Theory"
                    className="w-full font-serif text-2xl text-ink rounded-[3px] border border-ink/15 p-3 focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingPaper.subtitle}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                    placeholder="e.g. Aligning Leadership Intent, Communication Delivery, and Emotional Intelligence"
                    className="w-full rounded-[3px] border border-ink/15 p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Author(s)
                  </label>
                  <input
                    type="text"
                    value={editingPaper.author}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    placeholder="J. Ayo Makinde"
                    className="w-full rounded-[3px] border border-ink/15 p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Publication Status
                  </label>
                  <select
                    value={editingPaper.status}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        status: e.target.value as "published" | "draft",
                      }))
                    }
                    className="w-full rounded-[3px] border border-ink/15 p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
                  >
                    <option value="published">Published (Visible on Insights)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Abstract / Description *
                  </label>
                  <textarea
                    rows={4}
                    value={editingPaper.description}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Concise summary of the research paper..."
                    className="w-full rounded-[3px] border border-ink/15 p-3 text-sm leading-relaxed text-ink focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    External SSRN / Journal URL
                  </label>
                  <input
                    type="url"
                    value={editingPaper.externalUrl}
                    onChange={(e) =>
                      setEditingPaper((prev) => ({
                        ...prev,
                        externalUrl: e.target.value,
                      }))
                    }
                    placeholder="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=..."
                    className="w-full rounded-[3px] border border-ink/15 p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel mb-2">
                    Or Upload / Link PDF Document
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:bg-graphite cursor-pointer">
                      <Upload className="h-3.5 w-3.5 text-gold" />
                      <span>
                        {uploading ? "Uploading PDF..." : "Upload PDF File"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadFile(file);
                            if (url) {
                              setEditingPaper((prev) => ({
                                ...prev,
                                pdfUrl: url,
                              }));
                            }
                          }
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingPaper.pdfUrl}
                      onChange={(e) =>
                        setEditingPaper((prev) => ({
                          ...prev,
                          pdfUrl: e.target.value,
                        }))
                      }
                      placeholder="/uploads/paper.pdf or https://..."
                      className="flex-1 min-w-[220px] rounded-[3px] border border-ink/15 p-2.5 text-sm text-ink focus:border-gold-deep focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("papers")}
                  className="rounded-[3px] border border-ink/15 px-4 py-2.5 text-xs font-semibold text-graphite hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSavePaper("draft")}
                  className="rounded-[3px] border border-ink/20 bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:border-ink cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSavePaper("published")}
                  className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-6 py-2.5 text-xs font-semibold text-ink hover:brightness-95 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>
                    {saving ? "Saving..." : "Publish Research Paper"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 6: MEDIA LIBRARY ── */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="border border-ink/10 bg-white p-6 rounded-[4px] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl text-ink">
                    Upload Images &amp; PDF Documents
                  </h2>
                  <p className="text-xs text-steel mt-1">
                    Uploaded files are stored in <code>/public/uploads</code> and
                    can be used in articles, featured images, or research papers.
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 rounded-[3px] bg-gradient-to-br from-gold-deep to-gold px-5 py-2.5 text-xs font-semibold text-ink hover:brightness-95 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>
                    {uploading ? "Uploading..." : "Upload File (Image or PDF)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf,application/pdf"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await uploadFile(file);
                      }
                    }}
                  />
                </label>
              </div>

              {media.length === 0 ? (
                <div className="border border-ink/10 bg-white p-12 text-center rounded-[4px]">
                  <ImageIcon className="h-10 w-10 text-steel/60 mx-auto mb-3" />
                  <p className="font-serif text-lg text-ink">
                    No media files uploaded yet
                  </p>
                  <p className="text-xs text-steel mt-1">
                    Upload images or PDFs above to use them across your Insights
                    posts and papers.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {media.map((item) => (
                    <div
                      key={item.id}
                      className="border border-ink/10 bg-white rounded-[4px] overflow-hidden flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] bg-[#FAF8F5] flex items-center justify-center overflow-hidden border-b border-ink/8">
                        {item.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <BookOpen className="h-10 w-10 text-gold-deep mx-auto mb-2" />
                            <span className="font-mono text-[11px] uppercase text-steel">
                              PDF Document
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <p
                          className="text-xs font-medium text-ink truncate"
                          title={item.name}
                        >
                          {item.name}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              showToast("success", "Copied URL to clipboard!");
                            }}
                            className="inline-flex items-center gap-1 rounded-[2px] border border-ink/15 px-2.5 py-1 text-[11px] font-mono text-ink hover:border-gold-deep cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copy URL</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMedia(item.id)}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                            title="Delete file"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

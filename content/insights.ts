export const insightsIntro = {
  eyebrow: "Research & Perspectives",
  heading: "Insights",
  lead: "Think deeper. Communicate better.",
  paragraphs: [
    "Why can two people hear the same message and take away different meanings? Why do sound strategies stumble after the announcement? And how can we understand each other without necessarily agreeing?",
    "Here, we explore those questions through published research, original frameworks and practical perspectives.",
  ],
};

export const ssrnPapers = {
  eyebrow: "Published Research",
  heading: "Papers Available on SSRN",
  items: [
    {
      title: "Leadership Alignment Theory",
      subtitle:
        "Aligning Leadership Intent, Communication Delivery, and Emotional Intelligence",
      author: "J. Ayo Makinde",
      description:
        "A conceptual paper exploring the relationship between leadership intent, communication delivery, emotional intelligence and leadership effectiveness.",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6841866",
    },
    {
      title: "Communication to Execution (C2E)",
      subtitle: "",
      author: "J. Ayo Makinde",
      description:
        "Examines the path from leadership intention and communication to interpretation, alignment and organisational action.",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7155258",
    },
  ],
};

export const originalFrameworks = {
  eyebrow: "Applied Methodology",
  heading: "Original Frameworks and Tools",
  items: [
    {
      title: "M.E.A.N.I.N.G. Framework",
      description:
        "A practical lens for understanding how messages move from intention to interpretation and action.",
    },
    {
      title: "Leadership Alignment Framework",
      description:
        "A diagnostic approach to leadership intent, communication behaviour and emotional intelligence.",
    },
    {
      title: "Leadership Communication Alignment Gap Map",
      description:
        "A visual tool for examining where leadership communication becomes misaligned and what that may mean for others.",
    },
  ],
  note: "These are developing Goldapples frameworks and tools, not presented as independently validated models.",
};

export const perspectives = {
  eyebrow: "Reflections",
  heading: "Perspectives Worth Exploring",
  items: [
    {
      title: "Understanding without agreement",
      description:
        "Why understanding another person's position is not the same as accepting it.",
    },
    {
      title: "The hidden cost of unclear communication",
      description:
        "How ambiguity can affect decisions, coordination and performance.",
    },
    {
      title: "Stories that make development real",
      description:
        "Why public-interest work needs human meaning as well as technical accuracy.",
    },
    {
      title: "The communication responsibility of leadership",
      description:
        "How decisions are heard, interpreted and experienced beyond the leader's intention.",
    },
  ],
};

export const insightsCta = {
  heading: "Think deeper. Communicate better.",
  primaryCta: { label: "Explore Our Research", href: "#ssrn-papers" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
};

export type InsightCategory = {
  id: string;
  label: string;
  description: string;
};

export type InsightArticle = {
  title: string;
  category: string;
  description?: string;
};

export const categories: InsightCategory[] = [
  {
    id: "research",
    label: "Published Research",
    description: "Papers available on SSRN exploring leadership alignment and execution.",
  },
  {
    id: "frameworks",
    label: "Original Frameworks",
    description: "Developing Goldapples frameworks and diagnostic tools.",
  },
  {
    id: "perspectives",
    label: "Perspectives",
    description: "Practical perspectives on understanding, clarity and leadership responsibility.",
  },
];

export const articles: InsightArticle[] = [
  ...ssrnPapers.items.map((item) => ({
    title: item.title,
    category: "research",
    description: item.description,
  })),
  ...originalFrameworks.items.map((item) => ({
    title: item.title,
    category: "frameworks",
    description: item.description,
  })),
  ...perspectives.items.map((item) => ({
    title: item.title,
    category: "perspectives",
    description: item.description,
  })),
];


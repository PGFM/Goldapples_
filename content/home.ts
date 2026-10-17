export const hero = {
  lead: "A decision is made. A message goes out. What people understand shapes what happens next.",
  heading: "Communication shapes what happens next.",
  body: "Goldapples helps leaders, institutions and development organisations find the communication gaps behind stalled execution, weakened trust and missed opportunities, then design better ways forward.",
  primaryCta: { label: "Discuss Your Communication Challenge", href: "/contact" },
  secondaryCta: { label: "Explore Our Work", href: "/work-and-impact" },
};

export const openingBelief = {
  heading: "The message was clear. Or was it?",
  scenarios: [
    "Your strategy makes sense in the boardroom. At go time, teams have three different interpretations.",
    "A reform promises progress, but citizens are unsure what it means.",
    "A development programme is active, yet the people it serves feel left out.",
  ],
  turn: "The message went out. The meaning did not always arrive.",
  closing:
    "We help close the gap between what is intended, what is understood and what gets done.",
};

export const familiarChallenges = {
  eyebrow: "Does any of this sound familiar?",
  heading: "Different organisations. Familiar communication challenges.",
  items: [
    {
      title: "For CEOs and Executive Teams",
      description:
        "You've set the direction. But is everyone interpreting it the same way? We help bridge the gap between leadership intention, team understanding and execution.",
    },
    {
      title: "For Corporate Organisations",
      description:
        "When teams work in silos, customers receive mixed signals or decisions get lost in translation, and performance suffers. We help identify communication gaps that affect productivity, service and results.",
    },
    {
      title: "For Government and Public Institutions",
      description:
        "A good policy is one thing. Getting people to understand, trust and implement it is another. We help institutions communicate decisions, engage stakeholders and strengthen public confidence.",
    },
    {
      title: "For Development Partners and Civil Society",
      description:
        "A programme's success goes beyond activities and deliverables. We use strategic communication, storytelling and community engagement to connect development priorities with the people they are meant to serve.",
    },
  ],
};

export const corePracticeAreas = [
  {
    number: "01",
    title: "Communication Advisory",
    description:
      "Get to the real problem before commissioning another campaign, speech or workshop. We work on leadership communication, organisational alignment, stakeholder engagement and public trust.",
    cta: { label: "Explore Advisory", href: "/advisory" },
  },
  {
    number: "02",
    title: "Goldapples Communication Academy",
    description:
      "Help leaders and teams communicate more effectively when it matters. Practical masterclasses, leadership labs, simulations and tailored learning turn ideas into skills they can use.",
    cta: { label: "Explore the Academy", href: "/academy" },
  },
  {
    number: "03",
    title: "Development Communication",
    description:
      "Make development real to people. We connect public-interest priorities to lived experiences through communication strategy, human-centred storytelling and purposeful media engagement.",
    cta: {
      label: "Explore Development Communication",
      href: "/development-communication",
    },
  },
];

export const ourThinking = {
  heading: "We diagnose before we prescribe.",
  body: "The problem may not be the message. It may be trust, interpretation, unclear direction or weak feedback. We investigate first, then help design the response that fits.",
  frameworks: ["Diagnose", "Clarify", "Design", "Deliver", "Review"],
  cta: { label: "See How We Work", href: "/advisory" },
};

export const whatWeDo = {
  eyebrow: "A bigger idea behind our work",
  heading: "Communication is the operating system of human relations.",
  paragraphs: [
    "We believe communicating better begins with understanding communication itself. That means listening, acting responsibly and recognising a vital distinction: mutual understanding does not mean mutual agreement.",
  ],
  cta: { label: "Explore Our Thinking", href: "/frameworks" },
};

export const finalCta = {
  heading: "What's getting lost between intention and action?",
  body: "Tell us the challenge. We will help you work out where to begin.",
  cta: { label: "Discuss a Communication Challenge", href: "/contact" },
};

// Kept for backwards compatibility with unused home section components
export const whoWeWorkWith = {
  body: "",
  closing: "",
  tags: [] as string[],
};

export const featuredProgrammes = {
  intro: "",
  programmes: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  industryModulesIntro: "",
  industryModules: [] as { sector: string; description: string }[],
  industryModulesClosing: "",
  cta: { label: "", href: "/contact" },
};

export const workImpactTeaser = {
  heading: "",
  body: "",
  caseStudies: [] as string[],
  cta: { label: "", href: "/work-and-impact" },
};

export const whyGoldapples = {
  heading: familiarChallenges.heading,
  body: "",
  points: [] as string[],
  closing: "",
};

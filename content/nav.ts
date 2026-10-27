export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type ServiceCategory = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "advisory",
    label: "Advisory",
    href: "/advisory",
    description: "Communication strategy and diagnostics for leaders and public institutions.",
  },
  {
    id: "academy",
    label: "Academy",
    href: "/academy",
    description: "Executive communication training, masterclasses, and leadership labs.",
  },
  {
    id: "development-communication",
    label: "Development Communication",
    href: "/development-communication",
    description: "Strategic communication for social impact, reform, and behaviour change.",
  },
  {
    id: "frameworks",
    label: "Frameworks",
    href: "/frameworks",
    description: "Proprietary diagnostic tools for meaning, alignment, and performance.",
  },
];

export const mentorshipCategories: ServiceCategory[] = [
  {
    id: "communication-intelligence-mentorship",
    label: "Communication Intelligence Mentorship",
    href: "/communication-intelligence-mentorship",
    description:
      "A selective mentorship experience for media, communication, and emerging leadership professionals.",
  },
  {
    id: "executive-communication-intelligence",
    label: "Executive Communication Intelligence",
    href: "/executive-communication-intelligence",
    description:
      "Private advisory and coaching experience for senior leaders whose communication carries consequences.",
  },
];

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Work and Impact", href: "/work-and-impact" },
  { label: "Insights", href: "/insights" },
];

export const bookConsultationCta = { label: "Book a Consultation", href: "/contact" };

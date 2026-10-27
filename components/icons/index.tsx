import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Diagnose — compass/crosshair */
export function IconDiagnose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Clarify — message with a resolving arrow */
export function IconClarify(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h13a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H10l-4 3.5V15H6a2 2 0 0 1-2-2V5.5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

/** Design — blueprint / grid */
export function IconDesign(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 9.5h16M9.5 4v16" />
      <circle cx="15" cy="14.5" r="2.2" />
    </svg>
  );
}

/** Deliver — forward-moving arrow */
export function IconDeliver(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/** Review — check inside a circle */
export function IconReview(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.6 2.6 5-5.2" />
    </svg>
  );
}

/** Advisory — scale / balance */
export function IconAdvisory(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v16M8 20h8" />
      <path d="M12 6.5 5 8.5M12 6.5l7 2" />
      <path d="M5 8.5 2.7 13a2.5 2.5 0 0 0 4.6 0L5 8.5ZM19 10.5l-2.3 4.5a2.5 2.5 0 0 0 4.6 0L19 10.5Z" />
    </svg>
  );
}

/** Academy — graduation cap */
export function IconAcademy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
      <path d="M6.5 11.6v4.2c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4.2" />
      <path d="M21 9.5v5" />
    </svg>
  );
}

/** Development Communication — globe / network */
export function IconDevelopment(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.3 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.3-4-8.5s1.4-6.1 4-8.5Z" />
    </svg>
  );
}

/** Media & Narrative — megaphone */
export function IconMedia(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10.5v3a1 1 0 0 0 1 1h2l1.5 5H10l-1-5h1l9 3.5v-11L10 10H4a1 1 0 0 0-1 .5Z" />
      <path d="M19 8.5a4 4 0 0 1 0 7" />
    </svg>
  );
}

/** Government / public institution — shield */
export function IconGovernment(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7.5 3v5.2c0 4.6-3.2 8.3-7.5 9.8-4.3-1.5-7.5-5.2-7.5-9.8V6L12 3Z" />
      <path d="M9 12l2.2 2.2L15.5 9.5" />
    </svg>
  );
}

/** Crisis / high-stakes — pulse line */
export function IconCrisis(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 12h3l1.8-3.6L13 15.6 14.6 12H18" />
    </svg>
  );
}

/** Communication diagnostics — magnifier over a document */
export function IconDiagnostics(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5h9l3 3V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M8 9h6M8 12.2h4" />
      <circle cx="14" cy="16" r="3" />
      <path d="M16.3 18.3 18.5 20.5" />
    </svg>
  );
}

/** Meaning / interpretation — layered signal waves */
export function IconMeaning(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15.5c2-3 4-4.5 8-4.5s6 1.5 8 4.5" />
      <path d="M6.5 12c1.4-2 3-3 5.5-3s4.1 1 5.5 3" />
      <circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Leadership alignment — parallel aligned arrows */
export function IconAlignment(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h13M4 12h13M4 16h13" />
      <path d="M15 5.5 19.5 8 15 10.5M15 13.5l4.5 2.5-4.5 2.5" />
    </svg>
  );
}

/** Simulation / lab — beaker with waveform */
export function IconLab(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 3.5h5M10.2 3.5v5.8L5.8 17a2 2 0 0 0 1.7 3h9a2 2 0 0 0 1.7-3l-4.4-7.7V3.5" />
      <path d="M7.5 15.5h9" />
    </svg>
  );
}

/** Frameworks / systems thinking — connected nodes */
export function IconFramework(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="5" cy="7" r="2.2" />
      <circle cx="19" cy="7" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M6.9 8.3 10.4 16.3M17.1 8.3 13.6 16.3M7.2 7h9.6" />
    </svg>
  );
}


/** Mentorship — mentor & mentee with guiding star */
export function IconMentorship(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9.5" r="2.2" />
      <path d="M15 19.5c.3-2.1 1.8-3.7 4-4" />
      <path d="M17 3l.6 1.4L19 5l-1.4.6L17 7l-.6-1.4L15 5l1.4-.6L17 3Z" />
    </svg>
  );
}

/** Executive Communication Intelligence — executive compass & crown emblem */
export function IconExecutiveIntelligence(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

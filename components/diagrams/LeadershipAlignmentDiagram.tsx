const lanes = [
  "Leadership Intent",
  "Message Clarity",
  "Internal Interpretation",
  "Behavioural Consistency",
  "Stakeholder Trust",
  "Execution Outcomes",
];

export function LeadershipAlignmentDiagram() {
  return (
    <svg
      viewBox="0 0 520 140"
      className="w-full h-auto max-w-full"
      role="img"
      aria-label="Diagram: six parallel lanes representing alignment across intent, message, interpretation, behaviour, trust, and execution."
    >
      {lanes.map((lane, i) => {
        const y = 15 + i * 22;
        return (
          <g key={lane} className="group cursor-default">
            <line
              x1="130"
              y1={y}
              x2="490"
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#12100D]/55 group-hover:text-[#B98F3E] transition-all duration-300"
            />
            <path
              d={`M482 ${y - 4} L490 ${y} L482 ${y + 4}`}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-[#B98F3E] group-hover:translate-x-1 transition-all duration-300"
            />
            <text
              x="0"
              y={y + 4}
              className="fill-[#12100D] group-hover:fill-[#B98F3E] font-sans text-[11px] font-semibold tracking-wide transition-colors duration-300"
            >
              {lane}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

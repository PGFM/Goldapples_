const stages = ["Message", "Passed", "Received", "Interpreted", "Acted Upon"];

export function MeaningFrameworkDiagram() {
  const stepWidth = 520 / stages.length;
  return (
    <svg
      viewBox="0 0 520 140"
      className="w-full h-auto max-w-full"
      role="img"
      aria-label="Diagram: a message narrows from being sent to being passed, received, interpreted and finally acted upon."
    >
      {stages.map((stage, i) => {
        const x = stepWidth * i + stepWidth / 2;
        const width = stepWidth * 0.72 * (1 - i * 0.08);
        const isLast = i === stages.length - 1;
        return (
          <g key={stage}>
            <rect
              x={x - width / 2}
              y={60 - width / 2.6}
              width={width}
              height={width / 1.3}
              stroke={isLast ? "#B98F3E" : "#12100D"}
              strokeWidth="1.5"
              fill="none"
            />
            {i < stages.length - 1 && (
              <line
                x1={x + width / 2}
                y1={60}
                x2={x + stepWidth - width / 2}
                y2={60}
                stroke="#12100D"
                strokeWidth="1.5"
                opacity={0.5}
              />
            )}
            <text
              x={x}
              y={110}
              textAnchor="middle"
              className={`font-sans text-[11px] ${isLast ? "fill-ink font-semibold" : "fill-steel"}`}
            >
              {stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

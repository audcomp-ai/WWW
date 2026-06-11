// Angled SVG divider between sections.
// Place between two sections to create a diagonal edge.
// "from" = color of the section above, "to" = color of the section below.
// flip: false = angle slopes up-left to down-right; true = mirror image.
export function SectionAngle({
  from,
  to,
  flip = false,
  height = 72,
}: {
  from: string;
  to: string;
  flip?: boolean;
  height?: number;
}) {
  return (
    <svg
      viewBox={`0 0 1440 ${height}`}
      preserveAspectRatio="none"
      className="block w-full"
      style={{ height, marginBottom: -1 }}
      aria-hidden="true"
    >
      <rect width="1440" height={height} fill={from} />
      {flip ? (
        <polygon points={`0,0 1440,${height} 0,${height}`} fill={to} />
      ) : (
        <polygon points={`1440,0 1440,${height} 0,${height}`} fill={to} />
      )}
    </svg>
  );
}

// Curved wave divider between sections.
// Replaces sharp diagonal cuts with smooth rounded arches/waves.
// "from" = color of the section above, "to" = color of the section below.
// flip: false = arch (dome rises up); true = valley (dips down in center).
export function SectionAngle({
  from,
  to,
  flip = false,
  height = 80,
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
        // Valley: "to" fills from a downward-curving V at the top to the bottom
        <path
          d={`M0,0 Q720,${height} 1440,0 L1440,${height} L0,${height} Z`}
          fill={to}
        />
      ) : (
        // Arch: "to" fills an arch/dome shape peaking at the center top
        <path
          d={`M0,${height} Q720,0 1440,${height} Z`}
          fill={to}
        />
      )}
    </svg>
  );
}

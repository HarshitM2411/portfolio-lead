type SparklineProps = {
  trend: "up" | "down";
  className?: string;
};

export function Sparkline({ trend, className }: SparklineProps) {
  if (trend === "down") {
    return (
      <svg
        className={className}
        preserveAspectRatio="none"
        viewBox="0 0 100 24"
        aria-hidden
      >
        <path
          d="M0 4 Q 25 6, 45 14 T 75 18 T 100 22"
          fill="none"
          stroke="#0D9488"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <path
          d="M0 4 Q 25 6, 45 14 T 75 18 T 100 22 L 100 24 L 0 24 Z"
          fill="rgba(13, 148, 136, 0.08)"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 100 24"
      aria-hidden
    >
      <path
        d="M0 18 Q 20 22, 35 12 T 65 8 T 85 4 L 100 2"
        fill="none"
        stroke="#0284C7"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M0 18 Q 20 22, 35 12 T 65 8 T 85 4 L 100 2 L 100 24 L 0 24 Z"
        fill="rgba(2, 132, 199, 0.08)"
      />
    </svg>
  );
}

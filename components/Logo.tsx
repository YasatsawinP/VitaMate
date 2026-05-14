interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 28, color = "#6E8961" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill="#EEF2E5" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M22 9c-7 0-12 4-12 10 0 1 .4 2 1 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 9c0 6-3 11-9 11-1 0-2-.2-3-1" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 22l7-7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

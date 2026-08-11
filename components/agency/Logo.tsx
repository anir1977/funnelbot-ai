/**
 * FunnelsLibrary mark — three stacked bars narrowing downward.
 * Reads as both a funnel and a stack of shelved volumes; stays legible at 16px.
 */
export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8.5" fill="#2563EB" />
      <rect x="7" y="8.5" width="18" height="3.2" rx="1.6" fill="white" />
      <rect x="9.6" y="14.4" width="12.8" height="3.2" rx="1.6" fill="white" fillOpacity="0.85" />
      <rect x="12.2" y="20.3" width="7.6" height="3.2" rx="1.6" fill="white" fillOpacity="0.7" />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  className = "",
  markClassName = "w-9 h-9",
}: {
  /** "dark" = dark text for light backgrounds, "light" = white text for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span
        className={`font-black text-[17px] tracking-[-0.02em] ${
          variant === "light" ? "text-white" : "text-slate-900"
        }`}
      >
        Funnels<span className="text-blue-600">Library</span>
      </span>
    </span>
  );
}

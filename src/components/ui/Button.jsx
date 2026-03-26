import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all active:translate-y-[2px] active:shadow-none border-brand-black disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

  const variants = {
    primary:
      "bg-brand-yellow text-brand-black border-2 shadow-retro hover:-translate-y-0.5 hover:shadow-retro-lg",
    secondary:
      "bg-brand-black text-brand-white border-2 shadow-retro hover:-translate-y-0.5 hover:shadow-retro-lg",
    ghost:
      "bg-transparent text-brand-black border-2 border-transparent hover:bg-brand-yellow/20 hover:border-brand-black",
    destructive:
      "bg-brand-red text-white border-2 shadow-retro hover:-translate-y-0.5 hover:shadow-retro-lg",
    outline:
      "bg-white text-brand-black border-2 shadow-retro hover:-translate-y-0.5 hover:shadow-retro-lg",
    pill: "bg-brand-yellow text-brand-black rounded-full border border-black/5 hover:scale-[1.02] shadow-sm hover:shadow-md",
    modern:
      "bg-white text-brand-black rounded-xl border border-black/5 hover:scale-[1.02] shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2 aspect-square",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

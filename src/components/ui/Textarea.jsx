import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Textarea({
  label,
  description,
  error,
  rows = 6,
  className,
  id,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-left text-sm font-bold text-brand-black"
        >
          {label}
        </label>
      )}
      {description && (
        <span className="text-xs text-brand-gray font-medium">
          {description}
        </span>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          "w-full rounded-none border-2 border-brand-black bg-white px-3 py-2",
          "text-base font-medium text-brand-black placeholder:text-brand-black/40",
          "shadow-retro transition-all",
          "focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:translate-y-[1px] focus:shadow-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-brand-red focus:ring-brand-red/50",
        )}
        {...props}
      />
      {error && (
        <span className="text-xs font-bold text-brand-red" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

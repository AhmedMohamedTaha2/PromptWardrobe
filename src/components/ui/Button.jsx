export function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}) {
  const styles = {
    primary:
      "bg-yellow-300 text-black border-2 border-black shadow-[4px_4px_0_#000]",
    secondary:
      "bg-black text-white border-2 border-black shadow-[4px_4px_0_#000]",
    ghost: "bg-white text-black border-2 border-dashed border-black",
    destructive:
      "bg-red-500 text-white border-2 border-black shadow-[4px_4px_0_#000]",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-semibold tracking-tight transition-transform active:translate-y-[1px] ${styles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
          aria-hidden
        />
      )}
      <span>{children}</span>
    </button>
  );
}

export function Select({ label, description, error, children, ...props }) {
  return (
    <label className="flex flex-col gap-1 text-left text-sm font-medium text-slate-900">
      {label && <span>{label}</span>}
      {description && (
        <span className="text-xs text-slate-500">{description}</span>
      )}
      <select
        className="w-full rounded-none border-2 border-black bg-white px-3 py-2 text-base font-medium text-slate-900 shadow-[3px_3px_0_#000] focus:outline-none focus:ring-2 focus:ring-black"
        {...props}
      >
        {children}
      </select>
      {error && (
        <span className="text-xs font-semibold text-red-600">{error}</span>
      )}
    </label>
  );
}

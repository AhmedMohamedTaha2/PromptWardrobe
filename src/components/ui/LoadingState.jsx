export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-none border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000]">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"
        aria-hidden
      />
      <span className="font-semibold text-slate-900">{label}</span>
    </div>
  );
}

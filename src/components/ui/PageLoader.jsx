// PageLoader.jsx
// Use at route level when the entire page is loading
// A full-page centered loading spinner for route-level loading.
// Must feel NeoBrutalist — bold, geometric, no soft spinners.

export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="min-h-[50vh] w-full bg-transparent flex flex-col items-center justify-center gap-6 p-10">
      {/* Brutalist spinner: rotating square */}
      <div
        className="w-12 h-12 border-4 border-black bg-yellow-300 animate-spin"
        style={{ animationDuration: "0.7s" }}
      />
      <p className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        {message}
      </p>
    </div>
  );
}

// Usage in __root.jsx or any route:
// if (isLoading) return <PageLoader message="Fetching your prompts..." />;

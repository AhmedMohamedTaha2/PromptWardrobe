// PromptCardSkeleton.jsx
// Shown in PromptList while useQuery isLoading === true
// A skeleton placeholder for a PromptCard while the prompt list is loading.
// Must match NeoBrutalism style: thick border, hard shadow, flat color blocks.

export function PromptCardSkeleton() {
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 rounded-none flex flex-col gap-3 h-full">
      {/* Title bar */}
      <div className="h-7 w-3/4 bg-gray-200 border border-black animate-pulse" />

      {/* Content lines */}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="h-3 w-full bg-gray-100 border border-black animate-pulse" />
        <div className="h-3 w-5/6 bg-gray-100 border border-black animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-100 border border-black animate-pulse" />
      </div>

      {/* Footer: badge + rating */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-6 w-20 bg-yellow-100 border border-black animate-pulse" />
        <div className="h-4 w-20 bg-gray-100 border border-black animate-pulse" />
      </div>
    </div>
  );
}

// Usage in PromptList.jsx:
// if (isLoading) return (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {Array.from({ length: 6 }).map((_, i) => <PromptCardSkeleton key={i} />)}
//   </div>
// );

// ProfileHeaderSkeleton.jsx
// Shown in routes/profile/$userId while profile data is loading
// Skeleton for the public profile page header while profile data loads.

export function ProfileHeaderSkeleton() {
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4">
      {/* Avatar + name row */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-16 h-16 border-2 border-black bg-gray-200 animate-pulse flex-shrink-0 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-8 w-48 bg-gray-200 border border-black animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 border border-black animate-pulse" />
        </div>
        {/* Button placeholder */}
        <div className="h-10 w-32 bg-gray-200 border border-black animate-pulse self-start md:self-center" />
      </div>

      {/* Stats row: followers, following, prompts */}
      <div className="flex gap-4 mt-2">
        {/* Three stats */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-4 w-24 bg-gray-100 border border-black animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

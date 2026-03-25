// EmptyState.jsx
// Shown when a list has zero items
// EmptyState component for when a user has no prompts yet, or a search returns
// zero results. Must guide the user to take action.

import { Inbox } from "lucide-react";

/**
 * @param {{ title: string, description: string, action?: { label: string, onClick: () => void } }} props
 */
export function EmptyState({ title, description, action }) {
  return (
    <div className="border-2 border-black bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-10 flex flex-col items-center gap-4 text-center my-4">
      <div className="border-2 border-black bg-yellow-300 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <Inbox className="w-8 h-8 text-black stroke-[2.5]" />
      </div>

      <h3 className="font-mono font-black text-base uppercase tracking-wider">
        {title || "Nothing here yet"}
      </h3>

      <p className="font-mono text-xs text-gray-600 max-w-xs">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 border-2 border-black bg-black text-white px-5 py-2 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:text-black hover:border-black transition-colors cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Usage (no prompts):
// <EmptyState
//   title="No prompts yet"
//   description="Your wardrobe is empty. Start building your collection."
//   action={{ label: "Create your first prompt", onClick: () => navigate({ to: "/dashboard/new" }) }}
// />

// Usage (search returns nothing):
// <EmptyState
//   title="No results found"
//   description={`No prompts matched "${searchQuery}". Try a different keyword.`}
// />

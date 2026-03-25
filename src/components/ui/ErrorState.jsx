// ErrorState.jsx
// Inline error display for failed useQuery calls
// A reusable inline ErrorState component for when a useQuery call fails.
// Shows the error message and a retry button. Used inside lists and detail views.

import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorState({
  title = "Error",
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="border-2 border-black bg-red-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center gap-4 text-center my-4">
      <AlertTriangle className="w-8 h-8 text-red-600 stroke-[2.5]" />

      <div className="space-y-1">
        <h3 className="font-mono font-black text-sm uppercase tracking-wider text-black">
          {title}
        </h3>
        <p className="font-mono text-xs text-gray-700">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Try Again
        </button>
      )}
    </div>
  );
}

// Usage:
// const { data, isError, error, refetch } = useQuery(...)
// if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

// ErrorBoundary.jsx
// Wraps any subtree to catch render errors gracefully.
// A React Error Boundary class component that catches render errors,
// fires a Sonner toast, and shows a fallback UI. Exported with a
// functional wrapper for clean JSX usage.
// Usage: <ErrorBoundary><YourComponent /></ErrorBoundary>

import { Component } from "react";
import { toast } from "sonner";
import { ServerCrash, RefreshCw } from "lucide-react";

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Fire a Sonner toast so the user is always notified
    toast.error("Something went wrong. Please try refreshing.");

    // Log for debugging — swap with Sentry/LogRocket in production
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
    // If usage requires triggering a retry of a parent query, it might be harder here
    // but typically we just reset the error boundary state and let the component re-render.
  }

  render() {
    if (this.state.hasError) {
      // Allow custom fallback via prop, otherwise show default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="border-2 border-black bg-red-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center gap-5 text-center m-4">
          <div className="border-2 border-black bg-red-200 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <ServerCrash className="w-8 h-8 text-black stroke-[2.5]" />
          </div>

          <h2 className="font-mono font-black text-base uppercase tracking-wider">
            Something broke
          </h2>

          <p className="font-mono text-xs text-gray-600 max-w-sm">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>

          <button
            onClick={() => this.handleReset()}
            className="flex items-center gap-2 border-2 border-black bg-white px-5 py-2 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for ergonomic JSX use.
 * @param {{ children: React.ReactNode, fallback?: React.ReactNode }} props
 */
export function ErrorBoundary({ children, fallback }) {
  return (
    <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>
  );
}

// Usage — wrap any risky subtree:
// <ErrorBoundary>
//   <PromptList />
// </ErrorBoundary>

// Usage with custom fallback:
// <ErrorBoundary fallback={<ErrorState message="Failed to load prompts." />}>
//   <PromptList />
// </ErrorBoundary>

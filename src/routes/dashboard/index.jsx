/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { PromptList } from "../../components/prompts/PromptList";
import { Link } from "@tanstack/react-router";
import { Button } from "../../components/ui/Button";
import { SearchInput } from "../../components/ui/SearchInput";
import { CategoryTabs } from "../../components/ui/CategoryTabs";
import { ErrorBoundary } from "../../components/ui/ErrorBoundary";
import { z } from "zod";

const dashboardSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
});

function DashboardPage() {
  const _search = Route.useSearch();

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A1A1A]">
            Dashboard
          </h1>
          <p className="text-base font-bold text-[#555555] mt-2">
            Manage your AI prompt library
          </p>
        </div>
        <Link to="/dashboard/new">
          <Button
            variant="primary"
            className="shadow-[4px_4px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1A1A1A] active:translate-y-0.5 transition-all"
          >
            + New Prompt
          </Button>
        </Link>
      </div>

      <ErrorBoundary>
        {/* Search and Filters - Redesigned per XML */}
        <div className="space-y-4">
          <div className="dashboard-search">
            <SearchInput className="w-full text-lg font-bold border-[3px] border-[#1A1A1A] p-4 shadow-[4px_4px_0_#1A1A1A] focus:outline-none focus:shadow-[2px_2px_0_#1A1A1A] focus:translate-y-0.5 transition-all placeholder:text-[#1A1A1A]/40 bg-white text-[#1A1A1A] rounded-none" />
          </div>
          <p
            className="results-count"
            style={{
              color: "#555555",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}
          >
            Showing 12 prompts
          </p>
          <div
            className="filter-chips overflow-x-auto pb-2 scrollbar-none flex gap-2"
            role="group"
            aria-label="Filter by category"
          >
            <CategoryTabs />
          </div>
        </div>

        {/* Prompt List */}
        <div className="mt-8">
          <PromptList />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/")({
  validateSearch: dashboardSearchSchema,
  component: DashboardPage,
});

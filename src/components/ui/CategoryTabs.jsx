import { useNavigate, useMatch } from "@tanstack/react-router";

const categories = [
  { value: "all", label: "All" },
  { value: "general", label: "General" },
  { value: "coding", label: "Coding" },
  { value: "image_gen", label: "Image Gen" },
  { value: "writing", label: "Writing" },
  { value: "data_analysis", label: "Data" },
  { value: "research", label: "Research" },
  { value: "roleplay", label: "Roleplay" },
  { value: "system_prompt", label: "System" },
];

export function CategoryTabs() {
  const match = useMatch({ from: "/dashboard/" });
  const navigate = useNavigate({ from: "/dashboard/" });
  const category = match.search?.category || "all";

  const handleCategoryChange = (newCategory) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: newCategory === "all" ? undefined : newCategory,
      }),
      replace: true,
    });
  };

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {categories.map((cat) => {
        const active =
          (category === "all" && cat.value === "all") || category === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-1.5 text-sm font-bold border-[2px] rounded-full transition-all whitespace-nowrap ${
              active
                ? "bg-[var(--color-accent)] text-[var(--text-on-yellow)] border-[var(--color-accent)] shadow-[2px_2px_0_var(--bg-base)]"
                : "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[var(--color-accent)]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

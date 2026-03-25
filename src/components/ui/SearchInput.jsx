import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function SearchInput({
  placeholder = "Search prompts...",
  routeFrom = "/dashboard/",
}) {
  const navigate = useNavigate({ from: routeFrom });
  const search = useSearch({ from: routeFrom }) || {};
  const q = search.q || "";
  const [value, setValue] = useState(q);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setValue(q);
  }, [q]);

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      navigate({
        search: (prev) => ({ ...prev, q: value || undefined }),
        replace: true,
      });
    }, 800);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, navigate]);

  return (
    <div className="flex items-center gap-2 rounded-none border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0_#000]">
      <span role="img" aria-label="search">
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-base font-medium text-slate-900 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

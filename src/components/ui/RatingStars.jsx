import { useMemo } from "react";

export function RatingStars({
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
}) {
  const stars = useMemo(() => Array.from({ length: 5 }), []);
  return (
    <div className="flex items-center gap-1">
      {stars.map((_, index) => {
        const filled = index + 1 <= value;
        return (
          <button
            key={index}
            type={readOnly ? "button" : "button"}
            className={`group ${readOnly ? "cursor-default" : ""}`}
            onClick={() => !readOnly && onChange?.(index + 1)}
            disabled={readOnly}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={filled ? "#f59e0b" : "none"}
              stroke="#000"
              strokeWidth="2"
              className={`transition-transform ${!readOnly && "group-active:scale-95"}`}
              style={{ width: size, height: size }}
            >
              <path d="M12 2.5 9 9H2.5L8 13l-2 6 6-3.5 6 3.5-2-6 5.5-4H15l-3-6.5Z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

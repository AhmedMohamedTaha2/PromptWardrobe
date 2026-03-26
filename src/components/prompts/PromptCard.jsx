import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Bookmark } from "lucide-react";
import { RatingStars } from "../ui/RatingStars";
import { useIsBookmarked, useToggleBookmark } from "../../hooks/useBookmarks";
import { User } from "lucide-react";

export function PromptCard({ prompt, currentUserId }) {
  const author = prompt.profiles;
  const showAuthor =
    prompt.is_public &&
    Boolean(author?.display_name) &&
    Boolean(author?.id || author?.user_id) &&
    currentUserId !== prompt.user_id;
  const isOwnPrompt = currentUserId === prompt.user_id;
  const showBookmark =
    prompt.is_public && !isOwnPrompt && Boolean(currentUserId);

  const { data: isBookmarked = false } = useIsBookmarked(
    showBookmark ? currentUserId : null,
    showBookmark ? prompt.id : null,
  );

  const { mutate: toggleBookmark } = useToggleBookmark(currentUserId);

  return (
    <article className="retro-card relative flex flex-col justify-between p-5 h-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-retro-lg border-[3px] border-brand-black bg-white group cursor-pointer hover:border-brand-black">
      <Link
        to={`/dashboard/${prompt.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${prompt.title}`}
      />

      <div className="flex flex-col gap-3 relative z-10 pointer-events-none">
        {/* Header: Title + Status */}
        <header className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black leading-tight text-brand-black line-clamp-2 decoration-brand-yellow group-hover:underline underline-offset-2 break-all">
            {prompt.title}
          </h3>
          <span
            className={`border-2 border-brand-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0_#1A1A1A] whitespace-nowrap z-20 pointer-events-none ${
              prompt.is_public
                ? "bg-brand-green text-brand-black"
                : "bg-gray-100 text-[#666]"
            }`}
          >
            {prompt.is_public ? "Public" : "Private"}
          </span>
        </header>

        {/* Metadata Row 1 */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wide z-20 pointer-events-none">
          <span className="bg-brand-yellow border border-brand-black px-1.5 py-0.5 text-brand-black pointer-events-none">
            {prompt.category?.replace(/_/g, " ") || "Uncategorized"}
          </span>
          <span className="text-brand-black/50 pointer-events-none">•</span>
          <time
            className="text-brand-black/60 font-mono pointer-events-none"
            dateTime={prompt.created_at}
          >
            {prompt.created_at
              ? format(new Date(prompt.created_at), "MMM d")
              : ""}
          </time>
          {showAuthor && (
            <>
              <span className="text-brand-black/50 pointer-events-none">•</span>
              <div className="relative z-30 pointer-events-auto">
                <Link
                  to={`/profile/${author.id || author.user_id}`}
                  className="flex items-center gap-1 hover:text-brand-purple hover:underline underline-offset-2 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  title={`Visit ${author.display_name}'s profile`}
                >
                  <User size={12} strokeWidth={2.5} />
                  <span className="truncate max-w-25">
                    {author.display_name}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Content Preview */}
        <p className="text-sm font-medium text-brand-black/70 line-clamp-3 leading-relaxed min-h-[4.5rem] pointer-events-none">
          {prompt.content}
        </p>
      </div>

      {/* Footer Stats - Redesigned */}
      <footer className="mt-4 pt-4 border-t-2 border-brand-black/10 flex items-end justify-between text-xs font-bold text-brand-black/70 relative z-10 pointer-events-none">
        <div className="flex flex-col gap-0.5">
          <span className="uppercase tracking-wider text-[10px] text-brand-black/50">
            Model
          </span>
          <span className="text-brand-black">{prompt.model || "Unknown"}</span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <RatingStars
            value={prompt.rating ?? 0}
            size={14}
            className="gap-0.5"
            readOnly
          />
          {prompt.token_estimate > 0 && (
            <span className="font-mono text-[10px] bg-[#EEE] px-1 border border-[#CCC] rounded-sm text-[#333]">
              ~{prompt.token_estimate} toks
            </span>
          )}
        </div>
      </footer>

      {/* Action Buttons (Bookmark/Author) - Positioned absolutely or subtly */}
      {showBookmark && (
        <div className="absolute top-2 right-2 pointer-events-auto z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark({ promptId: prompt.id, isBookmarked });
            }}
            className="p-1 bg-white border-2 border-black shadow-[2px_2px_0_black] hover:bg-brand-yellow"
            aria-label={
              isBookmarked ? "Remove bookmark" : "Bookmark this prompt"
            }
            aria-pressed={isBookmarked}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-black" : ""}`}
            />
          </button>
        </div>
      )}
    </article>
  );
}

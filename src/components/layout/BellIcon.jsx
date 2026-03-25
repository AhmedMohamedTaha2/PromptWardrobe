import { Bell, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useUnreadCount } from "../../hooks/useUnreadCount";
import { useNotifications, useMarkAllRead, useMarkRead } from "../../hooks/useNotifications";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";

export function BellIcon({ userId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const { data: count = 0 } = useUnreadCount(userId);
  const { data: notifications = [], isLoading } = useNotifications(userId);
  const { mutate: markAllRead } = useMarkAllRead(userId);
  const { mutate: markRead } = useMarkRead(userId);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  if (!userId) return null;

  function handleItemClick(n) {
    if (!n.read_at) markRead(n.id);
    setOpen(false);
    navigate({
      to: "/dashboard/$promptId",
      params: { promptId: n.payload.prompt_id },
    });
  }

  function getMessage(n) {
    if (n.type === "new_prompt_from_followed")
      return `${n.payload.author_name} published "${n.payload.prompt_title}"`;
    if (n.type === "prompt_upvoted")
      return `${n.payload.author_name} upvoted "${n.payload.prompt_title}"`;
    return "New notification";
  }

  return (
    <div ref={ref} className="relative inline-flex">
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center justify-center p-2.5 border-2 border-black rounded-none transition-all active:translate-y-px active:shadow-none ${open ? "bg-yellow-200 shadow-none translate-y-px" : "bg-white hover:bg-yellow-100 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000] shadow-[2px_2px_0_#000]"}`}
      >
        <Bell size={20} className="text-black" />
        {count > 0 && (
          <span className="absolute -top-2.5 -right-2.5 flex h-5 min-w-5 items-center justify-center rounded-none border-2 border-black bg-red-400 px-1 text-[10px] font-black text-black shadow-[2px_2px_0_#000]">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-90 max-h-120 overflow-y-auto border-2 border-black bg-white shadow-[8px_8px_0_#000] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-black bg-white px-4 py-3">
            <span className="text-sm font-black uppercase tracking-tight">Notifications</span>
            <div className="flex items-center gap-3">
              {count > 0 && (
                <button
                  onClick={() => markAllRead()}
                  className="font-bold text-xs text-blue-700 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors uppercase tracking-tight"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-1 border-2 border-transparent hover:border-black hover:bg-red-400 transition-colors"
                title="Close"
              >
                <X size={16} className="text-black" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 divide-y-2 divide-black">
            {isLoading ? (
              <div className="p-6 text-center text-sm font-bold text-slate-500 uppercase">
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-sm font-bold text-slate-500 form-empty-state">
                <p className="mb-2 text-2xl drop-shadow-sm">📭</p>
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => {
                const isUnread = !n.read_at;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleItemClick(n)}
                    className={`flex flex-col gap-1 w-full p-4 text-left border-l-4 transition-colors ${
                      isUnread
                        ? "bg-blue-50 hover:bg-yellow-100 border-l-blue-600"
                        : "bg-white hover:bg-slate-50 border-l-transparent text-slate-600"
                    }`}
                  >
                    <span className={`text-sm leading-tight ${isUnread ? "font-bold text-black" : "font-medium text-slate-700"}`}>
                      {getMessage(n)}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

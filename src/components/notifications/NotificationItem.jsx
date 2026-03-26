import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { useMarkRead } from "../../hooks/useNotifications";

function getNotificationMessage(type, payload) {
  if (type === "new_prompt_from_followed" || type === "new_prompt") {
    return `${payload?.author_name ?? "A creator you follow"} published a new prompt: "${payload?.prompt_title ?? payload?.title ?? "Untitled"}"`;
  }
  if (type === "prompt_upvoted") {
    return `${payload?.author_name ?? "Someone"} upvoted your prompt: "${payload?.prompt_title ?? "Untitled"}"`;
  }
  if (type === "new_follower") {
    return `Someone started following you!`;
  }
  return "You have a new notification";
}

export function NotificationItem({ notification, userId }) {
  const navigate = useNavigate();
  const { mutate: markRead } = useMarkRead(userId);

  const { id, type, payload, read_at, created_at } = notification;
  const isUnread = !read_at;

  function handleClick() {
    if (isUnread) markRead(id);

    if (type === "new_prompt_from_followed" || type === "new_prompt") {
      navigate({
        to: "/public/$promptId",
        params: { promptId: payload.prompt_id },
      });
    } else if (type === "prompt_upvoted") {
      navigate({
        to: "/dashboard/$promptId",
        params: { promptId: payload.prompt_id },
      });
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "12px 14px",
        borderLeft: isUnread
          ? "3px solid var(--color-text-info)"
          : "3px solid transparent",
        background: isUnread ? "var(--color-background-info)" : "transparent",
        borderRadius: 6,
        transition: "background 120ms ease, transform 120ms ease",
      }}
    >
      <span style={{ fontWeight: isUnread ? 600 : 500 }}>
        {getNotificationMessage(type, payload)}
      </span>
      <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
        {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
      </span>
    </button>
  );
}

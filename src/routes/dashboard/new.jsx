/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { PromptForm } from "../../components/prompts/PromptForm";
import { Button } from "../../components/ui/Button";

function NewPromptPage() {
  return (
    <div
      style={{
        // "--color-bg": "#F5F0DC",
        "--color-surface": "#FDFAF0",
        "--color-border": "#111111",
        "--color-accent": "#F5C518",
        "--color-accent-2": "#FFDD57",
        "--color-text": "#111111",
        "--color-muted": "#888888",
        background: "var(--color-bg)",
        backgroundImage:
          "radial-gradient(circle, #11111118 2px, transparent 1px)",
        backgroundSize: "20px 20px",
        minHeight: "100vh",
        padding: "32px",
        fontFamily: "inherit",
        color: "var(--color-text)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "transparent",
              border: "2.5px solid var(--color-border)",
              borderRadius: "6px",
              color: "var(--color-text)",
              fontSize: "0.875rem",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "3px 3px 0px var(--color-border)",
              padding: "8px 18px",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translate(-2px, -2px)";
              e.target.style.boxShadow = "5px 5px 0px var(--color-border)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translate(0, 0)";
              e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "translate(2px, 2px)";
              e.target.style.boxShadow = "1px 1px 0px var(--color-border)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "translate(-2px, -2px)";
              e.target.style.boxShadow = "5px 5px 0px var(--color-border)";
            }}
          >
            ← Back
          </button>
        </Link>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            Create Prompt
          </h1>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
            }}
          >
            Add a new prompt to your wardrobe
          </p>
        </div>
      </div>

      {/* Form */}
      <div>
        <PromptForm />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/new")({
  component: NewPromptPage,
});

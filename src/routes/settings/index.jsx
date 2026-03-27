/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfiles";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";

const settingsSchema = z.object({
  display_name: z.string().min(1, "Display name is required").max(50),
  bio: z
    .string()
    .max(200, "Bio must be under 200 characters")
    .optional()
    .or(z.literal("")),
  avatar_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  email_public: z
    .string()
    .email("Must be a valid email")
    .optional()
    .or(z.literal("")),
});

const accountSchema = z.object({
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
});

function SettingsPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const { data: profile, isLoading, error, refetch } = useProfile(userId);
  const { mutate: updateProfile, isPending: isSavingProfile } =
    useUpdateProfile(userId);
  const { mutate: updateAccount, isPending: isUpdatingAccount } =
    useUpdateAccount(user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      display_name: "",
      bio: "",
      avatar_url: "",
      email_public: "",
    },
  });

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    reset: resetAccount,
    formState: { errors: accountErrors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        display_name: profile.display_name ?? "",
        bio: profile.bio ?? "",
        avatar_url: profile.avatar_url ?? "",
        email_public: profile.email_public ?? "",
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    resetAccount({
      email: user?.email ?? "",
      password: "",
    });
  }, [user?.email, resetAccount]);

  if (!userId)
    return <ErrorState title="Not authenticated" message="Login required" />;
  if (isLoading) return <LoadingState label="Loading settings..." />;
  if (error)
    return (
      <ErrorState
        title="Failed to load profile"
        message={error.message}
        onRetry={() => refetch()}
      />
    );

  const onSubmitProfile = (values) => {
    updateProfile(values);
  };

  const onSubmitAccount = (values) => {
    const noChanges =
      (values.email ?? "") === (user?.email ?? "") && !values.password;
    if (noChanges) {
      toast.error("Update email or enter a new password");
      return;
    }

    updateAccount(values, {
      onSuccess: () => {
        resetAccount({
          email: values.email || user?.email || "",
          password: "",
        });
      },
    });
  };

  return (
    <div
      style={{
        "--color-bg": "#F5F0DC",
        "--color-surface": "#FDFAF0",
        "--color-border": "#111111",
        "--color-accent": "#F5C518",
        "--color-accent-2": "#FFDD57",
        "--color-text": "#111111",
        "--color-muted": "#888888",
        background: "var(--color-bg)",
        backgroundImage:
          "radial-gradient(circle, #11111118 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        minHeight: "100vh",
        padding: "32px",
        fontFamily: "inherit",
        color: "var(--color-text)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "16px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            textTransform: "uppercase",
          }}
        >
          Settings
        </h1>
        <p
          style={{
            margin: "4px 0 0 0",
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            fontWeight: 700,
          }}
        >
          Manage your public profile and account details.
        </p>
      </header>

      {/* Profile Section Card */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "2.5px solid var(--color-border)",
          borderRadius: "10px",
          boxShadow: "6px 6px 0px var(--color-border)",
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              paddingBottom: "12px",
              borderBottom: "2.5px solid var(--color-border)",
            }}
          >
            Profile Information
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitProfile)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                }}
              >
                Display Name
              </label>
              <input
                placeholder="How you appear to others"
                {...register("display_name")}
                style={{
                  border: "2.5px solid var(--color-border)",
                  borderRadius: "6px",
                  background: "var(--color-bg)",
                  padding: "12px 16px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "box-shadow 0.15s ease, border-width 0.15s ease",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                  e.target.style.borderWidth = "3px";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderWidth = "2.5px";
                }}
              />
              {profileErrors.display_name?.message && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#e63946",
                  }}
                >
                  {profileErrors.display_name?.message}
                </span>
              )}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                }}
              >
                Public Email
              </label>
              <input
                placeholder="Visible on your profile"
                {...register("email_public")}
                style={{
                  border: "2.5px solid var(--color-border)",
                  borderRadius: "6px",
                  background: "var(--color-bg)",
                  padding: "12px 16px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "box-shadow 0.15s ease, border-width 0.15s ease",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                  e.target.style.borderWidth = "3px";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderWidth = "2.5px";
                }}
              />
              {profileErrors.email_public?.message && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#e63946",
                  }}
                >
                  {profileErrors.email_public?.message}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              Avatar URL
            </label>
            <input
              placeholder="https://example.com/me.png"
              {...register("avatar_url")}
              style={{
                border: "2.5px solid var(--color-border)",
                borderRadius: "6px",
                background: "var(--color-bg)",
                padding: "12px 16px",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-text)",
                outline: "none",
                transition: "box-shadow 0.15s ease, border-width 0.15s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                e.target.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.borderWidth = "2.5px";
              }}
            />
            {profileErrors.avatar_url?.message && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#e63946",
                }}
              >
                {profileErrors.avatar_url?.message}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              Bio
            </label>
            <textarea
              rows={4}
              placeholder="Tell the community about your prompting style..."
              {...register("bio")}
              style={{
                border: "2.5px solid var(--color-border)",
                borderRadius: "6px",
                background: "var(--color-bg)",
                padding: "12px 16px",
                fontSize: "1rem",
                lineHeight: 1.6,
                fontWeight: 600,
                color: "var(--color-text)",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                transition: "box-shadow 0.15s ease, border-width 0.15s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                e.target.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.borderWidth = "2.5px";
              }}
            />
            {profileErrors.bio?.message && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#e63946",
                }}
              >
                {profileErrors.bio?.message}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "8px",
            }}
          >
            <button
              type="submit"
              disabled={isSavingProfile}
              style={{
                background: "var(--color-accent)",
                color: "var(--color-border)",
                border: "2.5px solid var(--color-border)",
                borderRadius: "8px",
                padding: "16px 24px",
                fontSize: "0.8rem",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: isSavingProfile ? "not-allowed" : "pointer",
                boxShadow: "8px 8px 0px var(--color-border)",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                opacity: isSavingProfile ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (isSavingProfile) return;
                e.target.style.transform = "translate(-2px, -2px)";
                e.target.style.boxShadow = "10px 10px 0px var(--color-border)";
              }}
              onMouseLeave={(e) => {
                if (isSavingProfile) return;
                e.target.style.transform = "translate(0, 0)";
                e.target.style.boxShadow = "8px 8px 0px var(--color-border)";
              }}
              onMouseDown={(e) => {
                if (isSavingProfile) return;
                e.target.style.transform = "translate(4px, 4px)";
                e.target.style.boxShadow = "4px 4px 0px var(--color-border)";
              }}
              onMouseUp={(e) => {
                if (isSavingProfile) return;
                e.target.style.transform = "translate(-2px, -2px)";
                e.target.style.boxShadow = "10px 10px 0px var(--color-border)";
              }}
            >
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </section>

      {/* Account Section Card */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "2.5px solid var(--color-border)",
          borderRadius: "10px",
          boxShadow: "6px 6px 0px var(--color-border)",
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              paddingBottom: "12px",
              borderBottom: "2.5px solid var(--color-border)",
            }}
          >
            Account Access
          </h2>
        </div>

        <form
          onSubmit={handleAccountSubmit(onSubmitAccount)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              Login Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...registerAccount("email")}
              style={{
                border: "2.5px solid var(--color-border)",
                borderRadius: "6px",
                background: "var(--color-bg)",
                padding: "12px 16px",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-text)",
                outline: "none",
                transition: "box-shadow 0.15s ease, border-width 0.15s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                e.target.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.borderWidth = "2.5px";
              }}
            />
            {accountErrors.email?.message && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#e63946",
                }}
              >
                {accountErrors.email?.message}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text)",
              }}
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              {...registerAccount("password")}
              style={{
                border: "2.5px solid var(--color-border)",
                borderRadius: "6px",
                background: "var(--color-bg)",
                padding: "12px 16px",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-text)",
                outline: "none",
                transition: "box-shadow 0.15s ease, border-width 0.15s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = "3px 3px 0px var(--color-border)";
                e.target.style.borderWidth = "3px";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.borderWidth = "2.5px";
              }}
            />
            {accountErrors.password?.message && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#e63946",
                }}
              >
                {accountErrors.password?.message}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "8px",
            }}
          >
            <button
              type="submit"
              disabled={isUpdatingAccount}
              style={{
                background: "var(--color-border)",
                color: "var(--color-surface)",
                border: "2.5px solid var(--color-border)",
                borderRadius: "8px",
                padding: "16px 24px",
                fontSize: "0.8rem",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: isUpdatingAccount ? "not-allowed" : "pointer",
                boxShadow: "8px 8px 0px var(--color-accent)",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                opacity: isUpdatingAccount ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (isUpdatingAccount) return;
                e.target.style.transform = "translate(-2px, -2px)";
                e.target.style.boxShadow = "10px 10px 0px var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                if (isUpdatingAccount) return;
                e.target.style.transform = "translate(0, 0)";
                e.target.style.boxShadow = "8px 8px 0px var(--color-accent)";
              }}
              onMouseDown={(e) => {
                if (isUpdatingAccount) return;
                e.target.style.transform = "translate(4px, 4px)";
                e.target.style.boxShadow = "4px 4px 0px var(--color-accent)";
              }}
              onMouseUp={(e) => {
                if (isUpdatingAccount) return;
                e.target.style.transform = "translate(-2px, -2px)";
                e.target.style.boxShadow = "10px 10px 0px var(--color-accent)";
              }}
            >
              {isUpdatingAccount ? "Updating..." : "Update Account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/settings/")({
  component: SettingsPage,
});

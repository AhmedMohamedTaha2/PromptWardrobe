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
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";

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
    <div className="max-w-[720px] mx-auto space-y-12 py-8 px-6">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight uppercase">
          Settings
        </h1>
        <p className="text-[#1A1A1A]/70 font-bold mt-2">
          Manage your public profile and account details.
        </p>
      </header>

      {/* Profile Section Card */}
      <section className="retro-card bg-white p-8 border-[3px] border-[#1A1A1A] shadow-[6px_6px_0_#1A1A1A]">
        <h2 className="text-2xl font-black uppercase border-b-2 border-[#1A1A1A] pb-4 mb-6 tracking-tight">
          Profile Information
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Display Name"
              placeholder="How you appear to others"
              {...register("display_name")}
              error={profileErrors.display_name?.message}
              className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
            />
            <Input
              label="Public Email"
              placeholder="Visible on your profile"
              {...register("email_public")}
              error={profileErrors.email_public?.message}
              className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
            />
          </div>

          <Input
            label="Avatar URL"
            placeholder="https://example.com/me.png"
            {...register("avatar_url")}
            error={profileErrors.avatar_url?.message}
            className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
          />

          <Textarea
            label="Bio"
            rows={4}
            placeholder="Tell the community about your prompting style..."
            {...register("bio")}
            error={profileErrors.bio?.message}
            className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
          />

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              isLoading={isSavingProfile}
              className="bg-[#F5C518] text-[#1A1A1A] font-black uppercase text-sm px-8 py-3 border-[3px] border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1A1A1A] active:translate-y-0.5"
            >
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </section>

      {/* Account Section Card */}
      <section className="retro-card bg-[var(--primaryBG)] p-8 border-[3px] border-[#1A1A1A] shadow-[6px_6px_0_#1A1A1A]">
        <h2 className="text-2xl font-black uppercase border-b-2 border-[#1A1A1A] pb-4 mb-6 tracking-tight">
          Account Access
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleAccountSubmit(onSubmitAccount)}
        >
          <div className="bg-white p-6 border-2 border-[#1A1A1A] shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
            <Input
              label="Login Email"
              type="email"
              placeholder="you@example.com"
              {...registerAccount("email")}
              error={accountErrors.email?.message}
              className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
            />
          </div>

          <div className="bg-white p-6 border-2 border-[#1A1A1A] shadow-[3px_3px_0_rgba(0,0,0,0.1)]">
            <Input
              label="New Password"
              type="password"
              placeholder="Leave blank to keep current"
              {...registerAccount("password")}
              error={accountErrors.password?.message}
              className="border-2 border-[#1A1A1A] focus:shadow-[2px_2px_0_#1A1A1A] transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              isLoading={isUpdatingAccount}
              className="bg-[#1A1A1A] text-white font-black uppercase text-sm px-8 py-3 border-[3px] border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1A1A1A] active:translate-y-0.5"
            >
              {isUpdatingAccount ? "Updating..." : "Update Account"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/settings/")({
  component: SettingsPage,
});

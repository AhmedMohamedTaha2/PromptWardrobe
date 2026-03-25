/* eslint-disable react-refresh/only-export-components */
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const Route = createFileRoute("/auth/signup")({
  component: SignUpComponent,
});

const schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUpComponent() {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      await signUp({
        email: values.email,
        password: values.password,
      });
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error.message ?? "Sign up failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Decorative Brand Panel (Left) - BLACK background */}
      <aside className="hidden lg:flex w-[40%] bg-[#1A1A1A] flex-col justify-between p-12 relative overflow-hidden border-r-[3px] border-[#333]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#F5C518] border-[2px] border-[#F5C518] flex items-center justify-center shadow-[3px_3px_0_#FFF]">
              <span className="font-black text-[#1A1A1A] text-lg">P</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#FFFFFF]">
              Prompts Wardrobe
            </span>
          </div>
          <p className="text-[#F5C518] font-bold tracking-widest text-sm mb-4 uppercase">
            Join the Collective
          </p>
          <h2 className="text-5xl font-black leading-[0.9] text-[#FFFFFF] drop-shadow-md">
            "Your prompts deserve a <span className="text-[#F5C518]">home</span>
            ."
          </h2>
        </div>

        {/* Floating Cards Visual */}
        <div className="relative z-10 h-full w-full mt-12 flex flex-col items-center justify-center">
          <div className="w-64 aspect-[3/4] bg-white border-[3px] border-[#1A1A1A] shadow-[5px_5px_0_#000] -rotate-3 p-4 flex flex-col z-20 absolute top-10 left-10">
            <div className="h-4 w-12 bg-[#F5C518] mb-4"></div>
            <div className="h-2 w-full bg-[#E5E5E5] mb-2"></div>
            <div className="h-2 w-full bg-[#E5E5E5] mb-2"></div>
            <div className="h-2 w-3/4 bg-[#E5E5E5]"></div>
          </div>
          <div className="w-64 aspect-[3/4] bg-white border-[3px] border-[#1A1A1A] shadow-[5px_5px_0_#000] rotate-6 p-4 flex flex-col z-10 opacity-80 absolute top-24 left-24">
            <div className="h-4 w-12 bg-[#A8E6A3] mb-4"></div>
            <div className="h-2 w-full bg-[#E5E5E5] mb-2"></div>
            <div className="h-2 w-3/4 bg-[#E5E5E5]"></div>
          </div>
        </div>

        <div className="relative z-10 text-xs font-mono text-[#666] uppercase tracking-widest mt-auto">
          Est. 2026 — Member of the Vintage Web Ring
        </div>
      </aside>

      {/* Form Panel (Right) - WHITE background */}
      <main className="flex-1 flex flex-col justify-center px-6 lg:px-24 bg-transparent text-[#1A1A1A]">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 lg:hidden">
            <h1 className="text-2xl font-black text-[#1A1A1A]">
              Prompts Wardrobe
            </h1>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-4xl font-black tracking-tight text-[#1A1A1A]">
              Create Account
            </h2>
            <p className="text-[#666] font-medium text-lg">
              Start organizing your AI workflow today.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={form.formState.errors.email?.message}
              {...form.register("email")}
              inputClassName="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A]"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={form.formState.errors.password?.message}
              {...form.register("password")}
              inputClassName="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A]"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={form.formState.errors.confirmPassword?.message}
              {...form.register("confirmPassword")}
              inputClassName="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A]"
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full btn--primary text-lg py-6"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </Button>
            </div>

            <p className="text-center text-sm font-bold text-[#666] mt-4">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[#1A1A1A] underline decoration-2 decoration-[#F5C518] hover:bg-[#F5C518] transition-all"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

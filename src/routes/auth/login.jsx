/* eslint-disable react-refresh/only-export-components */
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LoadingState } from "../../components/ui/LoadingState";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginComponent() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      toast.success("Logged in successfully");
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error.message ?? "Login failed");
    }
  };

  if (loading) return <LoadingState label="Checking session..." />;

  return (
    <div className="flex min-h-screen">
      {/* Decorative Brand Panel (Left) - BLACK bg */}
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
          <h2 className="text-5xl font-black leading-[0.9] text-[#FFFFFF] drop-shadow-md">
            "Your prompts
            <br />
            <span className="text-[#F5C518]">deserve a home.</span>"
          </h2>
          <p className="text-lg text-[#CCCCCC] mt-6 max-w-sm font-medium">
            Access your curated collection.
          </p>
        </div>

        <div className="relative z-10 h-full w-full mt-8 flex flex-col items-center justify-center">
          <div className="w-64 aspect-[3/4] bg-white border-[3px] border-[#1A1A1A] shadow-[5px_5px_0_#000] -rotate-2 p-4 flex flex-col z-20 absolute top-24 left-12">
            <div className="flex justify-between mb-4">
              <span className="font-bold text-xs uppercase bg-[#A8E6A3] border-2 border-black px-1">
                Welcome Back
              </span>
            </div>
            <div className="h-2 w-full bg-[#E5E5E5] mb-2"></div>
            <div className="h-2 w-1/3 bg-[#E5E5E5]"></div>
          </div>
        </div>

        <div className="relative z-10 text-xs font-mono text-[#666] opacity-60 uppercase tracking-widest mt-auto">
          Est. 2026 — Member of the Vintage Web Ring
        </div>
      </aside>

      {/* Form Panel (Right) - WHITE bg */}
      <main className="flex-1 flex flex-col justify-center px-6 lg:px-24 bg-transparent text-[#1A1A1A]">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 lg:hidden">
            <h1 className="text-2xl font-black text-[#1A1A1A]">
              Prompts Wardrobe
            </h1>
          </div>

          <div className="space-y-2 mb-8">
            <span className="text-xs font-black tracking-widest uppercase text-[#F5C518] bg-[#1A1A1A] px-2 py-1">
              Welcome Back
            </span>
            <h1 className="text-4xl font-black text-[#1A1A1A] mt-2">Sign in</h1>
            <p className="text-[#666] font-medium text-lg">
              Access your prompt library.
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

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full btn--primary text-lg py-6"
                disabled={loading}
              >
                {loading ? "Checking..." : "Sign In →"}
              </Button>
            </div>

            <p className="text-center text-sm font-bold text-[#666] mt-4">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-[#1A1A1A] underline decoration-2 decoration-[#F5C518] hover:bg-[#F5C518] transition-all"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import {
  Database,
  Search,
  Sparkles,
  ShieldCheck,
  Download,
  ArrowRight,
  Star,
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--color-accent)] selection:text-[var(--text-on-yellow)]">
      {/* Navigation */}
      <nav className="navbar sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center border-[3px] border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[3px_3px_0_var(--color-accent)]">
              <Database className="h-6 w-6 text-[var(--color-black)]" />
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--color-black)]">
              Prompts Wardrobe
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to="/auth/login"
              className="text-base font-bold text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="hidden sm:inline-flex btn--primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section — Split Layout */}
      <header className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy (60%) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            <div className="inline-flex items-center gap-2 border-[2px] border-[var(--color-accent)] bg-[var(--color-black)] px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_var(--color-accent)] text-[var(--color-white)]">
              <Sparkles className="h-3 w-3 text-[var(--color-accent)]" />
              <span>v1.0.0 Now Available</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[var(--color-black)]">
              Stop losing your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--color-accent)]">
                  best prompts
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--color-accent)]/20 -z-10"></span>
              </span>{" "}
              in chat history.
            </h1>

            <p className="max-w-xl text-xl font-bold text-[var(--color-muted)] leading-relaxed">
              A personal wardrobe for your AI prompts. Organize, rate, and
              refine your collection in a privacy-focused library.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                to="/auth/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn--primary text-lg"
              >
                Start for Free <ArrowRight className="h-6 w-6 stroke-[3px]" />
              </Link>
              <Link
                to="/auth/login"
                className="w-full sm:w-auto inline-flex items-center justify-center btn--ghost text-[var(--color-black)] border-[var(--color-black)] hover:bg-[var(--color-accent)] transition-colors"
                style={{
                  border: "3px solid var(--color-black)",
                  boxShadow: "3px 3px 0 var(--color-black)",
                }}
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Right Column: Visuals (40%) */}
          <div
            className="lg:col-span-5 relative h-96 hidden lg:block"
            aria-hidden="true"
          >
            {/* Decorative Card Stack */}
            {/* Back card */}
            <div className="absolute top-10 left-10 w-full max-w-sm aspect-[3/4] bg-[var(--color-white)] border-[3px] border-[var(--color-black)] shadow-[var(--shadow-retro)] rotate-6 z-10 p-6 flex flex-col opacity-60"></div>

            {/* Middle card */}
            <div className="absolute top-6 left-6 w-full max-w-sm aspect-[3/4] bg-[var(--color-white)] border-[3px] border-[var(--color-black)] shadow-[var(--shadow-retro)] rotate-3 z-20 p-6 flex flex-col opacity-80"></div>

            {/* Front card */}
            <div className="absolute top-0 left-0 w-full max-w-sm aspect-[3/4] retro-card bg-[var(--color-white)] -rotate-3 z-30 p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-[var(--shadow-retro)] border-[var(--border-thick)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl uppercase text-[var(--color-black)]">
                    Character Gen
                  </h3>
                  <div className="bg-[var(--color-tag-green)] text-[var(--color-black)] px-2 py-0.5 text-xs font-black uppercase border-2 border-[var(--color-black)]">
                    Public
                  </div>
                </div>
                <p className="font-mono text-xs mb-4 text-[var(--color-muted)]">
                  TOKENS: 145
                </p>
                <div className="font-serif italic text-lg leading-snug border-l-[3px] border-[var(--color-accent)] pl-4 py-2 text-[var(--color-black)]">
                  "Create a cyberpunk detective with a noir backstory and a
                  robotic arm..."
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center border-t-[3px] border-[#EEE] pt-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-black)] stroke-1"
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-[var(--color-muted)]">
                  GPT-4
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Bento Grid */}
      <section className="border-y-[3px] border-[#333] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(250px,auto)]">
            {/* Main feature - span 2 cols x 2 rows (large square) */}
            <div className="md:col-span-2 md:row-span-2 p-8 retro-card flex flex-col justify-between group h-full">
              <div>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border-[3px] border-[var(--color-black)] bg-[var(--color-accent)] shadow-[3px_3px_0_var(--color-black)]">
                  <Database className="h-8 w-8 text-[var(--color-black)]" />
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tight text-[var(--color-black)]">
                  Organize Your Chaos
                </h3>
                <p className="text-2xl text-[var(--color-muted)] font-bold leading-relaxed max-w-lg">
                  Stop scrolling through endless chat logs. Tag prompts by
                  category (Coding, Writing, Image Gen) and keep your best ideas
                  just one click away.
                </p>
              </div>
              <div className="mt-12 flex gap-3 flex-wrap">
                <span className="bg-[var(--color-tag-yellow)] text-[var(--color-black)] px-3 py-1 font-black uppercase text-sm border-2 border-[var(--color-black)]">
                  #ROLEPLAY
                </span>
                <span className="bg-[var(--color-tag-yellow)] text-[var(--color-black)] px-3 py-1 font-black uppercase text-sm border-2 border-[var(--color-black)]">
                  #CODING
                </span>
                <span className="bg-[var(--color-tag-yellow)] text-[var(--color-black)] px-3 py-1 font-black uppercase text-sm border-2 border-[var(--color-black)]">
                  #MIDJOURNEY
                </span>
              </div>
            </div>

            {/* Smaller features - each takes 1 cell */}
            <div className="retro-card p-8 group flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-[3px] border-[var(--color-black)] bg-[var(--color-white)] shadow-[3px_3px_0_var(--color-black)]">
                  <Search className="h-6 w-6 text-[var(--color-black)]" />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase text-[var(--color-black)]">
                  Instant Search
                </h3>
                <p className="text-[var(--color-muted)] font-medium">
                  Full-text search across your entire prompt library. Find that
                  one prompt from 3 months ago in milliseconds.
                </p>
              </div>
            </div>

            <div className="retro-card p-8 group flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-[3px] border-[var(--color-black)] bg-[var(--color-white)] shadow-[3px_3px_0_var(--color-black)]">
                  <ShieldCheck className="h-6 w-6 text-[var(--color-black)]" />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase text-[var(--color-black)]">
                  Private First
                </h3>
                <p className="text-[var(--color-muted)] font-medium">
                  Your prompts are yours alone. We don't train models on your
                  data. Secure and private by default.
                </p>
              </div>
            </div>

            <div className="retro-card p-8 group flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-[3px] border-[var(--color-black)] bg-[var(--color-white)] shadow-[3px_3px_0_var(--color-black)]">
                  <Download className="h-6 w-6 text-[var(--color-black)]" />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase text-[var(--color-black)]">
                  No Lock-in
                </h3>
                <p className="text-[var(--color-muted)] font-medium">
                  Download your entire collection as JSON anytime. Your data
                  belongs to you, always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t-[3px] border-[#333]">
        <p className="font-black text-[var(--color-black)] uppercase tracking-wide">
          Prompts Wardrobe © 2026
        </p>
      </footer>
    </div>
  );
}

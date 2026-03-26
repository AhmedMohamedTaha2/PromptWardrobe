import { Link } from "@tanstack/react-router";
import {
  Database,
  Search,
  Sparkles,
  ShieldCheck,
  Download,
  ArrowRight,
  Star,
  Layers,
  Zap,
} from "lucide-react";

export function ModernLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--primaryBG)] flex flex-col font-sans text-black selection:bg-[var(--primary)] selection:text-black">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 px-6 py-4 bg-[var(--background)] border-b-4 border-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[var(--primary)] shadow-[4px_4px_0_0_#000] rounded-xl group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_0_#000] transition-all">
              <Database className="h-6 w-6 text-black" />
            </div>
            <span
              style={{ fontFamily: "var(--font-head)" }}
              className="text-2xl uppercase tracking-tighter"
            >
              Wardrobe
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            <a
              href="#features"
              className="transition-colors hover:bg-black hover:text-white px-3 py-1 rounded-full border-2 border-transparent hover:border-black"
            >
              Features
            </a>
            <a
              href="#about"
              className="transition-colors hover:bg-black hover:text-white px-3 py-1 rounded-full border-2 border-transparent hover:border-black"
            >
              About
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:bg-black hover:text-white px-3 py-1 rounded-full border-2 border-transparent hover:border-black"
            >
              Pricing
            </a>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              to="/auth/login"
              className="text-sm font-bold uppercase hover:bg-black hover:text-white px-5 py-2 border-4 border-transparent hover:border-black rounded-full transition-colors hidden sm:block"
            >
              Log In
            </Link>
            <Link
              to="/auth/signup"
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase border-4 border-black shadow-[4px_4px_0_0_var(--accent)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--accent)] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-16">
        {/* Bento Grid */}
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-6"
        >
          {/* Hero Section - Spans 4 cols on mobile, 3 on md, 2 rows */}
          <div className="col-span-1 md:col-span-3 row-span-2 bg-[var(--primary)] text-black border-4 border-black shadow-[8px_8px_0_0_#000] rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full text-xs font-black uppercase border-4 border-black shadow-[4px_4px_0_0_#000] w-max z-10">
              <span className="flex h-3 w-3 rounded-full bg-[var(--destructive)] animate-pulse border-2 border-black"></span>
              <span>v2.0 Beta — Now Live</span>
            </div>

            <div className="z-10 relative mt-6 lg:mt-0">
              <h1
                style={{ fontFamily: "var(--font-head)" }}
                className="text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-sm"
              >
                The{" "}
                <span className="text-white drop-shadow-[2px_2px_0_#000]">
                  wardrobe
                </span>
                <br /> for your AI <br className="hidden sm:block" />
                <span className="bg-black text-[var(--primary)] px-4 py-1 inline-block mt-2 -rotate-2 border-4 border-black">
                  prompts.
                </span>
              </h1>
              <p className="max-w-xl text-xl font-bold bg-white/90 p-4 border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#000]">
                A premium digital archive to organize, iterate, and master your
                prompt engineering workflow. Private, fast, and beautiful.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mt-8 z-10">
              <Link
                to="/auth/signup"
                className="inline-flex items-center gap-2 bg-black text-white! px-8 py-4 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0_0_var(--accent)] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--accent)] transition-all rounded-full group"
              >
                Join the waitlist{" "}
                <ArrowRight className="h-6 w-6 stroke-[3px] text-white! group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/public/prompt-engineering"
                className="inline-flex items-center gap-2 bg-[#ff90e8] text-black px-8 py-4 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all rounded-full group"
              >
                Engineering
              </Link>
              <Link
                to="/public/prompt-techniques"
                className="inline-flex items-center gap-2 bg-[#00e5ff] text-black px-8 py-4 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all rounded-full group"
              >
                Techniques
              </Link>
            </div>

            {/* Decorative BG */}
            <Database className="absolute -bottom-10 -right-10 w-96 h-96 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <Sparkles className="absolute top-10 right-10 w-24 h-24 opacity-20 rotate-12 group-hover:scale-110 transition-transform" />
          </div>

          {/* Quick Stat / Blazing Fast - 1 col, 1 row */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-[var(--accent)] border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col justify-center items-center text-center relative group hover:-translate-y-1 transition-transform">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_#000] mb-4 group-hover:-rotate-6 transition-transform">
              <Zap className="h-8 w-8 text-black fill-black" />
            </div>
            <h3
              style={{ fontFamily: "var(--font-head)" }}
              className="text-2xl uppercase tracking-tight"
            >
              Blazing Fast
            </h3>
            <p className="font-bold text-sm mt-2 text-black/80">
              Zero-lag search and instant feedback loops.
            </p>
          </div>

          {/* Security - 1 col, 1 row */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-[var(--destructive)] text-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform">
            <div className="h-16 w-16 bg-black rounded-3xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_#fff] mb-4 group-hover:rotate-6 transition-transform">
              <ShieldCheck className="h-8 w-8 text-[var(--destructive)]" />
            </div>
            <h3
              style={{ fontFamily: "var(--font-head)" }}
              className="text-2xl uppercase tracking-tight"
            >
              Private First
            </h3>
            <p className="font-bold text-sm mt-2 text-white/90">
              Encrypted. Never used for model training.
            </p>
          </div>

          {/* Sophisticated Library - Spans 2 cols, 1 row */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 lg:p-8 flex flex-col justify-center sm:flex-row items-center gap-6 group hover:translate-x-1 transition-transform relative overflow-hidden">
            <div className="h-24 w-24 shrink-0 bg-black rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_var(--accent)] group-hover:scale-110 transition-transform z-10">
              <Layers className="h-12 w-12 text-[var(--accent)]" />
            </div>
            <div className="text-center sm:text-left z-10">
              <h3
                style={{ fontFamily: "var(--font-head)" }}
                className="text-3xl uppercase tracking-tight mb-2"
              >
                Sophisticated Library
              </h3>
              <p className="font-bold text-base text-neutral-800 leading-snug">
                Organize thousands of prompts with nested tagging, intelligent
                search, and semantic grouping.
              </p>
            </div>
          </div>

          {/* Export - Spans 2 cols, 1 row */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-[#f4f4f5] border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute opacity-[0.03] -left-10 -bottom-10 pointer-events-none">
              <Database className="w-64 h-64" />
            </div>
            <h3
              style={{ fontFamily: "var(--font-head)" }}
              className="text-3xl uppercase tracking-tight mb-2"
            >
              Export Anywhere
            </h3>
            <p className="font-bold text-base mb-6 z-10 max-w-md text-neutral-600">
              Connect your wardrobe to any AI tool with seamless exports. Your
              collection is truly yours.
            </p>
            <div className="flex gap-4 z-10 flex-wrap justify-center">
              <span className="bg-white px-6 py-2 rounded-full font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 transition-transform cursor-default">
                JSON
              </span>
              <span className="bg-[var(--primary)] px-6 py-2 rounded-full font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 transition-transform cursor-default">
                CSV
              </span>
              <span className="bg-black text-white px-6 py-2 rounded-full font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_var(--accent)] hover:-translate-y-1 transition-transform cursor-default">
                TXT
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-12 bg-black text-white border-t-8 border-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] border-4 border-black shadow-[2px_2px_0_0_#fff]">
              <Database className="h-6 w-6 text-black" />
            </div>
            <span
              style={{ fontFamily: "var(--font-head)" }}
              className="text-xl uppercase tracking-widest"
            >
              Wardrobe
            </span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            © 2026 Prompts Wardrobe. Built with focus.
          </p>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-wider">
            <a
              href="https://www.linkedin.com/in/ahmed-mohamed-taha-5a4b49222/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] hover:-translate-y-1 transition-all"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/AhmedMohamedTaha2/PromptWardrobe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] hover:-translate-y-1 transition-all"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] hover:-translate-y-1 transition-all"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import {
  Database,
  Search,
  Sparkles,
  ShieldCheck,
  Download,
  ArrowRight,
  Star,
  Code2,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans selection:bg-[var(--color-accent)] selection:text-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-[var(--background)]/90 backdrop-blur-sm border-b-4 border-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[var(--color-accent)] shadow-[4px_4px_0_0_#000] rounded-xl">
              <Database className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-black uppercase">
              Prompts Wardrobe
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to="/auth/login"
              className="text-lg font-bold text-black hover:text-[var(--color-accent)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="hidden sm:inline-flex items-center justify-center bg-black text-white hover:bg-neutral-800 border-4 border-black rounded-xl px-6 py-2.5 font-bold shadow-[4px_4px_0_0_#fae583] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#fae583] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Bento Grid Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6">
          {/* Hero Bento - Spans 4 cols on mobile, 3 on md, 2 rows */}
          <div className="col-span-1 md:col-span-3 row-span-2 bg-[#ffdb33] border-4 border-black shadow-[8px_8px_0_0_#000] rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 font-black uppercase tracking-wider shadow-[4px_4px_0_0_#000] text-black w-max rounded-full mb-6 z-10">
              <Sparkles className="h-4 w-4 text-[#ffdb33]" fill="#000" />
              <span>v1.0.0 Now Available</span>
            </div>

            <div className="z-10 relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-black uppercase mb-6 drop-shadow-sm">
                Stop losing your
                <br />
                <span className="bg-black text-[#ffdb33] px-4 py-1 inline-block mt-2 -rotate-1 border-4 border-black">
                  best prompts
                </span>
              </h1>
              <p className="max-w-xl text-xl font-bold text-black border-l-4 border-black pl-4 py-2 bg-white/50 backdrop-blur-sm rounded-r-xl">
                A personal wardrobe for your AI prompts. Organize, rate, and
                refine your collection in a privacy-focused library.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 z-10">
              <Link
                to="/auth/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0_0_#fff] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff] transition-all rounded-2xl"
              >
                Start for Free <ArrowRight className="h-6 w-6 stroke-[3px]" />
              </Link>
            </div>

            {/* Decorative background element */}
            <Database className="absolute -bottom-10 -right-10 w-96 h-96 text-black opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>

          {/* Quick Stat Bento - 1 col, 1 row */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <span className="bg-[#fae583] border-2 border-black rounded-full px-3 py-1 text-xs font-black uppercase absolute top-4 right-4 shadow-[2px_2px_0_0_#000]">
              Trending
            </span>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-black text-black" />
              ))}
            </div>
            <div className="text-xl font-black uppercase text-center mt-2">
              Rate & Refine
            </div>
            <p className="text-sm font-bold text-neutral-600 text-center mt-2">
              Track what works
            </p>
          </div>

          {/* Code Accent Bento - 1 col, 1 row */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-black text-white border-4 border-black shadow-[6px_6px_0_0_#ffdb33] rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <Code2 className="w-8 h-8 text-[#ffdb33]" />
              <div className="bg-white/20 px-2 py-1 rounded text-xs font-mono font-bold">
                #CODE
              </div>
            </div>
            <div>
              <div className="text-3xl font-black tracking-tighter text-[#ffdb33]">
                100+
              </div>
              <div className="text-sm font-bold uppercase mt-1">
                Dev Prompts
              </div>
            </div>
          </div>

          {/* Feature 1: Organize - Spans 2 cols, 1 row */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-[#fae583] border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex items-center gap-6 group hover:bg-[#ffdb33] transition-colors">
            <div className="h-20 w-20 shrink-0 flex items-center justify-center bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#000] group-hover:-rotate-6 transition-transform">
              <Database className="h-10 w-10 text-black" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                Organize Your Chaos
              </h3>
              <p className="text-base font-bold text-neutral-800 leading-snug">
                Stop scrolling through chat logs. Tag by category and keep ideas
                one click away.
              </p>
            </div>
          </div>

          {/* Feature 2: Search - Spans 2 cols, 1 row */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex items-center gap-6 group hover:translate-x-1 transition-transform">
            <div className="h-20 w-20 shrink-0 flex items-center justify-center bg-black border-4 border-black rounded-2xl shadow-[4px_4px_0_0_#fae583] group-hover:rotate-6 transition-transform">
              <Search className="h-10 w-10 text-[#ffdb33]" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
                Instant Search
              </h3>
              <p className="text-base font-bold text-neutral-700 leading-snug">
                Full-text search. Find that prompt from 3 months ago in
                milliseconds.
              </p>
            </div>
          </div>

          {/* Small Feature Bento 1 */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
            <ShieldCheck className="w-10 h-10 text-black mb-4" />
            <div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                Private First
              </h3>
              <p className="text-xs font-bold text-neutral-600">
                Your prompts are yours alone.
              </p>
            </div>
          </div>

          {/* Small Feature Bento 2 */}
          <div className="col-span-1 md:col-span-1 row-span-1 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
            <Download className="w-10 h-10 text-black mb-4" />
            <div>
              <h3 className="text-xl font-black uppercase text-black mb-1">
                No Lock-in
              </h3>
              <p className="text-xs font-bold text-neutral-600">
                Export anywhere as JSON.
              </p>
            </div>
          </div>

          {/* Tag Cloud / Example Bento - Spans 2 cols, 1 row */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-[#f4f4f5] border-4 border-black shadow-[6px_6px_0_0_#000] rounded-3xl p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <MessageSquare className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-black uppercase text-black mb-4">
              Popular Tags
            </h3>
            <div className="flex gap-3 flex-wrap relative z-10">
              <span className="bg-white text-black px-4 py-2 font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#000] rounded-full hover:-translate-y-1 transition-transform cursor-default">
                #ROLEPLAY
              </span>
              <span className="bg-black text-[#ffdb33] px-4 py-2 font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#fae583] rounded-full hover:-translate-y-1 transition-transform cursor-default">
                #CODING
              </span>
              <span className="bg-[#fae583] text-black px-4 py-2 font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#000] rounded-full hover:-translate-y-1 transition-transform cursor-default">
                #MIDJOURNEY
              </span>
              <span className="bg-white text-black px-4 py-2 font-black uppercase text-sm border-4 border-black shadow-[3px_3px_0_0_#000] rounded-full hover:-translate-y-1 transition-transform cursor-default hidden sm:inline-block">
                #WRITING
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-12 bg-black text-white border-t-8 border-[#ffdb33]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-[#ffdb33]" />
            <span className="font-black text-xl uppercase tracking-wider">
              Prompts Wardrobe
            </span>
          </div>
          <p className="font-bold text-neutral-400 text-sm uppercase tracking-wide">
            © 2026 Crafted with style.
          </p>
        </div>
      </footer>
    </div>
  );
}

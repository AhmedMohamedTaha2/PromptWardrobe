 
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, Code2 } from "lucide-react";

export const Route = createFileRoute("/public/prompt-techniques")({
  component: PromptTechniquesPage,
});

export function PromptTechniquesPage() {
  const [activeModal, setActiveModal] = useState(null);

  const examples = {
    standard:
      "Write a JavaScript function to sort an array and remove duplicates.",
    zero: "Classify the customer rating into neutral, negative or positive.\n\nText: The product was okay. It worked, but wasn't the easiest to use.\nSentiment:",
    one: "Example Input: 'Topic: Benefits of morning exercise'\nExample Intro: 'Picture this: It's 6 AM...'\n\nNow write an intro for: Remote work productivity tips",
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen text-black font-sans">
      {/* Page Header */}
      <header className="mb-4 border-b-4 border-black pb-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-[#ff90e8]">
            Techniques
          </h1>
          <p className="text-lg md:text-xl font-bold mt-3 text-slate-800 max-w-2xl bg-[#ffdb33] inline-block px-3 py-1 border-2 border-black -skew-x-2">
            Master the art of instructing AI
          </p>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(0,auto)]">
        {/* Standard Prompts - Large Square */}
        <article className="col-span-1 md:col-span-2 row-span-2 bg-[#ffdb33] border-4 border-black p-6 md:p-8 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all flex flex-col">
          <div className="inline-block bg-white border-2 border-black px-3 py-1 rounded-full font-bold text-sm mb-4 w-fit">
            The Basics
          </div>
          <h2 className="text-3xl md:text-4xl font-black border-b-4 border-black/20 pb-2 mb-4">
            Standard Prompts
          </h2>
          <p className="font-bold text-lg mb-4 flex-1">
            Direct questions or instructions the basic building block. Ask
            precisely to get precise answers.
          </p>
          <ul className="list-none space-y-3 font-semibold mb-6">
            <li className="flex gap-2 items-start">
              <span className="text-xl"></span> Simple, direct requests with
              clear intent.
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-xl"></span> Precise inputs yield precise
              outputs.
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-xl"></span> Works well for general tasks and
              quick answers.
            </li>
          </ul>
          <button
            onClick={() => setActiveModal("standard")}
            className="mt-auto bg-black text-white hover:bg-zinc-800 px-6 py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0_0_#fff] flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px]"
          >
            <Code2 size={20} /> View Example
          </button>
        </article>

        {/* Zero Shot - Rect */}
        <article className="col-span-1 md:col-span-2 bg-[#00e5ff] border-4 border-black p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all flex flex-col">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Zero Shot</h2>
          <p className="font-bold mb-4 flex-1">
            No examples provided rely on the model's training. Fast and
            token-efficient.
          </p>
          <button
            onClick={() => setActiveModal("zero")}
            className="w-fit bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 transition-all hover:translate-y-[-2px]"
          >
            <Code2 size={18} /> View Example
          </button>
        </article>

        {/* One Shot - Rect */}
        <article className="col-span-1 md:col-span-2 bg-[#ff90e8] border-4 border-black p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all flex flex-col">
          <h2 className="text-2xl md:text-3xl font-black mb-3">One Shot</h2>
          <p className="font-bold mb-4 flex-1">
            Provide a single example to establish the pattern. Combines well
            with explicit instructions.
          </p>
          <button
            onClick={() => setActiveModal("one")}
            className="w-fit bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 transition-all hover:translate-y-[-2px]"
          >
            <Code2 size={18} /> View Example
          </button>
        </article>

        {/* Few Shot - Tall */}
        <article className="col-span-1 md:col-span-1 row-span-2 bg-[#dffff0] border-4 border-black p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all flex flex-col">
          <h2 className="text-2xl font-black mb-3 bg-white border-2 border-black px-2 py-1 rounded inline-block w-fit -rotate-2">
            Few Shot
          </h2>
          <p className="font-bold mb-4">
            Provide two or more examples for complex patterns.
          </p>
          <ul className="list-disc pl-4 space-y-2 text-sm font-bold flex-1">
            <li>Include diverse examples and edge cases.</li>
            <li>Keeps outputs consistent across varied inputs.</li>
          </ul>
        </article>

        {/* Context Placement - Wide */}
        <article className="col-span-1 md:col-span-3 bg-[#ff4911] text-white border-4 border-black p-6 md:p-8 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all">
          <div className="inline-block bg-white text-black border-2 border-black px-3 py-1 rounded-full font-bold text-sm mb-4 w-fit">
            Lost in the Middle
          </div>
          <h2 className="text-3xl font-black mb-3">Context Placement</h2>
          <p className="font-bold text-lg mb-4">
            Place crucial info at the beginning or end. Avoid burying vital
            context in the middle!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 font-semibold">
              <li>Put key instructions first for best memory.</li>
              <li>Keep chats concise; split long chats.</li>
            </ul>
            <div className="bg-black/20 p-4 rounded-xl border-2 border-white/50 text-sm font-bold">
              Tip: Summarize important facts at the very top and very bottom of
              long documents.
            </div>
          </div>
        </article>

        {/* Footer Reminder */}
        <footer className="col-span-1 md:col-span-4 bg-white border-4 border-black p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="bg-[#ffdb33] text-black font-black text-xl border-4 border-black rounded-xl px-6 py-3 rotate-[-3deg] shadow-[4px_4px_0_0_#000] whitespace-nowrap">
            Remember!
          </div>
          <p className="font-bold text-lg md:text-xl leading-relaxed flex-1 text-center md:text-left">
            Start with a clear goal, pick the right prompting technique,
            iterate, and keep your experiments reproducible.
          </p>
        </footer>
      </div>

      {/* Code Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Modern frosted-glass dark theme modal */}
          <div className="relative bg-[#0f0f14]/90 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] animate-in zoom-in-95 duration-300 ease-out">
            {/* Top color accent strip based on active item */}
            <div
              className={`h-1 w-full ${activeModal === "zero" ? "bg-[#00e5ff]" : activeModal === "one" ? "bg-[#ff90e8]" : "bg-[#ffdb33]"}`}
            />

            <div className="p-5 flex justify-between items-center border-b border-white/10">
              <h3 className="text-xl text-white font-bold uppercase tracking-widest font-sans">
                {activeModal === "standard" && "Standard Prompt"}
                {activeModal === "zero" && "Zero Shot"}
                {activeModal === "one" && "One Shot"}
              </h3>
              {/* Modern Glass Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition-all outline-none"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6 md:p-8 bg-transparent text-[#e2e8f0] font-sans text-base md:text-lg overflow-x-auto whitespace-pre-wrap leading-relaxed tracking-wide">
              <code>{examples[activeModal]}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

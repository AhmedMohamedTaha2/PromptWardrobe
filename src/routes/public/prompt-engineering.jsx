 
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/public/prompt-engineering")({
  component: PromptEngineeringPage,
});

export function PromptEngineeringPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <header className="mb-8 border-b-4 border-black pb-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-[#ff90e8]">
          Prompt Engineering
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-4 max-w-2xl bg-black text-white inline-block px-3 py-1 -skew-x-3">
          The Art & Science of Instructing AI
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_auto)]">
        {/* Intro Card - Wide */}
        <div className="md:col-span-3 lg:col-span-2 retro-card bg-[#ff90e8] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-xl hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
          <h2 className="text-3xl font-black mb-4 uppercase">What is it?</h2>
          <div className="bg-white/80 p-4 border-2 border-black rounded-lg mb-4 text-lg font-medium italic">
            "Prompt engineering is the process of writing effective instructions
            for a model, such that it consistently generates content that meets
            your requirements."
            <span className="block mt-2 text-sm font-bold">— OpenAI</span>
          </div>
          <div className="space-y-3 font-medium text-black/90">
            <p>
              Because AI generated content is <strong>non-deterministic</strong>
              , getting your desired output is a mix of art and science.
              Prompting is simply using words to instruct a model via chat
              interfaces or APIs.
            </p>
            <ul className="list-disc pl-5 font-bold space-y-2 mt-4">
              <li>Save significant API costs with better prompts</li>
              <li>Not magic — it's science and structure!</li>
              <li>Enhances your critical thinking, doesn't replace it.</li>
            </ul>
          </div>
        </div>

        {/* The Easy Parts - Vertical */}
        <div className="retro-card bg-[#ffc900] border-4 border-black p-6 shadow-[8px_8px_0_0_#000] rounded-xl flex flex-col hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
          <div className="inline-block bg-white border-2 border-black px-3 py-1 rounded-full font-bold text-sm mb-4 w-fit">
            The Easy Parts
          </div>
          <h2 className="text-2xl font-black mb-4 leading-tight">
            Pattern Prediction Machines
          </h2>
          <p className="font-medium mb-4">
            LLMs generate one word (token) at a time. There is no "planning
            ahead"; they are "thinking" while typing.
          </p>
          <div className="mt-auto bg-black text-white p-4 rounded-lg border-2 border-black">
            <h3 className="font-bold border-b border-white/30 pb-2 mb-2">
              Non-Deterministic
            </h3>
            <p className="text-sm">
              Unlike a calculator (2+2 = 4), entering the same prompt twice
              yields different results. We must account for and minimize this
              randomness.
            </p>
          </div>
        </div>

        {/* The Medium Parts */}
        <div className="md:col-span-1 retro-card bg-[#00e5ff] border-4 border-black p-6 shadow-[8px_8px_0_0_#000] rounded-xl hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
          <div className="inline-block bg-white border-2 border-black px-3 py-1 rounded-full font-bold text-sm mb-4 w-fit">
            The Medium Parts
          </div>
          <h2 className="text-2xl font-black mb-4 uppercase text-black">
            Attention Is All You Need
          </h2>
          <p className="font-medium pb-4 border-b-2 border-black/20">
            In 2017, the <strong>Transformer Architecture</strong> broke the
            limit on model context windows. The "attention" mechanism lets
            models figure out what actually matters in huge blocks of text,
            scaling from a handful of words to millions.
          </p>
        </div>

        {/* The Hard Parts */}
        <div className="md:col-span-2 retro-card bg-[#ff4911] text-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] rounded-xl hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
          <div className="inline-block bg-white text-black border-2 border-black px-3 py-1 rounded-full font-bold text-sm mb-4 w-fit">
            The Hard Parts
          </div>
          <h2 className="text-2xl font-black mb-4 uppercase">
            Neural Networks & Fine-Tuning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg border-2 border-black font-medium text-sm">
              <strong>Pre-training & Fine-tuning:</strong> Models adjust their
              parameters through training. The fine-tuning stage makes LLMs
              helpful assistants (like ChatGPT or Claude) rather than raw base
              models.
            </div>
            <div className="bg-black/20 p-4 rounded-lg border-2 border-black font-medium text-sm">
              <strong>The Secret Sauce:</strong> The entire model is just a
              parameter file and a few hundred lines of code for inference. The
              true "intelligence" lives entirely in those billions of connected
              parameters!
            </div>
          </div>
        </div>

        {/* Parameters Section - Full Width */}
        <div className="md:col-span-3 retro-card bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-xl flex flex-col">
          <h2 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
            <span className="bg-black text-white px-3 py-1 rounded-md">
              AI Parameters
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Temperature */}
            <div className="border-2 border-black p-4 rounded-lg bg-[#f4f4f4] shadow-[4px_4px_0_0_#000]">
              <h3 className="text-xl font-bold mb-2 uppercase">Temperature</h3>
              <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded-full border border-black mb-3"></div>
              <p className="text-sm font-medium">
                Controls predictability (0 to 2). Lower is logical and robotic
                (.5 for medical), higher is creative but potentially incoherent
                (1.4+).
              </p>
            </div>

            {/* Top P */}
            <div className="border-2 border-black p-4 rounded-lg bg-[#f4f4f4] shadow-[4px_4px_0_0_#000]">
              <h3 className="text-xl font-bold mb-2 uppercase">Top P</h3>
              <p className="text-sm font-medium">
                Restricts token selection to a percentage of most likely words.
                A Top P of 0.9 limits the AI choices entirely to the top 90%
                most probable next tokens, cutting off wild outlier guesses.
              </p>
            </div>

            {/* Tokens */}
            <div className="border-2 border-black p-4 rounded-lg bg-[#f4f4f4] shadow-[4px_4px_0_0_#000]">
              <h3 className="text-xl font-bold mb-2 uppercase">Tokens</h3>
              <p className="text-sm font-medium">
                Think of tokens like words, but not exactly. 1 token ≈ 0.75
                words. "JavaScript" might be 1 token while "javascript" could be
                2. It is just the atomic unit the AI uses to process text.
              </p>
            </div>

            {/* Context Windows */}
            <div className="border-2 border-black p-4 rounded-lg bg-[#f4f4f4] shadow-[4px_4px_0_0_#000]">
              <h3 className="text-xl font-bold mb-2 uppercase text-[#ff4911]">
                Context Window
              </h3>
              <p className="text-sm font-medium">
                LLMs have no inherent memory. You send the entire chat history
                back every time. The context window is its maximum token limit.
                Once hit, oldest inputs drop off (First In, First Out) silently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

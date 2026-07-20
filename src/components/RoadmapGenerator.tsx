"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function RoadmapGenerator() {
  const [input, setInput] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Requirements: Adjustable length & Regenerate support
  const [outputLength, setOutputLength] = useState("medium");
  const [lastPrompt, setLastPrompt] = useState("");

  const generateRoadmap = async (promptToUse: string) => {
    if (!promptToUse.trim() || isLoading) return;

    setIsLoading(true);
    setCompletion("");
    setLastPrompt(promptToUse);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/roadmap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: promptToUse,
            length: outputLength, // Backend e length pathano hocche
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setCompletion((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setCompletion("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateRoadmap(input);
  };

  const handleRegenerate = () => {
    if (lastPrompt) {
      generateRoadmap(lastPrompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-slate-900 border border-violet-500/30 rounded-2xl shadow-xl my-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-violet-600/20 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-violet-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          AI Study Roadmap Generator
        </h2>
        <p className="text-slate-400 text-sm">
          Tell us what you want to learn, and our AI will create a customized study plan for you.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Requirement: Adjustable Output Length */}
          <select
            value={outputLength}
            onChange={(e) => setOutputLength(e.target.value)}
            className="px-3.5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-violet-500 transition-colors text-sm cursor-pointer"
          >
            <option value="short">Short Roadmap</option>
            <option value="medium">Medium Roadmap</option>
            <option value="detailed">Detailed Roadmap</option>
          </select>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I want to learn Next.js & Tailwind in 30 days..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-violet-500 transition-colors text-sm"
            required
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>

      {/* Generated Roadmap Result */}
      {(completion || isLoading) && (
        <div className="bg-slate-950 p-6 rounded-xl border border-white/5 space-y-4">
          {isLoading && !completion ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-violet-500" />
              <p>Analyzing your goal and preparing the roadmap...</p>
            </div>
          ) : (
            <>
              <div className="prose prose-invert prose-violet max-w-none text-slate-200">
                <ReactMarkdown>{completion}</ReactMarkdown>
              </div>

              {/* Requirement: Regenerate Response Button */}
              {!isLoading && completion && (
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-violet-400 border border-violet-500/30 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate Response
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
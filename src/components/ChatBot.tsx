"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Sparkles, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`,
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput("");
    await sendMessage({ text: message });
  };

  const handleSuggestedPrompt = async (prompt: string) => {
    await sendMessage({ text: prompt });
  };

  const suggestedPrompts = [
    "What web development courses do you have?",
    "Recommend a course for beginners.",
    "Can you make a study plan for React?"
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      {isOpen ? (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[85vh] bg-slate-950 border border-violet-500/30 rounded-2xl flex flex-col shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3.5 bg-slate-900/90 border-b border-white/10 backdrop-blur">
            <div className="flex items-center gap-2.5 text-white font-bold">
              <div className="p-1.5 bg-violet-600/20 rounded-xl border border-violet-500/30">
                <Bot className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-sm tracking-wide">AuraStudy Buddy</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
            
            {/* Empty State & Suggested Prompts */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full my-auto text-center px-2">
                <div className="p-3 bg-violet-600/10 rounded-2xl border border-violet-500/20 mb-3">
                  <Sparkles className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">Hello there! 👋</h3>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  I&apos;m your AuraStudy AI Assistant. Ask me anything about our courses or study plans!
                </p>
                
                <div className="w-full space-y-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="w-full text-left px-3.5 py-2.5 text-xs bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800 hover:border-violet-500/40 rounded-xl transition-all shadow-sm"
                    >
                      ✨ {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-600/10"
                      : "bg-slate-900 text-slate-200 border border-white/5 rounded-tl-none prose prose-invert prose-sm max-w-none"
                  }`}
                >
                  {message.parts?.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <ReactMarkdown key={index}>
                          {part.text}
                        </ReactMarkdown>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {/* Error Message */}
            {error && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-red-500/10 text-red-400 px-3 py-2 rounded-xl text-xs border border-red-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-slate-400 text-xs flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/10 bg-slate-900/90 backdrop-blur"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Aura AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-10 px-3.5 rounded-xl bg-slate-800/80 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-violet-500 transition-colors placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-violet-600/20 shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/30 h-13 w-13 sm:h-14 sm:w-14 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Open AI chatbot"
        >
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
        </button>
      )}
    </div>
  );
}
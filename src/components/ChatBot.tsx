"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Sparkles } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`,
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading =
    status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const message = input.trim();

    setInput("");

    await sendMessage({
      text: message,
    });
  };

  

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-slate-950 border border-violet-500/30 rounded-2xl flex flex-col shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-white/5">
            <div className="flex items-center gap-2 text-white font-bold">
              <Bot className="w-5 h-5 text-violet-400" />
              <span>AuraStudy Buddy</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.length === 0 && (
              <div className="text-center mt-10 text-slate-500 text-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-violet-500" />

                <p>
                  Hello! I'm AuraStudy AI Assistant.
                  <br />
                  I can help you find what you're looking for.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-none"
                      : "bg-slate-900 text-slate-200 border border-white/5 rounded-tl-none"
                  }`}
                >
                  {message.parts?.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <span key={index}>
                          {part.text}
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 px-4 py-3 rounded-2xl text-slate-400 text-sm">
                  AuraStudy AI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/5 bg-slate-900"
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Aura AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg bg-slate-800 border border-white/10 text-white outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-lg bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center disabled:opacity-50"
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
          className="rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg h-14 w-14 flex items-center justify-center"
          aria-label="Open AI chatbot"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
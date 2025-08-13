//----------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReactMarkdown from "react-markdown";

type Message = {
  sender: "user" | "bot";
  content: string;
};

const HomePage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://swan-intimate-positively.ngrok-free.app/webhook/rag-hcai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "tes",
            prompt: input,
          }),
        },
      );

      const data = await res.json();
      const botReply: Message = {
        sender: "bot",
        content:
          data.response || data.prompt || "⚠️ Tidak ada jawaban dari AI.",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: "⚠️ Terjadi kesalahan saat menghubungi API.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 px-4 py-8">
        {/* Logo dan Welcome jika belum ada chat */}
        {messages.length === 0 ? (
          <>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold text-gray-900">HCSP-AI</h1>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12L12 5L19 12"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19V5"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="max-w-md text-center text-base text-gray-600">
              Welcome to HCSP-AI! Access insights to enhance decisions and build
              teams.
            </p>
          </>
        ) : (
          <>
            {/* Chat bubbles */}
            <div className="flex w-full max-w-2xl flex-col space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-full break-words rounded-xl px-4 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }} // menjaga newline
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="animate-pulse rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-500">
                    HCSP-AI sedang mengetik...
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Input */}
        <div className="w-full max-w-2xl pt-4">
          <div className="flex items-center rounded-xl border border-gray-300 p-4 shadow-sm">
            <input
              type="text"
              placeholder="Ask HCSP-AI anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-full bg-green-500 p-2 text-white transition hover:bg-green-600 disabled:opacity-50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m0 0l-6-6m6 6l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;



"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";
import { ChatMessage } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // generate session baru setiap buka halaman
useEffect(() => {
  const newId = uuidv4();       // selalu bikin baru
  localStorage.setItem("chat_session_id", newId);
  setSessionId(newId);
}, []);


  // fetch awal + realtime
  useEffect(() => {
    if (!sessionId) return;

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("id", { ascending: true });

      if (!error && data) {
        setMessages(data as ChatMessage[]);
      }
    };

    fetchHistory();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    setLoading(true);
    const userText = input;
    setInput("");

    try {
      const res = await fetch(
        "https://presently-welcome-alien.ngrok-free.app/webhook/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            prompt: userText,
          }),
        }
      );

      await res.json();
      // realtime akan otomatis update
    } catch (err) {
      console.error("API error:", err);
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

  if (!sessionId) return <div>Loading session...</div>;

  return (
    <DefaultLayout>
      <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 px-4 py-8">
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
          <div className="flex w-full max-w-2xl flex-col space-y-2 pb-32">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
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
        )}

        {/* Input */}
        <div className="w-full max-w-2xl mt-4 fixed bottom-0 bg-white rounded-xl">
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
          <div className="bg-gray-100 h-20">
            
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;

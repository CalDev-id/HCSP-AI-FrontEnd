// "use client";

// import { useEffect, useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import ReactMarkdown from "react-markdown";
// import { supabase } from "@/lib/supabaseClient";
// import { ChatMessage } from "@/types/chat";
// import { v4 as uuidv4 } from "uuid";
// import { useParams } from "next/navigation";

// const TaskDetailPage = () => {
//   const params = useParams();
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // generate session baru setiap buka halaman
//   useEffect(() => {
//     const newId = uuidv4();
//     localStorage.setItem("chat_session_id", newId);
//     setSessionId(newId);
//   }, []);

//   // fetch awal + realtime
//   useEffect(() => {
//     if (!sessionId) return;

//     const fetchHistory = async () => {
//       const { data, error } = await supabase
//         .from("chat_messages")
//         .select("*")
//         .eq("session_id", sessionId)
//         .order("id", { ascending: true });

//       if (!error && data) {
//         setMessages(data as ChatMessage[]);
//       }
//     };

//     fetchHistory();

//     const channel = supabase
//       .channel("chat-room")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "chat_messages",
//           filter: `session_id=eq.${sessionId}`,
//         },
//         (payload) => {
//           const newMsg = payload.new as ChatMessage;
//           setMessages((prev) => [...prev, newMsg]);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [sessionId]);

//   const sendMessage = async () => {
//     if (!input.trim() || !sessionId) return;

//     setLoading(true);
//     const userText = input;
//     setInput("");

//     try {
//       const res = await fetch(
//         "https://swan-intimate-positively.ngrok-free.app/webhook/create-djm",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             sessionId,
//             prompt: userText,
//           }),
//         }
//       );

//       await res.json();
//       // realtime akan otomatis update
//     } catch (err) {
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   if (!sessionId) return <div>Loading session...</div>;

//   return (
//     <DefaultLayout>
//       <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">
//           Task: create-djm
//         </h1>

//         {messages.length === 0 ? (
//           <>
//             <div className="flex items-center space-x-2">
//               <h1 className="text-3xl font-extrabold text-gray-900">HCSP-AI</h1>
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 12L12 5L19 12"
//                   stroke="#22C55E"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12 19V5"
//                   stroke="#22C55E"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <p className="max-w-md text-center text-base text-gray-600">
//               Welcome to HCSP-AI! Access insights to enhance decisions and build
//               teams.
//             </p>
//           </>
//         ) : (
//           <div className="flex w-full max-w-2xl flex-col space-y-2">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-full break-words rounded-xl px-4 py-2 text-sm ${
//                     msg.sender === "user"
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                   style={{ whiteSpace: "pre-wrap" }}
//                 >
//                   <ReactMarkdown>{msg.message}</ReactMarkdown>
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="animate-pulse rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-500">
//                   HCSP-AI sedang mengetik...
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Input */}
//         <div className="w-full max-w-2xl mt-4 fixed bottom-40 bg-white rounded-xl">
//           <div className="flex items-center rounded-xl border border-gray-300 p-4 shadow-sm">
//             <input
//               type="text"
//               placeholder="Ask HCSP-AI anything"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 outline-none"
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="rounded-full bg-green-500 p-2 text-white transition hover:bg-green-600 disabled:opacity-50"
//             >
//               <svg
//                 className="h-5 w-5"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 12h14m0 0l-6-6m6 6l-6 6"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default TaskDetailPage;


// "use client";

// import { useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// interface FileLinks {
//   [key: string]: string;
// }

// export default function DJMPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [files, setFiles] = useState<FileLinks>({});
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<"success" | "error" | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("data", file);

//     setLoading(true);
//     setStatus(null);
//     try {
//       const res = await fetch(
//         "https://presently-welcome-alien.ngrok-free.app/webhook-test/create-djm",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       setFiles(data);
//       setStatus("success");
//     } catch (err) {
//       console.error("Error uploading:", err);
//       setStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <div className="min-h-screen p-6">
//         <h1 className="mb-4 text-xl font-bold">Upload File DJM</h1>

//         {/* ALERT */}
//         {status === "success" && (
//           <div role="alert" className="alert alert-success mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 shrink-0 stroke-current"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>Upload berhasil!</span>
//           </div>
//         )}

//         {status === "error" && (
//           <div role="alert" className="alert alert-error mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 shrink-0 stroke-current"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>Upload gagal. Silakan coba lagi.</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="mb-6 space-y-3">
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="file-input"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-lg bg-greenPrimary px-4 py-2 text-white disabled:opacity-50 ml-5"
//           >
//             {loading ? "Processing..." : "Upload"}
//           </button>
//         </form>

//         {Object.keys(files).length > 0 && (
//           <div>
//             <h2 className="mb-3 text-lg font-semibold">Generated Files</h2>
//             <ul className="space-y-3">
//               {Object.entries(files).map(([name, url]) => (
//                 <li
//                   key={name}
//                   className="flex items-center justify-between rounded-lg bg-gray-100 p-3 shadow"
//                 >
//                   <span>{name}</span>
//                   <button
//                     onClick={async () => {
//                       try {
//                         const response = await fetch(url);
//                         const blob = await response.blob();
//                         const blobUrl = window.URL.createObjectURL(blob);

//                         const a = document.createElement("a");
//                         a.href = blobUrl;
//                         a.download = `${name}.xlsx`;
//                         document.body.appendChild(a);
//                         a.click();
//                         a.remove();
//                         window.URL.revokeObjectURL(blobUrl);
//                       } catch (err) {
//                         console.error("Download failed", err);
//                       }
//                     }}
//                     className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
//                   >
//                     Download
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </DefaultLayout>
//   );
// }
"use client";

import { useState, useRef } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Upload } from "lucide-react";

interface FileLinks {
  [key: string]: string;
}

export default function DJMPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileLinks>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("data", file);

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(
        "https://presently-welcome-alien.ngrok-free.app/webhook-test/create-djm",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFiles(data);
      setStatus("success");
    } catch (err) {
      console.error("Error uploading:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen p-6">
        <h1 className="mb-4 text-xl font-bold">Upload File DJM</h1>

        {/* ALERT */}
        {status === "success" && (
          <div role="alert" className="alert alert-success mb-4">
            ✅ <span>Upload berhasil!</span>
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="alert alert-error mb-4">
            ❌ <span>Upload gagal. Silakan coba lagi.</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          {/* Drag & Drop Area */}
          <div
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 bg-gray-50 p-10 text-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setFile(e.dataTransfer.files[0]);
              }
            }}
          >
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            {file ? (
              <p className="text-green-600 font-medium">{file.name}</p>
            ) : (
              <div className="text-gray-500">
                <p className="font-medium">Drag and drop here</p>
                <p className="text-sm">or</p>
                <p className="text-blue-600 underline">browse</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="rounded-lg bg-greenPrimary px-6 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>

        {/* Skeleton saat menunggu response */}
        {loading && (
          <div className="animate-pulse">
            <div className="skeleton h-16 w-full mb-5 bg-slate-200 rounded-lg"></div>
            <div className="skeleton h-16 w-full mb-5 bg-slate-200 rounded-lg"></div>
            <div className="skeleton h-16 w-full mb-5 bg-slate-200 rounded-lg"></div>
            <div className="skeleton h-16 w-full mb-5 bg-slate-200 rounded-lg"></div>
          </div>
        )}

        {/* Daftar file muncul hanya kalau ada hasil */}
        {!loading && Object.keys(files).length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">Generated Files</h2>
            <ul className="space-y-3">
              {Object.entries(files).map(([name, url]) => (
                <li
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-gray-100 p-3 shadow"
                >
                  <span>{name}</span>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = blobUrl;
                        a.download = `${name}.xlsx`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(blobUrl);
                      } catch (err) {
                        console.error("Download failed", err);
                      }
                    }}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

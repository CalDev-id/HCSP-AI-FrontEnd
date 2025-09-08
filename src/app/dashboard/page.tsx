// "use client";

// import { useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// const DashboardPage = () => {
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<{ api1?: string; api2?: string }>({});

//   const fetchApi = async (url: string, key: "api1" | "api2") => {
//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const text = await res.text();
//       let parsed: any;
//       try {
//         parsed = JSON.parse(text);
//       } catch {
//         parsed = text;
//       }

//       // pastikan hasilnya string supaya bisa dirender
//       const safeResult =
//         typeof parsed === "object" ? JSON.stringify(parsed) : parsed;

//       setResponse((prev) => ({
//         ...prev,
//         [key]: safeResult,
//       }));
//     } catch (error) {
//       console.error(`Error fetching ${key}:`, error);
//       setResponse((prev) => ({
//         ...prev,
//         [key]: `Error fetching ${key.toUpperCase()}`,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setLoading(true);
//     setResponse({});

//     fetchApi(
//       "https://swan-intimate-positively.ngrok-free.app/webhook/api1",
//       "api1"
//     );
//     fetchApi(
//       "https://swan-intimate-positively.ngrok-free.app/webhook/api2",
//       "api2"
//     );

//     setTimeout(() => setLoading(false), 2000);
//   };

//   return (
//     <DefaultLayout>
//       <div className="p-4">
//         <h1 className="text-xl font-bold mb-4">Chatbot</h1>
//         <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Tulis pesan..."
//             className="border p-2 flex-1 rounded"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Loading..." : "Kirim"}
//           </button>
//         </form>

//         <div className="space-y-2">
//           {response.api1 && (
//             <div className="p-2 border rounded">
//               <strong>API1:</strong> {response.api1}
//             </div>
//           )}
//           {response.api2 && (
//             <div className="p-2 border rounded">
//               <strong>API2:</strong> {response.api2}
//             </div>
//           )}
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default DashboardPage;












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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("data", file); // key harus sama dengan di n8n webhook

//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://presently-welcome-alien.ngrok-free.app/webhook-test/create-djm",
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       setFiles(data);
//     } catch (err) {
//       console.error("Error uploading:", err);
//       alert("Upload gagal");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <div className="p-6">
//         <h1 className="mb-4 text-xl font-bold">Upload File DJM</h1>

//         <form onSubmit={handleSubmit} className="mb-6 space-y-3">
//           {/* <input
//             type="file"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="block"
//           /> */}
//           <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="file-input" />
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
//                         a.download = `${name}.xlsx`; // nama file download
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

import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface FileLinks {
  [key: string]: string;
}

export default function DJMPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileLinks>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Upload berhasil!</span>
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Upload gagal. Silakan coba lagi.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-greenPrimary px-4 py-2 text-white disabled:opacity-50 ml-5"
          >
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>

        {Object.keys(files).length > 0 && (
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

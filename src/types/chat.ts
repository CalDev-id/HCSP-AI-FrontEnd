// types/chat.ts
export type ChatMessage = {
  id: number;
  session_id: string;
  sender: "user" | "bot"; // sesuai definisi tabel
  message: string;
  created_at: string; // bisa pakai Date kalau mau
};

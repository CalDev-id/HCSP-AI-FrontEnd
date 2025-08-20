// // services/chatServices.ts
// import { supabase } from "@/lib/supabaseClient";
// import { ChatMessage } from "@/types/chat";

// export async function fetchChatHistory(sessionId: string): Promise<ChatMessage[]> {
//   const { data, error } = await supabase
//     .from("chat_messages")
//     .select("id, session_id, sender, message, created_at")
//     .eq("session_id", sessionId)
//     .order("id", { ascending: true });

//   if (error) {
//     console.error("Error fetching chat history:", error);
//     return [];
//   }

//   return data as ChatMessage[];
// }

// // export async function sendChatMessage(
// //   sessionId: string,
// //   sender: "user" | "bot",
// //   message: string
// // ): Promise<ChatMessage | null> {
// //   const { data, error } = await supabase
// //     .from("chat_messages")
// //     .insert([{ session_id: sessionId, sender, message }])
// //     .select()
// //     .single();

// //   if (error) {
// //     console.error("Error sending message:", error);
// //     return null;
// //   }

// //   return data as ChatMessage;
// // }

// services/sessionService.ts






// import { supabase } from "@/lib/supabaseClient";



import { supabase } from "@/lib/supabaseClient";
import { ChatMessage } from "@/types/chat";

// Ambil semua pesan untuk 1 session
export const getChatMessages = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as ChatMessage[];
};

// Kirim pesan baru
export const sendMessage = async (
  sessionId: string,
  sender: "user" | "bot",
  message: string
) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .insert([{ session_id: sessionId, sender, message }])
    .select();

  if (error) throw error;
  return data as ChatMessage[];
};

export async function getSessions() {
  // Ambil pesan pertama dari tiap session
  const { data, error } = await supabase
    .from("chat_messages")
    .select("session_id, message, id")
    .order("id", { ascending: true });

  if (error) throw error;

  // Group by session_id, ambil message pertama
  const sessions: { session_id: string; title: string }[] = [];
  const seen = new Set();

  for (const row of data) {
    if (!seen.has(row.session_id)) {
      sessions.push({
        session_id: row.session_id,
        title: row.message.substring(0, 30) || "Untitled", // potong biar pendek
      });
      seen.add(row.session_id);
    }
  }

  return sessions;
}
import { API_BASE_URL } from "../utils/constants";

export async function sendMessage(message) {
  const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Chatbot API failed");
  }

  const data = await res.json();

  // ✅ backend returns { reply: "..." }
  return data.reply;
}


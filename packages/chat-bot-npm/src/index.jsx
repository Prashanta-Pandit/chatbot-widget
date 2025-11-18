import React from "react";
import { MessageCircle } from "lucide-react"; // optional icon
import "./index.css";

export default function ChatBotWidget() {
  return (
    <div
      className="fixed bottom-4 right-4 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg
                 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
    >
      <MessageCircle size={28} />
    </div>
  );
}

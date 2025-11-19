// components/ChatButton.jsx
import React from "react";
import { MessageCircle } from "lucide-react";


const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat support"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
    >
      <MessageCircle size={30} strokeWidth={2.2} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg" />
    </button>
  );
};

export default ChatButton;
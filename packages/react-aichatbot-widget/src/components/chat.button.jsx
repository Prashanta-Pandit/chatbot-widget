import React from "react";
import { MessageCircle } from "lucide-react";

const ChatButton = ({ onClick, primaryColor, secondaryColor, position, fontColor }) => {
  const posClass = position === "left" ? "left-8" : "right-8";
  console.log("ChatButton position:", position);
  console.log('chatbot fontColor:', fontColor, primaryColor, secondaryColor);

  return (
    <button
      onClick={onClick}
      aria-label="Open chat support"
      className={`fixed bottom-8 ${posClass} w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-${primaryColor}/50 bg-gradient-to-br from-${primaryColor} to-${secondaryColor} text-${fontColor}`}
    >
      <MessageCircle size={30} strokeWidth={2.2} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg" />
    </button>
  );
};

export default ChatButton;
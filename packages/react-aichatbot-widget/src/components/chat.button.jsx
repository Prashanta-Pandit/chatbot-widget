// components/chat.button.jsx
import { MessageCircle, X } from "lucide-react";

const ChatButton = ({ onClick, isOpen, theme, chatBotData }) => {
const pos = chatBotData.position === "left" ? "left-8" : "right-8";

 const buttonStyle = {
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)" // <- just the value
  };


  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 ${pos} hover:cursor-pointer pointer-events-auto w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2`}
      style={buttonStyle}
    >
      {isOpen ? <X size={30} strokeWidth={2.5} /> : <MessageCircle size={30} strokeWidth={2.5} />}
      
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-white animate-pulse" />
      )}
    </button>
  );
};

export default ChatButton;
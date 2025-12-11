// components/chat.button.jsx
import { MessageCircle, Minus } from "lucide-react";
import { Theme, ChatBotData } from "./types/types";

interface ChatButtonProps {
  onMinimise: () => void ;
  isOpen: boolean ;
  theme: Theme;
  chatBotData: ChatBotData;
}

const ChatButton = ({ onMinimise, isOpen, theme, chatBotData } : ChatButtonProps) => {
  const isLeft = chatBotData.position === "left";
  const posLeft = isLeft ? "32px" : "auto";
  const posRight = isLeft ? "auto" : "32px";

  const buttonStyle : React.CSSProperties = {
    position: "fixed",
    bottom: "32px",
    left: posLeft,
    right: posRight,
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "none",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    pointerEvents: "auto",
    transition: "all 300ms ease",
    outline: "none",
  };

  // Badge (pulse dot when closed)
  const badgeStyle : React.CSSProperties = {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "16px",
    height: "16px",
    backgroundColor: "#34d399",
    borderRadius: "50%",
    border: "4px solid white",
    animation: "pulse 2s infinite",
  };

  return (
    <button
      onClick={onMinimise}
      style={buttonStyle}
    >
      {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <MessageCircle size={20} strokeWidth={2.5} />}

      {!isOpen && <span style={badgeStyle} />}
    </button>
  );
};

export default ChatButton;
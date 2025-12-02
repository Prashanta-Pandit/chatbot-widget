// components/chat.button.jsx
import { MessageCircle, Minus } from "lucide-react";

const ChatButton = ({ onMinimise, isOpen, theme, chatBotData }) => {
  const isLeft = chatBotData.position === "left";
  const posLeft = isLeft ? "32px" : "auto";
  const posRight = isLeft ? "auto" : "32px";

  const buttonStyle = {
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

  const hoverFocusStyle = {
    transform: "scale(1.10)",
    boxShadow: "0 25px 35px -5px rgba(0,0,0,0.2)",
  };

  // Badge (pulse dot when closed)
  const badgeStyle = {
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
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverFocusStyle)}
      onMouseLeave={(e) => Object.keys(hoverFocusStyle).forEach(key => e.currentTarget.style[key] = buttonStyle[key] || "")}
      onFocus={(e) => Object.assign(e.currentTarget.style, hoverFocusStyle)}
      onBlur={(e) => Object.keys(hoverFocusStyle).forEach(key => e.currentTarget.style[key] = buttonStyle[key] || "")}
    >
      {isOpen ? <Minus size={30} strokeWidth={2.5} /> : <MessageCircle size={30} strokeWidth={2.5} />}

      {!isOpen && <span style={badgeStyle} />}
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
          }
        }
      `}</style>
    </button>
  );
};

export default ChatButton;
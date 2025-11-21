import React, { useRef, useEffect } from "react";
import { Ellipsis } from "lucide-react";

const ChatPanelMessagesBox = ({ messages, isLoading, theme }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Base container
  const containerStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    background: theme.backgroundColor,
    color: theme.fontColor,
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  // Message wrapper (aligns user vs bot)
  const messageWrapperStyle = (type) => ({
    display: "flex",
    justifyContent: type === "user" ? "flex-end" : "flex-start",
    width: "100%",
  });

  // Message bubble
  const bubbleStyle = (type) => ({
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e4e4e7",
    maxWidth: "80%",
    fontSize: "14px",
    lineHeight: "1.5",
    background: type === "user" ? theme.primaryColor : theme.backgroundColor,
    color: theme.fontColor,
    wordWrap: "break-word",
  });

  // Special style for bot typing bubble (rounded-bl-none → rounded bottom-left only)
  const typingBubbleStyle = {
    ...bubbleStyle("bot"),
    borderBottomLeftRadius: "4px", // instead of rounded-bl-none
  };

  return (
    <div style={containerStyle}>
      {messages.map((msg, index) => (
        <div key={index} style={messageWrapperStyle(msg.type)}>
          <div style={bubbleStyle(msg.type)}>
            {msg.text}
          </div>
        </div>
      ))}

      {isLoading && (
        <div style={messageWrapperStyle("bot")}>
          <div style={typingBubbleStyle}>
            <Ellipsis size={24} style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      {/* Pulse animation for the ellipsis */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPanelMessagesBox;
import React, { useRef, useEffect } from "react";
import { Bot } from "lucide-react";

const ChatPanelMessagesBox = ({ messages , isLoading, theme, botResponseTime }) => {
  const messagesEndRef = useRef(null);

  console.log("Messages in MessageBox:", messages);

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

  // Message bubble container with timestamp
  const bubbleContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  };

  // Message bubble
  const bubbleStyle = (type) => ({
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e4e4e7",
    fontSize: "14px",
    lineHeight: "1.5",
    background: type === "user" ? theme.primaryColor : theme.backgroundColor,
    color: theme.fontColor,
    wordWrap: "break-word"
  });

 const typingBubbleStyle = {
    ...bubbleStyle("bot"),
    animation: 'fadeIn 0.3s ease-in-out, pulse 1.5s ease-in-out infinite',
    animationDelay: '0s, 0.3s'
  };

  return (
    <div style={containerStyle}>
      {messages.map((msg, index) => (
        <div key={index} style={messageWrapperStyle(msg.type)}>
          <div style={bubbleContainerStyle}>
            {/* Timestamp and bot icon for a ai response */}
            {msg.type === "bot" && botResponseTime && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-start", marginLeft: "4px", marginBottom: "2px" }}>
                <Bot size={14} color={theme.fontColor} />
                <span
                  style={{
                    fontSize: "10px",
                    opacity: 0.55,
                    color: theme.fontColor,
                  }}
                >
                  {botResponseTime}
                </span>
              </div>
            )}
            
            {/* Icon for user response */}
            {
              msg.type === "user" && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginRight: "4px", marginBottom: "2px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    opacity: 0.55,
                    color: theme.fontColor,
                  }}
                >
                  You
                </span>
              </div>
            )
            }

            {/* Message bubble */}
            <div style={bubbleStyle(msg.type)}>
              {msg.text}
            </div>
          </div>

        </div>
      ))}

      {isLoading && (
        <div style={messageWrapperStyle("bot")}>
          <div style={typingBubbleStyle}>
            <Bot size={24} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatPanelMessagesBox;
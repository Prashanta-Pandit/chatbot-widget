import React, { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { Theme, Message } from '../types/types';

interface ChatPanelMessageBoxProps {
  theme: Theme;
  messages: Message[] ;
  isLoading: boolean;
}

const ChatPanelMessagesBox = ({ messages , isLoading, theme } : ChatPanelMessageBoxProps) => {
  console.log('messages', messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function formatTimestamp(timestamp : string) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-AU', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Base container
  const containerStyle  : React.CSSProperties = {
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
  const messageWrapperStyle = (sender_type : string) : React.CSSProperties => ({
    display: "flex",
    justifyContent: sender_type === "user" ? "flex-end" : "flex-start",
    width: "100%",
  });

  // Message bubble container with timestamp
  const bubbleContainerStyle  : React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  };

  // Message bubble
  const bubbleStyle  = (sender_type : string) : React.CSSProperties => ({
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e4e4e7",
    fontSize: "14px",
    lineHeight: "1.5",
    background: sender_type === "user" ? theme.primaryColor : theme.backgroundColor,
    color: theme.fontColor,
    wordWrap: "break-word"
  });

 const typingBubbleStyle: React.CSSProperties = {
    ...bubbleStyle("bot"),
    animation: 'fadeIn 0.3s ease-in-out, pulse 1.5s ease-in-out infinite',
    animationDelay: '0s, 0.3s'
  };

  return (
    <div style={containerStyle}>
      {messages.map((msg:Message, index: number) => (
        <div key={index} style={messageWrapperStyle(msg.sender_type)}>
          <div style={bubbleContainerStyle}>
            {/* Timestamp and bot icon for a ai response */}
            {msg.sender_type === "bot"  && msg.created_at && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-start", marginLeft: "4px", marginBottom: "2px" }}>
                <Bot size={14} color={theme.fontColor} />
                <span
                  style={{
                    fontSize: "10px",
                    opacity: 0.55,
                    color: theme.fontColor,
                  }}
                >
                  {formatTimestamp(msg.created_at)}
                </span>
              </div>
            )}
            
            {/* Icon for user response */}
            {
              msg.sender_type === "user" && (
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
            <div style={bubbleStyle(msg.sender_type)}>
              {msg.message}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div style={messageWrapperStyle("bot")}>
          <div style={{
            ...typingBubbleStyle, 
            display: "flex", 
            alignItems: "center", 
            gap: "8px" 
          }}>
            <Bot size={24} />
            <span>Typing...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatPanelMessagesBox;
import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatPanelForm = ({ onSendMessage, isLoading, theme }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Container (bottom input bar)
  const containerStyle = {
    padding: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    background: theme.backgroundColor,
    flexShrink: 0,
  };

  const wrapperStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  };

  // Input field
  const inputStyle = {
    flex: 1,
    padding: "12px 16px",
    background: theme.inputBackgroundColor || theme.backgroundColor,
    color: theme.fontColor,
    border: `1px solid ${theme.fontColor}`,
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    opacity: isLoading ? 0.5 : 1,
    cursor: isLoading ? "not-allowed" : "text",
    boxShadow: "none",
  };

  // Send button
  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    border: "none",
    cursor: (isLoading || !inputValue.trim()) ? "not-allowed" : "pointer",
    opacity: (isLoading || !inputValue.trim()) ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
    minWidth: "48px",
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} // onKeyPress is deprecated → use onKeyDown
          disabled={isLoading}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 0 3px rgba(100, 150, 255, 0.3)";
            e.target.style.borderColor = "#60a5fa";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
            e.target.style.borderColor = theme.fontColor;
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading || !inputValue.trim()}
          style={buttonStyle}
          aria-label="Send message"
          onMouseEnter={(e) => {
            if (!isLoading && inputValue.trim()) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanelForm;
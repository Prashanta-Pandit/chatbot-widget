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

  return (
    <div className="p-4 border-t border-white flex-shrink-0"
      style={{ background: theme.backgroundColor }}
    >
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: theme.inputBackgroundColor, 
            color: theme.fontColor, 
            borderColor: theme.fontColor
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !inputValue.trim()}
          className="disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 hover:cursor-pointer"
          style={{ 
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            color: theme.fontColor
           }}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanelForm;
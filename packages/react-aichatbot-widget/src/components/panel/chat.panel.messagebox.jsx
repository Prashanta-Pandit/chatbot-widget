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

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4 border-t border-white"
      style={{ background: theme.backgroundColor, color: theme.fontColor,  }}
    >
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : ""}`}>
          <div
            className="px-4 py-3 rounded-2xl shadow-sm border border-neutral-200 max-w-[80%] text-sm leading-relaxed"
            style={{
              background: msg.type === "user" ? theme.primaryColor : theme.backgroundColor,
              color: msg.type === "bot" ? theme.fontColor : theme.fontColor,
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex">
          <div className="px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-neutral-200 max-w-[80%] text-sm leading-relaxed"
            style={{ background: theme.backgroundColor, color: theme.fontColor }}
          >
            <Ellipsis className="animate-pulse" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatPanelMessagesBox;
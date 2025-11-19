import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanelForm from "./chat.panel.form";
import ChatPanelMessagesBox from "./chat.panel.messagebox";
import { handleChat } from "../../n8n/n8n";

const ChatPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! How can I assist you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    setIsLoading(true);

    // Add user message to the chat
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);

    try {
      const metaData = await handleChat(userMessage);

      const botText = metaData.response || "Something went wrong. Please try again.";
      
      setMessages(prev => [...prev, { type: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: "Sorry, something went wrong. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 shadow-xl right-8 z-50 w-96 h-[520px] bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-5 py-4 
                      rounded-t-2xl flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-white/25 rounded-full flex items-center justify-center">
              <MessageCircle size={22} />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
          </div>

          <div>
            <h3 className="font-semibold text-lg leading-tight">Swiggy</h3>
            <p className="text-xs opacity-90">Virtual assistance</p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <ChatPanelMessagesBox messages={messages} isLoading={isLoading} />

      {/* Input Form */}
      <ChatPanelForm onSendMessage={sendMessage} isLoading={isLoading} />

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 text-center flex-shrink-0">
        <p className="text-[11px] text-gray-500 tracking-wide">
          powered by <span className="font-semibold text-gray-600">clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;

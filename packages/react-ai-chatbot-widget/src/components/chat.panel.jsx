// components/ChatPanel.jsx
import React from "react";
import { MessageCircle, X } from "lucide-react";

const ChatPanel = ({ onClose }) => {
  return (
    <div className="fixed bottom-28 right-8 z-50 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-5 py-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={22} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Chat Support</h3>
            <p className="text-xs opacity-90">We&apos;re online — reply in seconds</p>
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
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        <div className="flex">
          <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 max-w-[80%] text-sm leading-relaxed">
            Hi! How can I assist you today?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-sky-600 text-white px-4 py-3 rounded-2xl rounded-br-none shadow-sm max-w-[80%] text-sm leading-relaxed">
            I need help with my account.
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow placeholder-gray-400 text-sm"
          />
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;

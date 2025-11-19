import React from "react";

const ChatPanelMessagesBox = () => {
  return (
    <>
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
    </>
  );
};

export default ChatPanelMessagesBox;
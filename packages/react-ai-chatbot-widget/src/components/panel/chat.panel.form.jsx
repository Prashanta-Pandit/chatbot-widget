// components/ChatPanelForm.jsx
import React from "react";

const ChatPanelForm = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Input Form */}
      <div className="p-5 bg-white border-t border-gray-200 flex-shrink-0">
        <form className="flex flex-col gap-3">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-sky-500 
                       focus:border-transparent transition-shadow placeholder-gray-400 text-sm"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-sky-500 
                       focus:border-transparent transition-shadow placeholder-gray-400 text-sm"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 
                       rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanelForm;
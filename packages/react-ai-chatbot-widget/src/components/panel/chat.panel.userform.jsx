import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatPanelUserForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    if (onSubmit) {
      onSubmit({ name, email });
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="p-5 border-t bg-white flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <p className="text-gray-700 text-sm font-medium">
          Please enter your details to get started.
        </p>

        <div className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 
                         placeholder-gray-400 text-sm bg-gray-50"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 
                         placeholder-gray-400 text-sm bg-gray-50"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name.trim() || !email.trim()}
          className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 
                     disabled:cursor-not-allowed text-white px-5 py-3 
                     rounded-xl font-medium transition-colors shadow-md 
                     hover:shadow-lg flex items-center justify-center gap-2 mt-20"
        >
          <Send size={18} />
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatPanelUserForm;
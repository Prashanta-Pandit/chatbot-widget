import React, { useState } from "react";
import { Send } from "lucide-react";
import { handleChat } from "../../n8n/n8n";

const ChatPanelUserForm = ({ handleMessageFromForm, sessionId, pineconeNamespace, chatbotHostURL }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    const message = `Hi, I am ${name} and my email is ${email}`;

    try {
      const metaData = await handleChat(message, sessionId, pineconeNamespace, chatbotHostURL);
      const botText = metaData.response;

      // send message back to parent
      handleMessageFromForm([
        { type: "user", text: message },
        { type: "bot", text: botText },
      ]);
    } catch (error) {
      console.log("error sending user details", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="p-5 border-t bg-white flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

         {error && (
            <div className="bg-red-100 text-neutral-800 p-2 rounded relative text-center text-sm" role="alert">
              {error}
            </div>
        )}

        <p className="text-neutral-700 text-sm font-medium">
          Please enter your details to get started.
        </p>

        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-neutral-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              className="w-full px-3 py-2 border border-neutral-300 rounded-xl bg-neutral-50"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={!name.trim() || !email.trim() || isLoading}
          className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 
                     disabled:cursor-not-allowed text-white px-5 py-3 
                     rounded-xl font-medium flex items-center justify-center gap-2 mt-20"
        >
          {isLoading ? "Submitting..." : (<><Send size={18} /> Submit</>)}
        </button>
      </form>
    </div>
  );
};

export default ChatPanelUserForm;
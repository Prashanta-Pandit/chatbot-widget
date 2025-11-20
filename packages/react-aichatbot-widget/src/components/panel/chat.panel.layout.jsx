import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanelForm from "./chat.panel.form";
import ChatPanelMessagesBox from "./chat.panel.messagebox";
import ChatPanelUserForm from "./chat.panel.userform";
import { handleChat } from "../../n8n/n8n";

const ChatPanel = ({ onClose, sessionId, pineconeNamespace, chatbotHostURL, primaryColor, secondaryColor, position, fontColor, backgroundColor }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInfo, setHasUserInfo] = useState(false);

  const posClass = position === "left" ? "left-8" : "right-8";

  // Called by UserForm once form submits successfully
  const handleMessageFromForm = (msgs) => {
    setMessages(msgs);
    setHasUserInfo(true);
  };

  const sendMessage = async (userMessage) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);

    try {
      const metaData = await handleChat(userMessage, sessionId, pineconeNamespace, chatbotHostURL);
      const botText = metaData.response;

      setMessages((prev) => [...prev, { type: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-28 shadow-xl ${posClass} z-50 w-96 h-[520px] bg-white/90 backdrop-blur-xl rounded-2xl border border-neutral-100 flex flex-col overflow-hidden`}>

      {/* Header */}
      <div className={`bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-${fontColor} px-5 py-4 rounded-t-2xl flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-11 h-11 bg-${backgroundColor}/25 rounded-full flex items-center justify-center`}>
              <MessageCircle size={22} />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">Swiggy</h3>
            <p className="text-xs opacity-90">Virtual assistance</p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="p-2 hover:bg-white/20 rounded-full">
          <X size={20} />
        </button>
      </div>

      {/* Before submit → Show UserForm */}
      {!hasUserInfo && (
        <ChatPanelUserForm 
          handleMessageFromForm={handleMessageFromForm} 
          sessionId={sessionId} 
          pineconeNamespace={pineconeNamespace} 
          chatbotHostURL={chatbotHostURL}
          fontColor={fontColor} 
          backgroundColor={backgroundColor}
          primaryColor={primaryColor}
        />
      )}

      {/* After submit → Show Chat UI */}
      {hasUserInfo && (
        <>
          <ChatPanelMessagesBox messages={messages} isLoading={isLoading} />
          <ChatPanelForm onSendMessage={sendMessage} isLoading={isLoading} />
        </>
      )}

      {/* Footer */}
      <div className="bg-neutral-50 border-t border-neutral-200 px-5 py-3 text-center">
        <p className="text-[11px] text-neutral-500 tracking-wide">
          powered by <span className="font-semibold text-neutral-600">clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
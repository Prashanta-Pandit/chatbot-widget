import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanelForm from "./chat.panel.form";
import ChatPanelMessagesBox from "./chat.panel.messagebox";
import ChatPanelUserForm from "./chat.panel.userform";
import { handleChat } from "../../n8n/n8n";

const ChatPanel = ({ onClose, theme, chatBotData }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInfo, setHasUserInfo] = useState(false);

  const pos = chatBotData.position === "left" ? "left-8" : "right-8";

  const boxStyle = {
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
    background: theme.backgroundColor,
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor
  }

  const footerStyle = {
    background: theme.backgroundColor,
    color: theme.fontColor
  }

  // Called by UserForm once form submits successfully
  const handleMessageFromForm = (msgs) => {
    setMessages(msgs);
    setHasUserInfo(true);
  };

  const sendMessage = async (userMessage) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);

    try {
      const metaData = await handleChat(userMessage, chatBotData.sessionId, chatBotData.pineconeNamespace, chatBotData.url);
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
    <div
      className={`fixed bottom-28 ${pos} z-50 w-96 h-[520px] bg-white/90 backdrop-blur-xl rounded-2xl border border-white flex flex-col overflow-hidden`}
      style={boxStyle}
    >
      {/* Header */}
      <div className="bg-gradient-to-r px-5 py-4 rounded-t-2xl flex items-center justify-between shadow-md"
        style={headerStyle}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center`}>
              <MessageCircle size={22} />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-1 border-white" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{chatBotData.name}</h3>
            <p className="text-xs opacity-90">{chatBotData.subTitle}</p>
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
          theme={theme}
          chatBotData={chatBotData}
        />
      )}

      {/* After submit → Show Chat UI */}
      {hasUserInfo && (
        <>
          <ChatPanelMessagesBox messages={messages} isLoading={isLoading} theme={theme}/>
          <ChatPanelForm onSendMessage={sendMessage} isLoading={isLoading} theme={theme}/>
        </>
      )}

      {/* Footer */}
      <div className="border-t border-neutral-200 px-5 py-3 text-center"
        style={footerStyle}
      >
        <p className="text-[11px]  tracking-wide"
         style = {{ color: `${theme.fontColor}` }}  
        >
          powered by <span className="font-semibold "
            style = {{ color: `${theme.fontColor}` }}
          >clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
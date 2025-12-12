import React, { useState, useEffect } from "react";
import { MessageCircle, Minimize2, Maximize2, X } from "lucide-react";
import UserInputForm from "./chat.panel.userinputform";
import ChatPanelMessagesBox from "./chat.panel.messagebox";
import ChatPanelUserForm from "./chat.panel.userform";
import { handleEachChat } from "../../n8n/n8n";

import { ChatBotData, Theme, Message  } from "../types/types";

interface ChatPanelProps {
  onClose: () => void ;
  theme: Theme;
  chatBotData: ChatBotData;
}

const ChatPanel = ({ onClose, theme, chatBotData } : ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUserInfo, setHasUserInfo] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');

  const isLeft = chatBotData.position === "left";

  const handleChatSessionIdFromUserForm = (id : string) => {
    setSessionId(id); 
  }

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "112px",
    [isLeft ? "left" : "right"]: "32px",
    zIndex: 50,
    width: isExpand ? "684px" : "384px",
    height: isExpand ? "620px" : "520px",
    background: `${theme.backgroundColor}cc`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  // Header gradient bar
  const headerStyle: React.CSSProperties = {
    padding: "16px 20px",
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    borderRadius: "16px 16px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  };

  // Avatar container
  const avatarWrapperStyle: React.CSSProperties = {
    position: "relative",
  };

  const avatarCircleStyle : React.CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onlineDotStyle : React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "14px",
    height: "14px",
    backgroundColor: "#34d399",
    borderRadius: "50%",
    border: "3px solid white",
  };

  const titleStyle : React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    lineHeight: "1.2",
  };

  const subtitleStyle  : React.CSSProperties= {
    fontSize: "12px",
    opacity: 0.9,
    margin: 0,
    lineHeight: "1.3",
  };

  const topButtonStyle : React.CSSProperties= {
    padding: "8px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  // Footer
  const footerStyle: React.CSSProperties = {
    padding: "12px 20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    background: theme.backgroundColor,
    textAlign: "center",
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: "11px",
    color: theme.fontColor,
    letterSpacing: "0.5px",
  };

  const footerBoldStyle: React.CSSProperties = {
    fontWeight: "600",
  };

  // Hover effect for close button
  const handleTopButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter : boolean) => {
    e.currentTarget.style.background = enter ? "rgba(255,255,255,0.2)" : "transparent";
  };


  const handleMessageFromForm = (msgs : any) => {
    setMessages(msgs);
    setHasUserInfo(true);
  };

  const sendMessage = async (userMessage : string) => {
    setIsLoading(true);
    setMessages((prev: Message[]) => [...prev, { type: "user", text: userMessage }]);

    try {
      const data = await handleEachChat (
        userMessage,
        chatBotData.pineconeNamespace,
        chatBotData.onGoingChatUrl,
        sessionId,
      );
      
      setMessages((prev : Message[]) => [...prev, { type: "bot", text: data.n8n.response, response_timestamp: data.n8n.response_timestamp, suggested_prompts: data.n8n.suggested_prompt }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev:Message[]) => [
        ...prev,
        { type: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={avatarWrapperStyle}>
            <div style={avatarCircleStyle}>
              <MessageCircle size={22} />
            </div>
            <span style={onlineDotStyle} />
          </div>
          <div>
            <h3 style={titleStyle}>{chatBotData.name}</h3>
            <p style={subtitleStyle}>{chatBotData.subTitle}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "left" }}>
          <button
            onClick={() => setIsExpand(prev => !prev)}
            aria-label="expand chat"
            style={topButtonStyle}
            onMouseEnter={(e) => handleTopButtonHover(e, true)}
            onMouseLeave={(e) => handleTopButtonHover(e, false)}
          >
            {
              isExpand ? <Minimize2 size={20} /> : <Maximize2 size={20} />
            }
          </button>

          <button
            onClick={onClose}
            aria-label="close chat"
            style={topButtonStyle}
            onMouseEnter={(e) => handleTopButtonHover(e, true)}
            onMouseLeave={(e) => handleTopButtonHover(e, false)}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Conditional Content */}
      {!sessionId ? (
        <ChatPanelUserForm
          handleMessageFromForm={handleMessageFromForm}
          theme={theme}
          chatBotData={chatBotData}
          setChatSessionId={handleChatSessionIdFromUserForm}
        />
      ) : (
        <>
          <ChatPanelMessagesBox messages={messages} isLoading={isLoading} theme={theme} />
          <UserInputForm onSendMessage={sendMessage} isLoading={isLoading} theme={theme} />
        </>
      )}

      {/* Footer */}
      <div style={footerStyle}>
        <p style={footerTextStyle}>
          powered by{" "}
          <span style={footerBoldStyle}>clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
import React, { useState, useEffect } from "react";
import { MessageCircle, Minimize2, Maximize2, X, Loader2 } from "lucide-react";
import UserInputForm from "./chat.panel.userinputform";
import ChatPanelMessagesBox from "./chat.panel.messagebox";
import ChatPanelUserForm from "./chat.panel.userform";
import { handleEachChat, handleFetchChatHistory } from "../../n8n/n8n";

import { ChatBotData, Theme, Message } from "../types/types";

interface ChatPanelProps {
  onClose: () => void;
  theme: Theme;
  chatBotData: ChatBotData;
}

const ChatPanel = ({ onClose, theme, chatBotData }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [hasFormData, setHasFormData] = useState<boolean>(false);

  const isLeft = chatBotData.position === "left";
  const sessionId: any = localStorage.getItem("clone67ChatSessionId");

  const trackFormSubmission = (formData: boolean) => {
    setHasFormData(formData);
  };

  const fetchChatHistory = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const response = await handleFetchChatHistory(
        sessionId,
        chatBotData.fetchChatHistoryUrl
      );
      if (Array.isArray(response)) {
        setMessages(response);
      } else if (response) {
        setMessages([response]);
      } else {
        setMessages([]);
      }
      console.log("chat history in layout", response);
    } catch (error) {
      console.log("Error fetching chat history", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [hasFormData, sessionId]);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setMessages((prev: Message[]) => [
      ...prev,
      { sender_type: "user", message: userMessage },
    ]);

    try {
      const data = await handleEachChat(
        userMessage,
        chatBotData.pineconeNamespace,
        chatBotData.onGoingChatUrl,
        sessionId
      );

      setMessages((prev: Message[]) => [
        ...prev,
        {
          sender_type: "bot",
          message: data.n8n.message,
          created_at: data.n8n.created_at,
          suggested_prompts: data.n8n.suggested_prompts,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          sender_type: "bot",
          message: 'Sorry, there was an error processing your request. Please try again.',
          created_at: new Date().toISOString(),
          suggested_prompts: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Common styles
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
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxShadow: "0 10px 25px -3px rgba(0,0,0,0.1)",
  };

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

  const avatarWrapperStyle: React.CSSProperties = {
    position: "relative",
  };

  const avatarCircleStyle: React.CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onlineDotStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "14px",
    height: "14px",
    backgroundColor: "#34d399",
    borderRadius: "50%",
    border: "3px solid white",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    lineHeight: "1.2",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "12px",
    opacity: 0.9,
    margin: 0,
    lineHeight: "1.3",
  };

  const topButtonStyle: React.CSSProperties = {
    padding: "8px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  };

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

  const handleTopButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(255,255,255,0.2)" : "transparent";
  };

  // Loading styles
  const loadingContainerStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: theme.fontColor,
    opacity: 0.9,
    fontSize: "14px",
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
            onClick={() => setIsExpand((prev) => !prev)}
            aria-label="expand chat"
            style={topButtonStyle}
            onMouseEnter={(e) => handleTopButtonHover(e, true)}
            onMouseLeave={(e) => handleTopButtonHover(e, false)}
          >
            {isExpand ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
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

      {/* Main Content */}
      {sessionId ? (
        <>
          {isLoading && messages.length === 0 ? (
            <div style={loadingContainerStyle}>
              <span>connecting server....</span>
            </div>
          ) : (
            <>
              <ChatPanelMessagesBox messages={messages} isLoading={isLoading} theme={theme} />
              <UserInputForm onSendMessage={sendMessage} isLoading={isLoading} theme={theme} />
            </>
          )}
        </>
      ) : (
        <ChatPanelUserForm
          theme={theme}
          chatBotData={chatBotData}
          trackFormSubmission={trackFormSubmission}
        />
      )}

      {/* Footer */}
      <div style={footerStyle}>
        <p style={footerTextStyle}>
          powered by <span style={footerBoldStyle}>clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
// ChatBotWidget.jsx
import { useState, useContext } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";

import { Theme, ChatBotData  } from './components/types/types';
import { ChatContextProvider } from "./components/contextProvider/contextProvider.js";

export interface ChatBotWidgetProps {
    pineconeNamespace : string;
    onGoingChatUrl : string;
    initiateChatUrl : string;
    fetchChatHistoryUrl: string;
    primaryColor ?: string;
    secondaryColor ?: string;
    backgroundColor : string;
    fontColor ?: string;
    placeholderColor ?: string;
    position ?: string;
    name ?: string;
    subTitle ?: string;
    welcomeText ?: string;
}

const ChatBotWidget = ({
  pineconeNamespace,
  onGoingChatUrl,
  initiateChatUrl,
  fetchChatHistoryUrl,
  primaryColor = "#3b82f6",
  secondaryColor = "#8b5cf6",
  backgroundColor = "#ffffff",
  fontColor = "#1f2937",
  placeholderColor = "#9ca3af",
  position = "right",
  name = "Assistant",
  subTitle = "Typically replies instantly",
  welcomeText = "Hi! How can I help you today?"
} : ChatBotWidgetProps ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => setIsOpen(prev => !prev);

  const onMinimise = () => setIsOpen(prev => !prev);

  // Get sessionId from localStorage (set by the  user form on first submission)
  const sessionId : string  = localStorage.getItem('clone67ChatSessionId') ?? String(null);
  console.log('session ID', sessionId);

  const theme : Theme = {
    primaryColor,
    secondaryColor,
    backgroundColor,
    fontColor,
    placeholderColor,
    inputBackgroundColor: backgroundColor
  };

  // bundle chatBot related data
  const chatBotData : ChatBotData = {
    name,
    subTitle,
    welcomeText,
    onGoingChatUrl,
    fetchChatHistoryUrl,
    initiateChatUrl,
    pineconeNamespace,
    position,
  };

  const isLeft = position === "left";
  const horizontalPos = "32px";

  // Panel container (above button when open)
  const panelWrapperStyle : React.CSSProperties = {
    position: "fixed",
    bottom: "104px",
    [isLeft ? "left" : "right"]: horizontalPos,
    zIndex: 9999,
    pointerEvents: "auto",
  };

  // Button container
  const buttonWrapperStyle : React.CSSProperties = {
    position: "fixed",
    bottom: "32px",
    [isLeft ? "left" : "right"]: horizontalPos,
    zIndex: 10000,
    pointerEvents: "auto",
  };

  return (
    <>
    <ChatContextProvider sessionId={sessionId} fetchChatHistoryUrl={chatBotData.fetchChatHistoryUrl}>
      {isOpen && (
        <div style={panelWrapperStyle}>
          <ChatPanel
            onClose={onClose}
            theme={theme}
            chatBotData={chatBotData}
          />
        </div>
      )}

      <div style={buttonWrapperStyle}>
        <ChatButton
          onMinimise={onMinimise}
          isOpen={isOpen}
          theme={theme}
          chatBotData={chatBotData}
        />
      </div>
    </ChatContextProvider>
    </>
  );
};

export default ChatBotWidget;

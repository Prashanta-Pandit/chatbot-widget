// ChatBotWidget.jsx
import { useState, useContext } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";

import { Theme, ChatBotData  } from './components/types/types';

export interface ChatBotWidgetProps {
    pineconeNamespace : string;
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

  const onClose = () => {
    setIsOpen(prev => !prev);
    localStorage.removeItem('clone67ChatSessionId'); // remove the session id. 
  }

  const onMinimise = () => setIsOpen(prev => !prev);

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
    </>
  );
};

export default ChatBotWidget;

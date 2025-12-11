// ChatBotWidget.jsx
import { useState, useEffect } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";

const ChatBotWidget = ({
  pineconeNamespace,
  onGoingChatUrl,
  initiateChatUrl,
  primaryColor = "#3b82f6",
  secondaryColor = "#8b5cf6",
  backgroundColor = "#ffffff",
  fontColor = "#1f2937",
  placeholderColor = "#9ca3af",
  position = "right",
  name = "Assistant",
  subTitle = "Typically replies instantly",
  welcomeText = "Hi! How can I help you today?"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(prev => !prev);

  const onMinimise = () => setIsOpen(prev => !prev);

  const theme = {
    primaryColor,
    secondaryColor,
    backgroundColor,
    fontColor,
    placeholderColor,
    inputBackgroundColor: backgroundColor // fallback if not provided
  };

  // bundle chatBot related data
  const chatBotData = {
    name,
    subTitle,
    welcomeText,
    onGoingChatUrl,
    initiateChatUrl,
    pineconeNamespace,
    position,
  };

  const isLeft = position === "left";
  const horizontalPos = "32px";

  // Panel container (above button when open)
  const panelWrapperStyle = {
    position: "fixed",
    bottom: "104px", // 8 + 64 + some margin
    [isLeft ? "left" : "right"]: horizontalPos,
    zIndex: 9999,
    pointerEvents: "auto",
  };

  // Button container
  const buttonWrapperStyle = {
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

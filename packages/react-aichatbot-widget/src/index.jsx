// ChatBotWidget.jsx
import { useState, useEffect } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";
import { v4 as uuidv4 } from "uuid";

const ChatBotWidget = ({
  pineconeNamespace,
  url,
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
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

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

  const chatBotData = {
    name,
    subTitle,
    welcomeText,
    url,
    pineconeNamespace,
    position,
    sessionId
  };

  const isLeft = position === "left";
  const horizontalPos = "32px"; // equivalent to left-8 / right-8

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
            onMinimise={onMinimise}
            theme={theme}
            chatBotData={chatBotData}
          />
        </div>
      )}

      <div style={buttonWrapperStyle}>
        <ChatButton
          onClick={onClose}
          isOpen={isOpen}
          theme={theme}
          chatBotData={chatBotData}
        />
      </div>
    </>
  );
};

export default ChatBotWidget;

// ChatBotWidget.jsx
import { useState, useEffect } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";
import { v4 as uuidv4 } from "uuid";

const ChatBotWidget = ({
  pineconeNamespace,
  chatbotHostURL,
  primaryColor,
  secondaryColor,
  backgroundColor,
  fontColor,
  position,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const toggleChat = () => setIsOpen(prev => !prev);

  // Pass hex values directly down
  const theme = { primaryColor, secondaryColor, backgroundColor, fontColor };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {isOpen && (
        <ChatPanel
          onClose={toggleChat}
          sessionId={sessionId}
          pineconeNamespace={pineconeNamespace}
          chatbotHostURL={chatbotHostURL}
          theme={theme}
        />
      )}

      <ChatButton
        onClick={toggleChat}
        isOpen={isOpen}
        theme={theme}
        position={position}
      />
    </div>
  );
};

export default ChatBotWidget;

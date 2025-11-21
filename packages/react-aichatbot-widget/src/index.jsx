// ChatBotWidget.jsx
import { useState, useEffect } from "react";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";
import { v4 as uuidv4 } from "uuid";

const ChatBotWidget = ({
  pineconeNamespace,
  url,
  primaryColor,
  secondaryColor,
  backgroundColor,
  fontColor,
  placeholderColor,
  position,
  name,
  subTitle,
  welcomeText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const toggleChat = () => setIsOpen(prev => !prev);

  const theme = { primaryColor, secondaryColor, backgroundColor, fontColor, placeholderColor };
  const chatBotData = { name, subTitle, welcomeText, url, pineconeNamespace, position, sessionId };

  return (
    <div className="fixed inset-0 pointer-events-auto z-[9999]">
      {isOpen && (
        <ChatPanel
          onClose={toggleChat}
          sessionId={sessionId}
          pineconeNamespace={pineconeNamespace}
          url={url}
          theme={theme}
          chatBotData={chatBotData}
        />
      )}

      <ChatButton
        onClick={toggleChat}
        isOpen={isOpen}
        theme={theme}
        chatBotData={chatBotData}
      />
    </div>
  );
};

export default ChatBotWidget;

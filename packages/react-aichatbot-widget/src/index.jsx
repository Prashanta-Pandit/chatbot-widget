import { useState, useEffect } from "react";
import "./index.css";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";
import { v4 as uuidv4 } from "uuid";

const  ChatBotWidget = (
  { pineconeNamespace, 
    chatbotHostURL,
    primaryColor,
    secondaryColor,
    position,
    backgroundColor,
    fontColor
  }
) => {
  const [isOpen, setIsOpen] = useState(false);

  const [sessionId, setSessionId] = useState('');

  useEffect(()=> {
    const chatId = uuidv4(); // Generate a unique session ID for the chat session
    setSessionId(chatId);
  }, [])

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-7 right-7">
      {isOpen &&
        <ChatPanel 
        onClose={toggleChat} 
        sessionId={sessionId} 
        pineconeNamespace={pineconeNamespace} 
        chatbotHostURL={chatbotHostURL} 
        primaryColor={primaryColor} 
        secondaryColor={secondaryColor} 
        position={position} 
        backgroundColor={backgroundColor} 
        fontColor={fontColor} 
        /> 
      }
      <ChatButton 
        onClick={toggleChat} 
        primaryColor={primaryColor} 
        secondaryColor={secondaryColor} 
        position={position} 
        fontColor={fontColor} 
      />
    </div>
  );
}

export default ChatBotWidget;

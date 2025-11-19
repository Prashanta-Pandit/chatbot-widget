import { useState, useEffect } from "react";
import "./index.css";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";
import { v4 as uuidv4 } from "uuid";

export default function ChatBotWidget({ pinecone_namespace }) {
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
        <ChatPanel onClose={toggleChat} sessionId={sessionId} pinecone_namespace={pinecone_namespace} /> 
      }
      <ChatButton onClick={toggleChat} />
    </div>
  );
}

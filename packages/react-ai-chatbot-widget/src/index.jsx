import { useState } from "react";
import "./index.css";
import ChatButton from "./components/chat.button.jsx";
import ChatPanel from "./components/panel/chat.panel.layout.jsx";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-7 right-7">
      {isOpen &&
        <ChatPanel onClose={toggleChat} /> 
      }
      <ChatButton onClick={toggleChat} />
    </div>
  );
}

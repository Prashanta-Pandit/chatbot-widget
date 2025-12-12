import { ReactNode, createContext, useState, useEffect } from "react";
import { handleFetchChatHistory } from "../../n8n/n8n";

interface ChatContextProps {
  chatMessages: any[];
}

const ChatContext = createContext<ChatContextProps | null>(null);

interface ChatContextProviderProps {
  children: ReactNode;
  fetchChatHistoryUrl: string;
  sessionId: string;
}

const ChatContextProvider = ({ children, fetchChatHistoryUrl, sessionId }: ChatContextProviderProps) => {
  
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const fetchChats = async () => {
    try {
      const result: any = await handleFetchChatHistory(
        sessionId,
        fetchChatHistoryUrl
      );

      const msgs = result.data.n8n.messages;
      setChatMessages(msgs);

    } catch (error) {
      console.error("Error fetching chat history:", error);
      setChatMessages([]); // fallback for safety
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchChats();
    }
  }, [sessionId]);

  return (
    <ChatContext.Provider value={{ chatMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };

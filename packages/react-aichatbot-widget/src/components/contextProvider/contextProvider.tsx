import { ReactNode, createContext, useState, useEffect } from 'react';
import { handleFetchChatHistory } from '../../n8n/n8n';

interface ChatContextProps {
    chatMessages: string[];
}

const ChatContext = createContext<ChatContextProps | null >(null);

interface ChatContextProviderProps {
    children: ReactNode;
    fetchChatHistoryUrl: string;
    sessionId: string;
}

const ChatContextProvider = ( { children, fetchChatHistoryUrl, sessionId } : ChatContextProviderProps ) => {

    const fetchChats = async () => {
        try{
            const result: any = await handleFetchChatHistory(sessionId, fetchChatHistoryUrl );
            const messages = result?.data?.n8n?.messages;
            setChatMessages(messages);
        }
        catch(error){
            console.error('Error fetching with chat API:', error);
        }
    }

    useEffect(()=> {
        fetchChats();
    }, [])

    const [chatMessages, setChatMessages] = useState<string[]>([]);

    return (
        <ChatContext.Provider value={ { chatMessages }}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatContextProvider };
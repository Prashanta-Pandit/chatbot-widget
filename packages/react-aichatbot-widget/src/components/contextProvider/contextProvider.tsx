import { ReactNode, createContext, useState } from 'react';

interface ChatContextProps {
    messages: string[];
}

const ChatContext = createContext<ChatContextProps | null >(null);

interface ChatContextProviderProps {
    children: ReactNode;
}

const ChatContextProvider = ( { children } : ChatContextProviderProps ) => {

    const [messages, setMessages] = useState<string[]>([]);

    return (
        <ChatContext.Provider value={ { messages }}>
            {children}
        </ChatContext.Provider>

    )
}

export { ChatContext, ChatContextProvider };
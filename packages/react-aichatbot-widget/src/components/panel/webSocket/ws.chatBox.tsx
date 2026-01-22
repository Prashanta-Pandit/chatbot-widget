import React, { useEffect, useState, useRef } from 'react';
import { Message, ChatBotData, Theme } from '../../types/types'

interface ChatBoxProps {
    messages: string;
    chatBotData: ChatBotData;
    theme: Theme
}

const  WSChatBox = ( { messages, chatBotData, theme } : ChatBoxProps ) => {

    const [ chats , setChats ] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const convertToJSON = ( msgString : string ) => {
        if(msgString === "") return null;

        try {
            const msgObj = JSON.parse( msgString );
            return msgObj;
        } catch ( error ) {
            console.error( "Error parsing message string to JSON:", error );
            return null;
        }
    }

    useEffect( () => {
        const msgObj = convertToJSON( messages );
        if (msgObj) {
            setChats(prevChats => [...prevChats, msgObj]);
        }
    }, [ messages ] );

    const flatChats = chats.flat();

    // Base container
    const containerStyle: React.CSSProperties = {
        height: "290px", 
        overflowY: "auto", 
        padding: "20px",
        background: theme.backgroundColor,
        color: theme.fontColor,
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    };


    // Message wrapper (aligns user vs bot)
    const messageWrapperStyle = (sender_type : string) : React.CSSProperties => ({
        display: "flex",
        justifyContent: sender_type === "user" ? "flex-end" : "flex-start",
        width: "100%",
    });

    // Message bubble container with timestamp
    const bubbleContainerStyle  : React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
    };

    // Message bubble style
    const bubbleStyle = (sender_type: string): React.CSSProperties => ({
        padding: "12px 16px",
        borderRadius:
            sender_type === "user"
                ? "16px 0 16px 16px" // top-right flat for user
                : "0 16px 16px 16px", // top-left flat for AI
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "2px` solid #ffffff",
        fontSize: "14px",
        lineHeight: "1.5",
        background: sender_type === "user" ? theme.primaryColor : theme.backgroundColor,
        color: theme.fontColor,
        wordWrap: "break-word",
    });

    const typingBubbleStyle: React.CSSProperties = {
        ...bubbleStyle("bot"),
        animation: 'fadeIn 0.3s ease-in-out, pulse 1.5s ease-in-out infinite',
        animationDelay: '0s, 0.3s'
    };

    return (
        <div style={containerStyle}>
                {flatChats.map((chat, index) => (
                    <div key={index} style={messageWrapperStyle(chat.sender_type)}>
                        <div style={bubbleContainerStyle}>

                            {/* Icon for user response */}
                            {
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: chat.sender_type === "user" ? "flex-end" : "flex-start", marginRight: "4px", marginBottom: "2px" }}>
                                    <span
                                    style={{
                                        fontSize: "10px",
                                        opacity: 0.55,
                                        color: theme.fontColor,
                                    }}
                                    >
                                    {
                                        chat.sender_type === "user" ? "You" : "AI"
                                    }
                                    </span>
                                </div>
                            }
                            {/* message bubble */}
                            <div style={chat.sender_type === "user" ? bubbleStyle("user") : bubbleStyle("ai")}>
                                {chat.message}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default WSChatBox;
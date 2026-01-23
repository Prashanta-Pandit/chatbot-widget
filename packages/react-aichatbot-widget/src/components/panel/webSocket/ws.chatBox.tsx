import React, { useEffect, useState, useRef } from 'react';
import { Message, ChatBotData, Theme } from '../../types/types'

interface ChatBoxProps {
    messages: string;
    chatBotData: ChatBotData;
    theme: Theme
    isExpand: boolean;
}

const WSChatBox = ({ messages, chatBotData, theme, isExpand }: ChatBoxProps) => {
    
    const [chats, setChats] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // ref to the last message

    const convertToJSON = (msgString: string) => {
        if (msgString === "") return null;
        try {
            return JSON.parse(msgString);
        } catch (error) {
            console.error("Error parsing message string to JSON:", error);
            return null;
        }
    };

    const formatTimestamp = (timestamp: number): string => {
        return new Date(timestamp).toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    // Add new messages
    useEffect(() => {

        if(messages === "") {
            setChats([
            {
                created_at: Date.now(),
                sender_type: "bot",
                message: chatBotData.aiInitialMessage,
                suggested_prompt: []
            }
        ]); 
        }
        
        const msgObj = convertToJSON(messages);
        if (msgObj) {
            setChats(prevChats => [...prevChats, msgObj]);
        }
    }, [messages]);

    // Scroll to the bottom whenever chats change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const flatChats = chats.flat();

    const containerStyle: React.CSSProperties = {
        height: isExpand ? "500px" : "400px",
        overflowY: "auto",
        padding: "10px",
        background: theme.backgroundColor,
        color: theme.fontColor,
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
    };

    const messageWrapperStyle = (sender_type: string): React.CSSProperties => ({
        display: "flex",
        justifyContent: sender_type === "user" ? "flex-end" : "flex-start",
        width: "100%",
    });

    const bubbleContainerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
    };

    const bubbleStyle = (sender_type: string): React.CSSProperties => ({
        padding: "10px",
        borderRadius: sender_type === "user" ? "12px 0 12px 12px" : "0 12px 12px 12px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        lineHeight: "1.5",
        background: sender_type === "user" ? theme.primaryColor : "#f5f5f5",
        color: theme.fontColor,
        wordWrap: "break-word",
    });

    return (
        <div style={containerStyle}>
            {flatChats.map((chat, index) => (
                <div key={index} style={messageWrapperStyle(chat.sender_type)}>
                    <div style={bubbleContainerStyle}>
                        <div style={chat.sender_type === "user" ? bubbleStyle("user") : bubbleStyle("ai")}>
                            {chat.message}
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "4px",
                            justifyContent: chat.sender_type === "user" ? "flex-end" : "flex-start",
                        }}>
                            <span style={{ fontSize: "10px", opacity: 0.55, color: theme.fontColor }}>
                                {chat.sender_type === "user" ? "You" : `${chatBotData.name}`}
                                &nbsp;•&nbsp;{formatTimestamp(chat.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {/* This empty div will always scroll into view */}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default WSChatBox;
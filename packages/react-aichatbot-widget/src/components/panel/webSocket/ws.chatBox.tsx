import React, { useEffect, useState, useRef } from 'react';
import { Message, ChatBotData, Theme } from '../../types/types'

interface ChatBoxProps {
    messages: string;
    chatBotData: ChatBotData;
    theme: Theme
    isLoading: boolean;
}

const WSChatBox = ({ messages, chatBotData, theme, isLoading }: ChatBoxProps) => {
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
        padding: "12px 16px",
        borderRadius: sender_type === "user" ? "16px 0 16px 16px" : "0 16px 16px 16px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        lineHeight: "1.5",
        background: sender_type === "user" ? theme.primaryColor : "#f5f5f5",
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
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            justifyContent: chat.sender_type === "user" ? "flex-end" : "flex-start",
                            marginRight: "4px",
                            marginBottom: "2px"
                        }}>
                            <span style={{ fontSize: "10px", opacity: 0.55, color: theme.fontColor }}>
                                {chat.sender_type === "user" ? "You" : `${chatBotData.name}`}
                            </span>
                        </div>
                        
                        <div style={chat.sender_type === "user" ? bubbleStyle("user") : bubbleStyle("ai")}>
                            {chat.message}
                        </div>
                        <span style={{ fontSize: "10px", opacity: 0.55, color: theme.fontColor, alignSelf: chat.sender_type === "user" ? "flex-end" : "flex-start", marginTop: "4px" }}>
                                {`${formatTimestamp(chat.created_at)}`}
                        </span>
                    </div>
                </div>
            ))}

            {/* Typing indicator */}
            {
                isLoading && <div style={typingBubbleStyle}>
                    Typing...
                </div>
            }

            {/* This empty div will always scroll into view */}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default WSChatBox;
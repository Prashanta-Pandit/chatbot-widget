import React, {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatBox from './ws.chatBox';
import { handleWebSocket } from './ws';
import { ChatBotData, Theme } from '../../types/types';
import { Send } from "lucide-react";

interface WSChatPanelProps {
    chatBotData: ChatBotData
    theme: Theme
    onlineStatus: (status : string) => void
}

const WSChatPanel = ( { chatBotData, theme, onlineStatus } : WSChatPanelProps) => {

    const [ ws, setWs ] = useState<WebSocket | null>(null);
    const [ inputValue, setInputValue ] = useState<string>("");
    const [ webSocketStatus, setWebSocketStatus ] = useState<string>("Connecting to server...");
    const [ messages, setMessages ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {

        var sessionId = localStorage.getItem("clone67ChatSessionId");

        // only create a new session ID if one doesn't exist
        if (sessionId === null) {
            sessionId = uuidv4();
            localStorage.setItem("clone67ChatSessionId", sessionId);
        }

        const { socket } = handleWebSocket( sessionId, chatBotData.pineconeNamespace );

        setWs( socket );

        socket.onopen = () => {
            setWebSocketStatus("Server connected");

            setTimeout(() => {
                setWebSocketStatus("");
            }, 2000);

            onlineStatus("online");
        }

        socket.onmessage = async (event) => {
            setIsLoading(true);
            
            try {
                const messages = await event.data;
                setMessages(messages);
            } catch (err) {
                console.error("Error handling server message:", err);
                
            } finally {
                // always reset loading
                setIsLoading(false);
            }
        };

        socket.onerror = (error) => {
            setWebSocketStatus("Server error occurred");
            console.error("WebSocket error:", error);
            onlineStatus("offline");
        }

        socket.onclose = () => {
            setWebSocketStatus("Server disconnected");
            onlineStatus("offline");

        }

    }, []);

    const handleSubmit = async () => {
        if(ws && ws.readyState === WebSocket.OPEN){
             ws.send(JSON.stringify(inputValue));
        }

        // compose a user input message same as a server message format
        const userMessage = {
            created_at: Date.now(),
            sender_type: "user",
            message: inputValue
        };

        setMessages( JSON.stringify(userMessage) ); // append user message to message state.

        setInputValue("");
    }

    const handleKeyPress = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
    };

    const inputStyle : React.CSSProperties = {
        flex: 1,
        padding: "12px 16px",
        background: theme.backgroundColor,
        color: theme.fontColor,
        border: `1px solid ${theme.fontColor}`,
        borderRadius: "12px",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.2s ease",
        opacity: isLoading ? 0.5 : 1,
        cursor: isLoading ? "not-allowed" : "text",
        boxShadow: "none",
    };
    
      // Send button
    const buttonStyle : React.CSSProperties = {
        padding: "12px 20px",
        borderRadius: "12px",
        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
        color: theme.fontColor,
        border: "none",
        cursor: (isLoading || !inputValue.trim()) ? "not-allowed" : "pointer",
        opacity: (isLoading || !inputValue.trim()) ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontWeight: "600",
        fontSize: "14px",
        transition: "all 0.2s ease",
        minWidth: "48px",
    };

     // Container (bottom input bar)
    const containerStyle : React.CSSProperties = {
        padding: "16px",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        borderColor: theme.fontColor,
        background: theme.backgroundColor,
        flexShrink: 0,
    };
    
    const wrapperStyle : React.CSSProperties = {
        display: "flex",
        gap: "12px",
        alignItems: "center",
    };

   const websocketstateStyle: React.CSSProperties = {
        textAlign: "center",
        padding: "2px",
        backgroundColor: 
            webSocketStatus === "Server connected" || webSocketStatus === "online"
                ? "#09BA00"
                : webSocketStatus === "Connecting to server..."
                ? "#DED000"
                : "#FF3408",
        color: "#ffffff",
        fontSize: "10px",
    };

    return (
        <div>
            {webSocketStatus && <p style={websocketstateStyle}>{webSocketStatus}</p>}
            <ChatBox  messages={messages} chatBotData={chatBotData} theme={theme} isLoading={isLoading} />
            <div style={containerStyle}>
                <form onSubmit={handleSubmit} style={wrapperStyle}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.boxShadow = "0 0 0 3px rgba(100, 150, 255, 0.3)";
                            e.target.style.borderColor = "#60a5fa";
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = "none";
                            e.target.style.borderColor = theme.fontColor;
                        }}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !inputValue.trim()}
                        style={buttonStyle}
                        aria-label="Send message"
                        onMouseEnter={(e) => {
                            if (!isLoading && inputValue.trim()) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                        >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default WSChatPanel;
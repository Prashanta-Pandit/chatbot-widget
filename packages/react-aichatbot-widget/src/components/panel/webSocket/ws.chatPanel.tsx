import React, {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WSChatBox from './ws.chatBox';
import WSExitChat from './ws.exitchat';
import { handleWebSocket } from '../../../utils/ws';
import { ChatBotData, Theme } from '../../types/types';
import { Send } from "lucide-react";
import { handleSaveMessages } from '../../../utils/n8n';

interface WSChatPanelProps {
    chatBotData: ChatBotData
    theme: Theme
    onlineStatus: (status : string) => void
    isExpand: boolean
    endSession: boolean
}

const WSChatPanel = ( { chatBotData, theme, onlineStatus, isExpand, endSession } : WSChatPanelProps) => {

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
            try {
                const messages = await event.data;
                setMessages(messages);
                setIsLoading(false);

            } catch (err) {
                console.error("Error handling server message:", err);
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

    useEffect(()=> {

        const closeSession = async () => {
            if (!endSession) return;

            const sessionId: any = localStorage.getItem("clone67ChatSessionId");

            if (ws && ws.readyState === WebSocket.OPEN) {
                try {
                    if (messages) {
                        await handleSaveMessages(sessionId, chatBotData.pineconeNamespace);
                    }
                    
                    ws.send(JSON.stringify({ type: "end_session" }));
                    ws.close();
                    localStorage.removeItem("clone67ChatSessionId");
                } catch (error) {
                    console.log("Error while saving messages", error);
                }
            }
        }

        closeSession();

    }, [endSession]);

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        if(ws && ws.readyState === WebSocket.OPEN){
            // declare the websocket request as a user message
            const payload = {
                type: 'chat',
                userInput: inputValue
            }
            ws.send(JSON.stringify(payload));
        }

        // AI starts processing
        setIsLoading(true);

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
          handleSubmit(e);
        }
    };

    const inputStyle : React.CSSProperties = {
        flex: 1,
        padding: "12px 16px",
        background: `${isLoading ? `${theme.primaryColor}33` : theme.backgroundColor}`,
        color: theme.fontColor,
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: "12px",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.2s ease",
        boxShadow: "none",
        cursor: isLoading ? "not-allowed" : "auto"
        
    };
    
      // Send button
    const buttonStyle : React.CSSProperties = {
        padding: "12px 20px",
        borderRadius: "12px",
        background: isLoading ? `${theme.primaryColor}33` : `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` ,
        color: theme.fontColor,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontWeight: "600",
        fontSize: "14px",
        transition: "all 0.2s ease",
        minWidth: "48px",
        cursor: isLoading ? "not-allowed" : "pointer",
    };

     // Container (bottom input bar)
    const containerStyle : React.CSSProperties = {
        padding: "10px",
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

    const typingStyle: React.CSSProperties = {
        padding: "8px",
        animation: 'fadeIn 0.3s ease-in-out, pulse 1.5s ease-in-out infinite',
        animationDelay: '0s, 0.3s',
        fontSize: "10px",
        color: theme.fontColor,
    };


    return (
        <>
            {webSocketStatus && <p style={websocketstateStyle}>{webSocketStatus}</p>}

            {
                endSession ? <WSExitChat theme={theme} /> : 
                <>
                    <WSChatBox  messages={messages} chatBotData={chatBotData} theme={theme} isExpand={isExpand} />
                    {/* Typing indicator */}
                    {
                        isLoading && 
                        <div style={typingStyle}>
                            {`${chatBotData.name} is typing...`}
                        </div>
                    }

                    <div style={containerStyle}>
                        <form onSubmit={handleSubmit} style={wrapperStyle}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                                onKeyDown={handleKeyPress}
                                style={inputStyle}
                                onFocus={(e) => {
                                    e.target.style.boxShadow = `0 0 0 1px ${theme.primaryColor}`;
                                    e.target.style.borderColor = theme.primaryColor;
                                }}
                                onBlur={(e) => {
                                    e.target.style.boxShadow = "none";
                                    e.target.style.borderColor = theme.primaryColor;
                                }}
                            />
                            <button
                                onClick={handleSubmit}
                                style={buttonStyle}
                                disabled={isLoading}
                                aria-label="Send message"
                                >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default WSChatPanel;
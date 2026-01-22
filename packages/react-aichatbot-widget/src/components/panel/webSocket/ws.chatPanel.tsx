import React, {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatBox from './ws.chatBox';
import { handleWebSocket } from './ws';

const WSChatPanel = () => {
    const [ ws, setWs ] = useState<WebSocket | null>(null);
    const [ inputValue, setInputValue ] = useState<string>("");
    const [ webSocketStatus, setWebSocketStatus ] = useState<string>("connecting to server...");
    const [ messages, setMessages ] = useState<string>("");

    var responseFromServer: string;

    useEffect(() => {

        var sessionId = localStorage.getItem("clone67ChatSessionId");

        // only create a new session ID if one doesn't exist
        if (sessionId === null) {
            sessionId = uuidv4();
            localStorage.setItem("clone67ChatSessionId", sessionId);
        }

        const { socket } = handleWebSocket( sessionId, "ghgghgh" );
        setWs( socket );

        socket.onopen = () => {
            setWebSocketStatus("Server connected");
        }

        socket.onmessage = (event) => {
            const messages = event.data;
            console.log("Response from server: ", messages);
            responseFromServer = messages;
            setMessages( responseFromServer );
        }

        socket.onerror = (error) => {
            setWebSocketStatus("Server error occurred");
            console.error("WebSocket error:", error);
        }

        socket.onclose = () => {
            setWebSocketStatus("Server disconnected");
        }

    }, []);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(ws && ws.readyState === WebSocket.OPEN){
             ws.send(JSON.stringify(inputValue));
        }

        // compose a user input message same as a server message format
        const userMessage = {
            created_at: Date.now(),
            sender_type: "user",
            message: inputValue
        };

        setMessages( JSON.stringify(userMessage) );

        setInputValue("");
    }

    return (
        <div>
            {webSocketStatus && <p>{webSocketStatus}</p>}
            <ChatBox  messages={messages} />
            <form onSubmit={handleSubmit}>
                <input 
                    style={{
                        padding: '8px',
                        marginRight: '15px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                    type='text'
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default WSChatPanel;
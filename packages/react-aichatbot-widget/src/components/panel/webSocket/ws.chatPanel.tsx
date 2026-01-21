import React, {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatBox from './ws.chatBox';
import { handleWebSocket } from './ws';

const WSChatPanel = () => {
    const [ ws, setWs ] = useState<WebSocket | null>(null);
    const [ inputValue, setInputValue ] = useState<string>("");
    const [ webSocketStatus, setWebSocketStatus ] = useState<string>("");
    const [ messages, setMessages ] = useState<string>("");

    useEffect(() => {
        var sessionId = uuidv4();
        const { socket } = handleWebSocket( sessionId, "ghgghgh" );
        setWs( socket );

        socket.onopen = () => {
            setWebSocketStatus("Server connected");
        }  

        socket.onmessage = (event) => {
            const messages = event.data;
            setMessages(messages);
        }

        socket.onerror = (error) => {
            setWebSocketStatus("Server error occurred");
            console.error("WebSocket error:", error);
        }

        socket.onclose = () => {
            setWebSocketStatus("Server disconnected");
        }

        // Cleanup on unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };

    }, []);

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(ws && ws.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify(inputValue));
        }
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
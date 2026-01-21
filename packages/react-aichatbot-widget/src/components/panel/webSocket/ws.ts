
export const handleWebSocket = ( sessionId: string, chatbotNamespace: string ) => {
    const socket = new WebSocket(`wss://handle-chat-session.clone67.com/websocket?chatbotNamespace=${chatbotNamespace}&sessionId=${sessionId}`);
    return { socket };
}
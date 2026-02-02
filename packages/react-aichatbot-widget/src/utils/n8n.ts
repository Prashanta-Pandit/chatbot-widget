import axios from 'axios';

export const handleSaveMessages = async ( sessionId: string, chatbotNamespace: string ) => {
    try {
        await axios.get(`https://n8n.clone67.com/webhook/end-chat-session?chatbotNamespace=${chatbotNamespace}&sessionId=${sessionId}`)
    }
    catch(error){
        throw new Error;
    }
}
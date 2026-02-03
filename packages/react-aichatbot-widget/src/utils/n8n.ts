import axios from 'axios';

export const handleSaveMessages = async ( sessionId: string, chatbotNamespace: string ) => {
    try {
        await axios.post(`https://request-n8n-end-chat-session.clone67.com?chatbotNamespace=${chatbotNamespace}&sessionId=${sessionId}`)
    }
    catch(error){
        throw new Error;
    }
}
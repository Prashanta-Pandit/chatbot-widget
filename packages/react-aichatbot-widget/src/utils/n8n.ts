import axios from 'axios';

export const handleSaveMessages = async ( sessionId: string  ) => {
    try {
        await axios.get(`https://n8n.clone67.com/webhook/end-chat-session?sessionId=${sessionId}`)
    }
    catch(error){
        throw new Error;
    }
}
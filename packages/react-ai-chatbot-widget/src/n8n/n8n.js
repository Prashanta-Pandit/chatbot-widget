import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const handleChat = async (input) => {

  const chatId = uuidv4(); // Generate a unique session ID for the chat session
  const payload = {
    chatInput: input,
    sessionId: chatId,
    metadata: {
      pinecone_namespace: 'cloney-9d197663-1adf-4c45-901e-979d2d17d38b',
    }
  };

  try {
    const result = await axios.post ('https://n8n.clone67.com/webhook/860a03cc-0933-4645-98a4-56a8e6d9754e/chat',
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    console.log('API response:', result.data.output);
    const response = result.data.output;
    return response;
    
  } catch (error) {
    console.error('Error communicating with chat API:', error);
    throw error;
  }
};

export { handleChat };
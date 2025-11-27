import axios from 'axios';

const handleChat = async (input, sessionId, pineconeNamespace, url) => {

  const payload = {
    chatInput: input,
    sessionId,
    metadata: {
      pinecone_namespace: pineconeNamespace,
    }
  };

  try {
    const result = await axios.post (
        url,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    
    const response = result.data.response;
    console.log('API response:', result);
    return response;
    
  } catch (error) {
    console.error('Error communicating with chat API:', error);
    throw error;
  }
};

export { handleChat };
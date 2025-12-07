import axios from 'axios';

const initiateChatSession = async (input, pineconeNamespace, initiateChatUrl, name, email) => {

  console.log('Creating chat session with input url:', initiateChatUrl);

  const payload = {
    chatInput: input,
    metadata: {
      pinecone_namespace: pineconeNamespace,
      name,
      email,
    },
  };

  try {
    const result = await axios.post (
        initiateChatUrl,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    
    const response = result.data;
    return response;
    
  } catch (error) {
    console.error('Error communicating with chat API:', error);
    throw error;
  }
};

const handleEachChat = async (input, pineconeNamespace, onGoingChatURL, sessionId) => {

  const payload = {
    chatInput: input,
    metadata: {
      pinecone_namespace: pineconeNamespace,
    },
    sessionId,
  };

  try {
    const result = await axios.post (
        onGoingChatURL,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    
    const response = result.data;
    return response;
    
  } catch (error) {
    console.error('Error communicating with chat API:', error);
    throw error;
  }
};

export { initiateChatSession, handleEachChat };
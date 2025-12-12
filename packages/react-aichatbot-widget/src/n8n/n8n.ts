import axios from 'axios';

const initiateChatSession = async (input : string, pineconeNamespace : string, initiateChatUrl : string, name : string, email : string) => {


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

const handleEachChat = async (input : string, pineconeNamespace : string, onGoingChatURL : string, sessionId : string) => {

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

const handleFetchChatHistory = async ( sessionId: string, fetchChatHistoryUrl: string ) => {

  const payload = {
    sessionId,
  }

  try{
      const result = await axios.post(
      fetchChatHistoryUrl,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return result;
  } catch (error) {
    console.error('Error fetching with chat API:', error);
    throw error;
  }
}

export { initiateChatSession, handleEachChat, handleFetchChatHistory };
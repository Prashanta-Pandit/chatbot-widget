import React from "react";
import ChatBotWidget from "react-aichatbot-widget";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-sm font-semibold text-neutral-800">This is a test area for a chat widget</h1>
        <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => alert('Button Clicked!')}
        >Click Me</button>
      </div>

      <ChatBotWidget
        pineconeNamespace="cloney-1e018f87-e5bc-480e-95c3-739809a0c47d"
        onGoingChatUrl="https://request-n8n-chat-ongoing.clone67.com/"
        initiateChatUrl="https://request-n8n-chat-initiate.clone67.com/"
        fetchChatHistoryUrl="https://request-n8n-chat-fetch-chat-history.clone67.com/"
        primaryColor="#edd11a"      
        secondaryColor="#edd11a"
        fontColor="#000000"
        backgroundColor="#ffffff"  
        position="right"
        name="Cloney"
        subTitle="Your AI-powered assistant"
        welcomeText="You need`s help? Ask me anything!"
      />
    </>
  );
}
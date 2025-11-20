import React from "react";
import ChatBotWidget from "react-aichatbot-widget";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-sm font-semibold text-neutral-800">This is a test area for a chat widget</h1>
      </div>

      <ChatBotWidget
        pineconeNamespace="cloney-9d197663-1adf-4c45-901e-979d2d17d38b"
        chatbotHostURL="https://n8n.clone67.com/webhook/860a03cc-0933-4645-98a4-56a8e6d9754e/chat"
        primaryColor="#8b5cf6"      
        secondaryColor="#ec4899"    
        fontColor="#ffffff"
        backgroundColor="#000000"  
        position="right"
      />
    </>
  );
}
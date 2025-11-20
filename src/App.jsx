import React from "react";
import ChatBotWidget from "react-aichatbot-widget";
import "./index.css";

export default function App() {
  return (
    <>
      <div className="bg-neutral-100 w-full min-h-screen flex items-center justify-center">
        <h1 className="text-md font-semibold text-neutral-800">Test area for chat widgets</h1>
      </div>
      <ChatBotWidget 
        pineconeNamespace='cloney-9d197663-1adf-4c45-901e-979d2d17d38b'
        chatbotHostURL='https://n8n.clone67.com/webhook/860a03cc-0933-4645-98a4-56a8e6d9754e/chat'
        primaryColor='sky-600'
        secondaryColor='white'
        backgroundColor='black'
        fontColor='black'
        position='right'
      />
    </>
  );
}
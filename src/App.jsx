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
        pineconeNamespace="cloney-d6cd8ff6-c513-4fc7-8fdf-7eec37453722"
        url="https://n8n.clone67.com/webhook/860a03cc-0933-4645-98a4-56a8e6d9754e/chat"
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
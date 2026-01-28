import React from "react";
import ChatBotWidget from "react-aichatbot-widget";

export default function App() {
  return (
    <>
      <ChatBotWidget
        pineconeNamespace="cloney-1e018f87-e5bc-480e-95c3-739809a0c47d"
        primaryColor="#edd11a"      
        secondaryColor="#edd11a"
        fontColor="#000000"
        backgroundColor="#ffffff"  
        position="right"
        name="Boki"
        subTitle="Your AI-powered assistant"
        welcomeText="You need`s help? Ask me anything!"
        aiInitialMessage="Welcome to Bayset! What product can I assist you with today?"
      />
    </>
  );
}
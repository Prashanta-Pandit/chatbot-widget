import React from "react";
import ChatBotWidget from "react-aichatbot-widget";

export default function App() {
  return (
    <>
      <ChatBotWidget
        pineconeNamespace="cloey-ab6eeec5-112b-4340-b9e2-1a5c34c800e8"
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
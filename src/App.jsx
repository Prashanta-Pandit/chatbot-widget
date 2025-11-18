import React from "react";
import ChatBotWidget from "react-chatbot-widget";
import "./index.css";

export default function App() {
  return (
    <>
      <div className="bg-neutral-100 w-full min-h-screen flex items-center justify-center">
        <h1 className="text-md font-semibold text-neutral-800">Test area for chat widgets</h1>
      </div>
      <ChatBotWidget />
    </>
  );
}
import React, { useState } from "react";
import { Send } from "lucide-react";
import { initiateChatSession } from "../../n8n/n8n";

import { Theme, ChatBotData } from '../types/types';

interface ChatPanelUserFormProps {
  handleMessageFromForm: ( msgs: any) => void;
  theme: Theme;
  chatBotData: ChatBotData;
  setChatSessionId: (id: string) => void ;
}

const ChatPanelUserForm = ({ handleMessageFromForm, theme, chatBotData, setChatSessionId } : ChatPanelUserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      setIsLoading(false);
      return;
    }

    try {
      const data = await initiateChatSession(
        userInput,
        chatBotData.pineconeNamespace,
        chatBotData.initiateChatUrl,
        name,
        email,
      );

      handleMessageFromForm([
         { type: "user", text: userInput },
         { type: "bot", text: data.n8n.response, response_timestamp: data.n8n.response_timestamp, sessionId: data.n8n.sessionId },
      ]);

      setChatSessionId(data.n8n.sessionId);
      
      // store the sessionID ins a localStrorage.
      localStorage.setItem('clone67ChatSessionId', data.n8n.sessionId);

    } catch (error) {
      console.log("error sending user details", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setName("");
    setEmail("");
    setUserInput("");
  };

  // Inline styles
  const containerStyle  : React.CSSProperties = {
    padding: "20px",
    flexShrink: 0,
    background: theme.backgroundColor,
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const formStyle  : React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const welcomeTextStyle  : React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "500",
    color: theme.fontColor,
    margin: 0,
    lineHeight: "1.4",
  };

  const inputGroupStyle  : React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const labelStyle  : React.CSSProperties = {
    fontSize: "14px",
    color: theme.fontColor,
    fontWeight: "500",
  };

  const inputStyle : React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: theme.backgroundColor,
    color: theme.fontColor,
    border: "1px solid #a1a1aa",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const buttonStyle : React.CSSProperties = {
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
    cursor: name.trim() && email.trim() && !isLoading ? "pointer" : "not-allowed",
    opacity: name.trim() && email.trim() && !isLoading ? 1 : 0.5,
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  };

  const errorStyle : React.CSSProperties = {
    backgroundColor: "#fee2e2",
    color: "#713f12",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    textAlign: "center",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorStyle} role="alert">
              {error}
            </div>
          )}

          <p style={welcomeTextStyle}>{chatBotData.welcomeText}</p>

          <div style={inputGroupStyle}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                placeholder="Enter your message"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setError("");
                }}
                style={{
                  ...inputStyle,
                  minHeight: "60px", 
                  maxHeight: "80px",
                  resize: "vertical", 
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || isLoading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (name.trim() && email.trim() && !isLoading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {isLoading ? (
              "Submitting..."
            ) : (
              <>
                <Send size={18} />
                Submit
              </>
            )}
          </button>
        </form>
    </div>
  );
};

export default ChatPanelUserForm;
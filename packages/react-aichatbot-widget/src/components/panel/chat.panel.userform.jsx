import React, { useState } from "react";
import { Send } from "lucide-react";
import { handleChat } from "../../n8n/n8n";

const ChatPanelUserForm = ({ handleMessageFromForm, theme, chatBotData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      setIsLoading(false);
      return;
    }

    const message = `Hi, I am ${name} and my email is ${email}`;

    try {
      const metaData = await handleChat(
        message,
        chatBotData.sessionId,
        chatBotData.pineconeNamespace,
        chatBotData.url
      );

      console.log("metaData from user form:", metaData);
      const botText = metaData.output;

      handleMessageFromForm([
         { type: "user", text: message },
         { type: "bot", text: botText },
      ]);
    } catch (error) {
      console.log("error sending user details", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setName("");
    setEmail("");
  };

  // Inline styles
  const containerStyle = {
    padding: "20px",
    flexShrink: 0,
    background: theme.backgroundColor,
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const welcomeTextStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: theme.fontColor,
    margin: 0,
    lineHeight: "1.4",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const labelStyle = {
    fontSize: "14px",
    color: theme.fontColor,
    fontWeight: "500",
  };

  const inputStyle = {
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

  const buttonStyle = {
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
    marginTop: "80px",
    transition: "all 0.2s ease",
  };

  const errorStyle = {
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
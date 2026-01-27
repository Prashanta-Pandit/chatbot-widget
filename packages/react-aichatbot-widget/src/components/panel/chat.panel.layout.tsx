import React, { useState } from "react";
import { MessageCircle, Minimize2, Maximize2, X, } from "lucide-react";
import WSChatPanel from './webSocket/ws.chatPanel';

import { ChatBotData, Theme } from "../types/types";

interface ChatPanelProps {
  theme: Theme;
  chatBotData: ChatBotData;
  onClose: () => void
}

const ChatPanel = ({ theme, chatBotData, onClose }: ChatPanelProps) => {

  const [ isExpand, setIsExpand ] = useState<boolean>(false);
  const [ isOnline, setIsOnline ] = useState<boolean>(false);
  const [ endSession, setEndSession ] = useState<boolean>(false);

  const isLeft = chatBotData.position === "left";

  // Common styles
  const panelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "112px",
    [isLeft ? "left" : "right"]: "32px",
    zIndex: 50,
    width: isExpand ? "684px" : "384px",
    height: isExpand ? "620px" : "520px",
    background: `${theme.backgroundColor}cc`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxShadow: "0 10px 25px -3px rgba(0,0,0,0.1)",
  };

  const headerStyle: React.CSSProperties = {
    padding: "16px 20px",
    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    color: theme.fontColor,
    borderRadius: "16px 16px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  };

  const avatarWrapperStyle: React.CSSProperties = {
    position: "relative",
  };

  const avatarCircleStyle: React.CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onlineDotStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "14px",
    height: "14px",
    backgroundColor: isOnline ? "#00BF49" : "#F54927",
    borderRadius: "50%",
    border: "3px solid white",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    lineHeight: "1.2",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "12px",
    opacity: 0.9,
    margin: 0,
    lineHeight: "1.3",
  };

  const topButtonStyle: React.CSSProperties = {
    padding: "8px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  const footerStyle: React.CSSProperties = {
    padding: "10px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    background: theme.backgroundColor,
    textAlign: "center",
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: "11px",
    color: theme.fontColor,
    letterSpacing: "0.5px",
  };

  const footerBoldStyle: React.CSSProperties = {
    fontWeight: "600",
  };

  const handleTopButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(255,255,255,0.2)" : "transparent";
  };

  const onlineStatus = (status : string) => {
    if(status === "online"){
        setIsOnline(true);
    }
    else{
        setIsOnline(false);
    }
  }



  return (
    <div style={panelStyle}>

      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={avatarWrapperStyle}>
            <div style={avatarCircleStyle}>
              <MessageCircle size={22} />
            </div>
            <span style={onlineDotStyle} />
          </div>
          <div>
            <h3 style={titleStyle}>{chatBotData.name}</h3>
            <p style={subtitleStyle}>{chatBotData.subTitle}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "left" }}>
          <button
            onClick={() => setIsExpand((prev) => !prev)}
            aria-label="expand chat"
            style={topButtonStyle}
            onMouseEnter={(e) => handleTopButtonHover(e, true)}
            onMouseLeave={(e) => handleTopButtonHover(e, false)}
          >
            {isExpand ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>

          <button
            onClick={()=> { 
              setEndSession(true);
              onClose();
            }}
            style={topButtonStyle}
            onMouseEnter={(e) => handleTopButtonHover(e, true)}
            onMouseLeave={(e) => handleTopButtonHover(e, false)}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      
      <WSChatPanel chatBotData={chatBotData} theme={theme} onlineStatus={onlineStatus} isExpand={isExpand} endSession={endSession} />

      {/* Footer */}
      <div style={footerStyle}>
        <p style={footerTextStyle}>
          powered by <span style={footerBoldStyle}>clone67.com</span>
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
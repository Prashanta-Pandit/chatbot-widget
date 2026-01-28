import React from 'react';
import { Theme } from '../../types/types'
import { Loader } from 'lucide-react';

interface WSExitChatProps {
  theme: Theme
}

const WSExitChat = ({ theme }: WSExitChatProps) => {

  const containerStyle: React.CSSProperties = {
    height: "100%",
    background: theme.backgroundColor,
    color: theme.fontColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle: React.CSSProperties = {
    padding: "24px 32px",
    background: theme.backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:"10px"
  };

  const textStyle: React.CSSProperties = {
    fontSize: "14px",
    opacity: 0.85,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <Loader size={26} />
        <p style={textStyle}>Exiting chat… please wait</p>
      </div>
    </div>
  );
};

export default WSExitChat;
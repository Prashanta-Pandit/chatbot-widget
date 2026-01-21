import React from 'react';

interface ChatBoxProps {
    messages: string;
}

const  WSChatBox = ( { messages } : ChatBoxProps ) => {

    return (
        <div
            style={{
                    padding: '100px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            >
            <p>{messages}</p>
        </div>
    )

}

export default WSChatBox;
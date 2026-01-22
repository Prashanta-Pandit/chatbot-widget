import React, { useEffect, useState } from 'react';
import { Message } from '../../types/types'

interface ChatBoxProps {
    messages: string;
}

const  WSChatBox = ( { messages } : ChatBoxProps ) => {

    const [ chats , setChats ] = useState<Message[]>([]);

    const convertToJSON = ( msgString : string ) => {
        if(msgString === "") return null;

        try {
            const msgObj = JSON.parse( msgString );
            return msgObj;
        } catch ( error ) {
            console.error( "Error parsing message string to JSON:", error );
            return null;
        }   
    }

    useEffect( () => {
        const msgObj = convertToJSON( messages );
        if (msgObj) {
            setChats(prevChats => [...prevChats, msgObj]);
        }
    }, [ messages ] );

    console.log("chats:", chats);
    const flatChats = chats.flat();

    return (
        <div
            style={{
                    padding: '100px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
        >
            <div>
                {flatChats.map((chat, index) => (
                    <div key={index}>
                        <p>{chat.created_at}</p>
                        <p>{chat.sender_type}</p>
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WSChatBox;
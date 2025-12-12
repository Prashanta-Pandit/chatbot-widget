// centralise the types of TS

export interface Theme {
    primaryColor : string;
    secondaryColor : string;
    backgroundColor : string;
    fontColor : string;
    placeholderColor : string;
    inputBackgroundColor : string;
}

export interface ChatBotData {
    name : string;
    subTitle : string;
    welcomeText : string;
    onGoingChatUrl : string;
    fetchChatHistoryUrl: string;
    initiateChatUrl : string;
    pineconeNamespace : string;
    position : string;
}

export interface Message {
    attachments?: string;
    created_at?: string;
    id?: number;
    message: string;
    sender_type: 'bot' | 'user';
    session_id?: string;
    suggested_prompts?: string[] ;
}
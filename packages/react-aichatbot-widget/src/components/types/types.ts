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
    initiateChatUrl : string;
    pineconeNamespace : string;
    position : string;
}

export interface Message {
    type: 'bot' | 'user';
    text: string;
    response_timestamp?: string ;
    suggested_prompts?: string[] ;
}
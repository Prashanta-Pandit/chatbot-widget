// centralise the types of TS

export interface ChatBotWidgetProps {
    pineconeNamespace : string;
    onGoingChatUrl : string;
    initiateChatUrl : string;
    primaryColor ?: string;
    secondaryColor ?: string;
    backgroundColor : string;
    fontColor ?: string;
    placeholderColor ?: string;
    position ?: string;
    name ?: string;
    subTitle ?: string;
    welcomeText ?: string;
}

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
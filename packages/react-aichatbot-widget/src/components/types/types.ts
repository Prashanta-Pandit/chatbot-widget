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
    pineconeNamespace : string;
    position : string;
    aiInitialMessage : string;
}

export interface Message {
  created_at: number;
  message: string ;
  suggested_prompt: string[];
  sender_type: 'user' | 'bot';
}
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "ai/react";

interface MessageContainerProps {
  loading?:  boolean;
  messageType: Message['role'];
  message?: string;
  avatarSrc: string;
  avatarFallback: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ loading, messageType, message, avatarSrc, avatarFallback }) => {
  const isUserMessage = messageType === 'user';
  return (
    <div className={`flex items-start gap-4 ${isUserMessage ? '' : 'justify-end'}`}>
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={avatarSrc}/>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className={`rounded-lg p-4 max-w-[80%] ${isUserMessage ? 'bg-card text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
        <div className="flex items-center gap-2">
          {loading && (<LoaderIcon className="w-5 h-5 animate-spin"/>)}
          <div className="font-medium">{isUserMessage ? 'You' : 'Vodafone assistant'}</div>
        </div>
        <div className="prose">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

export function LoaderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}
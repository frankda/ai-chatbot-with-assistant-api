'use client';

import React, {useEffect, useRef} from 'react';
import {Message, useAssistant} from 'ai/react';
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import MessageContainer, {LoaderIcon} from "@/components/MessageContainer/MessageContainer";

export default function Chat() {
  const [isMinimized, setIsMinimized] = useState(false);
  const {status, messages, input, submitMessage, handleInputChange} =
    useAssistant({api: '/api/assistant'});


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid adding a new line in the textarea
      submitMessage();
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-background ${
        isMinimized ? "fixed bottom-4 right-4 w-[60px] h-[60px]" : ""
      }`}
    >
      {isMinimized ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-full h-full"
          onClick={() => setIsMinimized(false)}
        >
          <MessageCircleIcon className="w-5 h-5"/>
        </Button>
      ) : (
        <>
          <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg"/>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">Vodafone Assistant</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)}>
                <MinimizeIcon className="w-5 h-5"/>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4">
            <div className="flex flex-col gap-4">
              <MessageContainer
                messageType="assistant"
                message="Hi! This is Vodafone assistant, how can I help you?"
                avatarSrc="/placeholder-user.jpg"
                avatarFallback="AI"
              />
              {messages.map((m: Message) => (
                <React.Fragment key={m.id}>
                  {m.role !== 'data' &&
                    <MessageContainer
                      messageType={m.role}
                      message={m.content}
                      avatarSrc="/placeholder-user.jpg"
                      avatarFallback="YO"
                    />
                  }
                  {m.role === 'data' && (
                    <MessageContainer
                      messageType={m.role}
                      message={(m.data as any).description}
                      avatarSrc="/placeholder-user.jpg"
                      avatarFallback="AI"
                    />
                  )}
                </React.Fragment>
              ))}

              <div className="flex items-start gap-4 justify-end">
                {status === 'in_progress' && (
                  <span className="flex">
                    Thinking
                    <LoaderIcon className="w-5 h-5 animate-spin"/>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t bg-card p-4">
            <form className="flex items-center gap-2" onSubmit={submitMessage}>
              <Textarea
                disabled={status !== 'awaiting_message'}
                placeholder="Message Vodafone Assistant..."
                className="flex-1 rounded-xl p-3 resize-none"
                onChange={handleInputChange}
                value={input}
                onKeyUp={handleKeyPress}
              />
              <Button size="icon" className="rounded-full" type="submit">
                <SendIcon className="w-5 h-5"/>
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function MinimizeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}


function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function SendIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
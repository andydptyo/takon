'use client';

import React, { useState } from 'react';
import ChatBox from '@/components/ChatBox';
import ChatInput from '@/components/ChatInput';

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string; }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const newMessage: { sender: string; text: string } = {
      sender: 'user',
      text: text,
    };
    setMessages([...messages, newMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      if (data.reply) {
        const botMessage = {
          sender: 'bot',
          text: data.reply,
        };
        setMessages([...messages, newMessage, botMessage]);
      } else {
        console.error('Error getting reply from OpenRouter API:', data.error);
      }
    } catch (error: unknown) {
      console.error('Error sending message to OpenRouter API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <header className="bg-gray-200 p-4 w-full text-center">
        <h1 className="text-xl font-bold flex items-center justify-center">
          Takon
          <a href="https://github.com/andydptyo/takon" target="_blank" rel="noopener noreferrer">
            <svg className="octicon octicon-mark-github v-align-middle ml-2" viewBox="0 0 16 16" version="1.1" width="32" height="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63.06 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38 3.17-1.07 5.46-4.06 5.46-7.59C16 3.58 12.42 0 8 0z"></path></svg>
          </a>
        </h1>
        <p className="text-sm">Model: google/gemini-2.0-flash-exp:free</p>
      </header>
      <main className="flex-1 p-4 w-full max-w-md h-[500px]">
        <ChatBox messages={messages} loading={loading} />
      </main>
      <footer className="p-4 w-full max-w-md sticky bottom-0 bg-white">
        <ChatInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

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
        <h1 className="text-xl font-bold">Takon</h1>
        <p className="text-sm">Model: google/gemini-2.0-flash-exp:free</p>
      </header>
      <main className="flex-1 p-4 w-full max-w-md">
        <ChatBox messages={messages} loading={loading} />
      </main>
      <footer className="p-4 w-full max-w-md">
        <ChatInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

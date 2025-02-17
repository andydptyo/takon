import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LoadingDots = () => (
  <div className="flex space-x-1 items-center justify-center mr-auto max-w-[80%] bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 px-4 py-2 my-1">
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

const ChatBox = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="chat-box h-full overflow-y-auto p-4 bg-gray-50 flex flex-col">
      {messages.map((message, index) => {
        const isUser = message.sender === 'user';
        const showTimestamp = index === 0 || messages[index - 1]?.sender !== message.sender;
        
        return (
          <div
            key={index}
            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
          >
            {showTimestamp && (
              <div className="text-xs text-gray-400 mb-1">
                {isUser ? 'You' : 'Bot'}
              </div>
            )}
            <div
              className={`message max-w-[80%] ${
                isUser
                  ? 'bg-blue-500 text-white ml-auto rounded-2xl rounded-br-none'
                  : 'bg-white text-gray-800 mr-auto rounded-2xl rounded-bl-none border border-gray-200'
              } shadow-sm px-4 py-2 my-1 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="overflow-x-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
      {loading && <LoadingDots />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;

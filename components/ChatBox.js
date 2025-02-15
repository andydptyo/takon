import React from 'react';

const ChatBox = ({ messages, loading }) => {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === 'user' ? 'text-right rounded-bl-xl rounded-br-xl rounded-tl-xl p-2 ml-auto' : 'text-left rounded-br-xl rounded-tl-xl rounded-tr-xl p-2 mr-auto'}`}
        >
          {message.text}
        </div>
      ))}
      {loading && <div className="text-center">Loading...</div>}
    </div>
  );
};

export default ChatBox;

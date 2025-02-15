import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input flex items-center p-2 bg-gray-100 rounded-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-white rounded-full py-2 px-4 focus:outline-none"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none">
        Send
      </button>
    </form>
  );
};

export default ChatInput;

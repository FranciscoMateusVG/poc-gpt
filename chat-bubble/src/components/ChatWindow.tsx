import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';

interface Message {
  id: number;
  text: string;
}

interface ChatWindowProps {
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isChatOpen,
  setIsChatOpen,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === '') {
      return;
    }

    setMessages([...messages, { id: Date.now(), text: inputText }]);
    setInputText('');
  };

  useOnClickOutside(chatWindowRef, () => {
    if (isChatOpen) {
      setIsChatOpen(false);
    }
  });

  return (
    <div ref={chatWindowRef} className="flex flex-col h-full">
      <div className="bg-gray-800 text-white p-4 text-xl font-semibold">
        Chat Window
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-slate-200">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-gray-400 text-white p-2 mb-2 rounded-md"
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-slate-300">
        <input
          className="border border-gray-300 w-full px-3 py-2 rounded-md"
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatWindow;

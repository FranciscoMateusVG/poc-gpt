import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useEffect } from 'react';

interface ChatWindowProps {
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
}
const WEBSOCKET_URL = 'ws://localhost:8080'; // Replace with your WebSocket server URL
export interface ChatMessageModel {
  role: string;
  content: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isChatOpen,
  setIsChatOpen,
}) => {
  const [inputText, setInputText] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === '') {
      return;
    }

    setMessages([...messages, { role: 'user', content: inputText }]);
    const message: ChatMessageModel = { role: 'You', content: inputText };
    ws?.send(JSON.stringify(message));
    setInputText('');
  };

  useOnClickOutside(chatWindowRef, () => {
    if (isChatOpen) {
      setIsChatOpen(false);
    }
  });

  useEffect(() => {
    const websocket = new WebSocket(WEBSOCKET_URL);
    if (isChatOpen) {
      setWs(websocket);

      websocket.onmessage = (event) => {
        const messages: ChatMessageModel[] = JSON.parse(event.data);
        // Get the last element from the array
        const lastMessage = messages[messages.length - 1];
        setMessages((prevMessages) => [...prevMessages, lastMessage]);
      };
    }

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div ref={chatWindowRef} className="flex flex-col h-full">
      <div className="bg-gray-800 text-white p-4 text-xl font-semibold">
        Chat Window
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-slate-200">
        {messages.map((message, index) => (
          <div
            key={message.role + index}
            className="bg-gray-400 text-white p-2 mb-2 rounded-md"
          >
            {message.content}
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

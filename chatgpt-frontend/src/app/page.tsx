'use client';
import { useEffect, useState } from 'react';

import { ChatInput } from '../components/ChatInput';
import { ChatMessage, ChatMessageModel } from '../components/ChatMessage';

const WEBSOCKET_URL = 'ws://localhost:8080'; // Replace with your WebSocket server URL

const IndexPage = () => {
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(WEBSOCKET_URL);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const messages: ChatMessageModel[] = JSON.parse(event.data);
      // Get the last element from the array
      const lastMessage = messages[messages.length - 1];
      setMessages((prevMessages) => [...prevMessages, lastMessage]);
    };

    return () => {
      websocket.close();
    };
  }, []);

  console.log(messages);
  const handleSendMessage = (text: string) => {
    const message: ChatMessageModel = { role: 'You', content: text };
    setMessages((prevMessages) => [...prevMessages, message]);
    ws?.send(JSON.stringify(message));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-4">Chat with Papaya</h1>
      <div className="bg-white shadow p-4 rounded">
        <div className="h-64 overflow-y-scroll mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
};

export default IndexPage;

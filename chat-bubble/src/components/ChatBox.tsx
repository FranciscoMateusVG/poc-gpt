import { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatBot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 w-2/4 h-2/4">
      {!isChatOpen ? (
        <div
          className="fixed bottom-4 right-4 w-16 h-16 bg-orange-300 hover:bg-orange-500 rounded-full flex items-center justify-center cursor-pointer "
          onClick={toggleChat}
        >
          <i className="fas fa-comment text-white text-2xl" />
        </div>
      ) : (
        <ChatWindow isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
};

export default ChatBot;

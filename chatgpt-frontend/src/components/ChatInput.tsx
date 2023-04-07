import { ChangeEvent, FormEvent, useState } from 'react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    onSubmit(message);
    setMessage('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        className="flex-grow border border-gray-300 rounded-l px-4 py-2"
        placeholder="Type your message"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Send
      </button>
    </form>
  );
};

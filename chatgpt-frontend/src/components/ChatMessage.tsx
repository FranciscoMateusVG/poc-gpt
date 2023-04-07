export interface ChatMessageModel {
  role: string;
  content: string;
}

interface ChatMessageProps {
  message: ChatMessageModel;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start my-2">
      <strong className="mr-2">{message.role}:</strong>
      <p>{message.content}</p>
    </div>
  );
};

import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';

export interface ChatMessage extends ChatCompletionRequestMessage {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

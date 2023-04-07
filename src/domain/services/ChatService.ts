import { ChatCompletionRequestMessage } from 'openai';
import { ChatMessage } from '../models/ChatMessage';

export interface ChatService {
  generateResponse(
    messages: ChatCompletionRequestMessage[] | string[]
  ): Promise<ChatMessage>;
}

import { ChatService } from '../../domain/services/ChatService';
import { ChatMessage } from '../../domain/models/ChatMessage';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
// messages: ChatCompletionRequestMessage[]
export class ChatGPTService implements ChatService {
  constructor(private apiKey: string) {}

  async generateResponse(
    message: ChatCompletionRequestMessage[]
  ): Promise<ChatMessage> {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
      temperature: 0.4,
      max_tokens: 600,
    });

    console.log(response.data.choices);
    const chatGPTResponse: ChatMessage = {
      role: 'assistant',
      content:
        response.data.choices[0].message?.content || "I don't know what to say",
    };

    return chatGPTResponse;
  }
}

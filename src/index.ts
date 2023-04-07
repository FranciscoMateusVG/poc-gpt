import { ChatGPTService } from './infrastructure/adapters/ChatGPTService';
import { createWebSocketServer } from './infrastructure/config/websocket';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY not set.');
  process.exit(1);
}

const chatService = new ChatGPTService(apiKey);
const websocketPort = parseInt(process.env.WEBSOCKET_PORT || '8080', 10);

const wss = createWebSocketServer(chatService, websocketPort);

wss.on('listening', () => {
  console.log(`WebSocket server is running on port ${websocketPort}`);
});

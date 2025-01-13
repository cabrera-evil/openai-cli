import { configEnvironment } from './config/environment';
import { messages } from './contants/messages';
import { streamChatResponse } from './services/chat';
import { promptUser } from './utils/terminal';

async function main(): Promise<void> {
  configEnvironment();
  console.log('ChatGPT Assistant:');
  while (true) {
    messages.push({
      role: 'user',
      content: await promptUser('\nTú: '),
    });
    process.stdout.write('\nChatGPT: ');
    messages.push({
      role: 'assistant',
      content: await streamChatResponse(messages),
    });
    process.stdout.write('\n');
  }
}

main().catch((error) => console.error(error));

import { Message } from '@/types/message';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function streamChatResponse(messages: Message[]): Promise<string> {
  const result = streamText({
    system:
      'Eres un asistente llamado Morty',
    model: openai('gpt-4o-mini'),
    messages,
  });
  let fullResponse = '';
  for await (const part of result.textStream) {
    fullResponse += part;
    process.stdout.write(part);
  }
  return fullResponse;
}

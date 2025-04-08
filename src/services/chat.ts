import { username } from '@/constants/environment';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Message } from '../types/message';

export class ChatService {
  private static instance: ChatService;

  private constructor(
    private readonly model: string,
    private readonly temperature: number,
    private readonly systemPrompt: string = `Eres un asistente llamado Morty que ayuda a ${username} a resolver problemas. Responde de manera concisa y clara. No uses emojis ni lenguaje informal.`,
  ) {}

  static getInstance(
    model: string,
    temperature: number,
    systemPrompt?: string,
  ): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService(model, temperature, systemPrompt);
    }
    return ChatService.instance;
  }

  /**
   * Executes a streaming chat completion and returns the full response
   */
  async run(messages: Message[]): Promise<string> {
    const result = streamText({
      system: this.systemPrompt,
      model: openai(this.model),
      messages,
      temperature: this.temperature,
    });

    let fullResponse = '';
    for await (const part of result.textStream) fullResponse += part;

    return fullResponse;
  }
}

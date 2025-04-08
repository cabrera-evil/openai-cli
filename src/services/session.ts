import { Message, MessageRole } from '@/types/message';
import fs from 'fs-extra';

export class SessionService {
  private static instance: SessionService;
  private messages: Message[] = [];

  constructor(initialMessages?: Message[]) {
    if (initialMessages) this.messages.push(...initialMessages);
  }

  /**
   * Singleton instance of SessionService.
   */
  static getInstance(initialMessages?: Message[]): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService(initialMessages);
    }
    return SessionService.instance;
  }

  /**
   * Adds a message to the session.
   */
  add(role: MessageRole, content: string): void {
    this.messages.push({ role, content });
  }

  /**
   * Returns the current session history.
   */
  history(): Message[] {
    return [...this.messages];
  }

  /**
   * Returns the session in JSON-safe format.
   */
  toJSON(): Message[] {
    return this.history();
  }

  /**
   * Loads a message history from a file and replaces current state.
   */
  async load(path: string): Promise<void> {
    try {
      if (!(await fs.pathExists(path))) return;

      const data = await fs.readJSON(path);
      if (!Array.isArray(data)) throw new Error('Session file is not an array');

      const validMessages = data.filter(
        (msg: any): msg is Message =>
          msg &&
          typeof msg === 'object' &&
          typeof msg.role === 'string' &&
          typeof msg.content === 'string',
      );

      this.messages = validMessages;
    } catch (err) {
      console.error(`Failed to load session from ${path}:`, err);
    }
  }

  /**
   * Saves the current session to a file.
   */
  async save(path: string): Promise<void> {
    try {
      await fs.writeJSON(path, this.toJSON(), { spaces: 2 });
    } catch (err) {
      console.error(`Failed to save session to ${path}:`, err);
    }
  }
}

import { username } from '@/constants/environment';
import { ChatService } from '@/services/chat';
import { SessionService } from '@/services/session';
import { TerminalService } from '@/services/terminal';
import { MessageRole } from '@/types/message';
import chalk from 'chalk';
import ora from 'ora';

type RunChatOptions = {
  model: string;
  temperature: string;
  system?: string;
  stream?: boolean;
  load?: string;
  save?: string;
};

/**
 * Handles user interaction loop with ChatService
 */
export async function runner(opts: RunChatOptions) {
  const session = SessionService.getInstance();
  const terminal = TerminalService.getInstance();
  const chat = ChatService.getInstance(
    opts.model,
    parseFloat(opts.temperature),
    opts.system,
  );

  // Load session if a load path is provided
  if (opts.load) await session.load(opts.load);

  // Add system message if provided
  if (opts.system) session.add(MessageRole.SYSTEM, opts.system);

  while (true) {
    try {
      // Ask for user input
      const input = await terminal.prompt(chalk.greenBright(`${username}:`));
      session.add(MessageRole.USER, input);

      // Send user input to chat service
      const spinner = ora({ text: 'Thinking...', color: 'cyan' }).start();
      const response = await chat.run(session.history()).then((res) => {
        spinner.stop();
        return res;
      });
      session.add(MessageRole.ASSISTANT, response);

      // Display assistant response
      console.log(chalk.blueBright('🤖 Assistant:'), response);

      // Save session if a save path is provided
      if (opts.save) await session.save(opts.save);
    } catch (err) {
      console.error(chalk.red('\n⨯ Error:'), err);
    }
  }
}

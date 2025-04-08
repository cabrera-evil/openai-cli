import chalk from 'chalk';
import prompts from 'prompts';

export class TerminalService {
  private static instance: TerminalService;

  private constructor() {
    this.setupSignalHandlers();
  }

  static getInstance(): TerminalService {
    if (!TerminalService.instance) {
      TerminalService.instance = new TerminalService();
    }
    return TerminalService.instance;
  }

  /**
   * Prompts user for a single line of input.
   * @param message - The message shown to the user.
   * @returns The input string.
   */
  async prompt(message: string): Promise<string> {
    const { input } = await prompts(
      {
        type: 'text',
        name: 'input',
        message: chalk.cyanBright(message),
        format: (value) => value.trim(),
      },
      {
        onCancel: () => this.handleInterrupt(),
      },
    );
    return input;
  }

  /**
   * Handles manual SIGINT or prompt cancellation.
   */
  private handleInterrupt(): void {
    console.log(`\n${chalk.redBright('⨯')} ${chalk.red('Exiting...')}`);
    process.exit(0);
  }

  /**
   * Ensures Ctrl+C exits properly.
   */
  private setupSignalHandlers(): void {
    process.on('SIGINT', () => this.handleInterrupt());
  }
}

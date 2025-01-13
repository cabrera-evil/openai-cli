import * as readline from 'node:readline/promises';

export const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function promptUser(question: string): Promise<string> {
  return terminal.question(question);
}

export function closeTerminal(): void {
  terminal.close();
}

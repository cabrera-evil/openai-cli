import { Command } from 'commander';
import { runner } from './runner';

export function setupOptions(program: Command) {
  program
    .option('-m, --model <model>', 'Set model', 'gpt-4o-mini')
    .option('-t, --temperature <value>', 'Sampling temperature', '0.7')
    .option('--system <prompt>', 'System prompt to use')
    .option('--save <file>', 'Save conversation to file')
    .option('--load <file>', 'Load conversation from file')
    .option('--no-stream', 'Disable streaming response')
    .action(runner);
}

import chalk from 'chalk';
import { Command } from 'commander';
import { setupOptions } from './cli/options';
import { configEnvironment } from './config/environment';

const program = new Command();

program
  .name(process.env.npm_package_name ?? 'cli')
  .description('A CLI assistant powered by ChatGPT')
  .version(process.env.npm_package_version ?? '0.0.1');

setupOptions(program);

async function main() {
  configEnvironment();

  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    console.error(chalk.red('Error:'), err);
    process.exit(1);
  }
}

main();

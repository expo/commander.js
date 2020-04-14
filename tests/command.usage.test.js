const commander = require('../');

const chalk = require('chalk');
chalk.level = 0;

test('when default usage and check program help then starts with default usage', () => {
  const program = new commander.Command();

  program.name('test');
  const helpInformation = program.helpInformation();

  expect(helpInformation).toMatch(/\n^Usage: test \[options\]/m);
});

test('when custom usage and check program help then starts with custom usage', () => {
  const myUsage = 'custom';
  const program = new commander.Command();
  program
    .usage(myUsage);

  program.name('test');
  const helpInformation = program.helpInformation();

  expect(helpInformation).toMatch(new RegExp(`\n^Usage: test ${myUsage}`, 'm'));
});

test('when default usage and check subcommand help then starts with default usage including program name', () => {
  const program = new commander.Command();
  const subCommand = program
    .command('info');

  program.name('test');
  const helpInformation = subCommand.helpInformation();

  expect(helpInformation).toMatch(/\n^Usage: test info \[options\]/m);
});

test('when custom usage and check subcommand help then starts with custom usage including program name', () => {
  const myUsage = 'custom';
  const program = new commander.Command();
  const subCommand = program
    .command('info')
    .usage(myUsage);

  program.name('test');
  const helpInformation = subCommand.helpInformation();

  expect(helpInformation).toMatch(new RegExp(`\n^Usage: test info ${myUsage}`, 'm'));
});

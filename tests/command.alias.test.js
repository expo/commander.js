const commander = require('../');

const chalk = require('chalk');
chalk.level = 0;

// Running alias commands is tested in command.executableSubcommand.lookup.test.js
// Test various other behaviours for .alias

test('when command has alias then appears in help', () => {
  const program = new commander.Command();
  program
    .command('info [thing]')
    .alias('i');
  const helpInformation = program.helpInformation();
  expect(helpInformation).toMatch(
`
Usage:  [options] [command]

Options:

  -h, --help        Outputs usage information.

Commands:

  info | i [thing]
  help [command]    Outputs usage information.

`);
});

test('when command = alias then error', () => {
  const program = new commander.Command();
  expect(() => {
    program
      .command('fail')
      .alias('fail');
  }).toThrow("Command alias can't be the same as its name");
});

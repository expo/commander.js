const commander = require('../');

const chalk = require('chalk');
chalk.level = 0;

// Test auto wrap and indent with some manual strings.
// Fragile tests with complete help output.

test('when long option description then wrap and indent', () => {
  const oldColumns = process.stdout.columns;
  process.stdout.columns = 80;
  const program = new commander.Command();
  program
    .option('-x -extra-long-option-switch', 'kjsahdkajshkahd kajhsd akhds kashd kajhs dkha dkh aksd ka dkha kdh kasd ka kahs dkh sdkh askdh aksd kashdk ahsd kahs dkha skdh');

  const expectedOutput =
`
Usage:  [options]

Options:

  -x -extra-long-option-switch  kjsahdkajshkahd kajhsd akhds kashd kajhs dkha
                                dkh aksd ka dkha kdh kasd ka kahs dkh sdkh
                                askdh aksd kashdk ahsd kahs dkha skdh
  -h, --help                    Outputs usage information.

`;

  const receivedOutput = program.helpInformation();
  expect(receivedOutput).toBe(expectedOutput);
  process.stdout.columns = oldColumns;
});

test('when long option description and default then wrap and indent', () => {
  const oldColumns = process.stdout.columns;
  process.stdout.columns = 80;
  const program = new commander.Command();
  program
    .option('-x -extra-long-option <value>', 'kjsahdkajshkahd kajhsd akhds', 'aaa bbb ccc ddd eee fff ggg');

  const expectedOutput =
`
Usage:  [options]

Options:

  -x -extra-long-option <value>  (default: "aaa bbb ccc ddd eee fff ggg")
                                 kjsahdkajshkahd kajhsd akhds
  -h, --help                     Outputs usage information.

`;

  expect(program.helpInformation()).toBe(expectedOutput);
  process.stdout.columns = oldColumns;
});

test('when long command description then wrap and indent', () => {
  const oldColumns = process.stdout.columns;
  process.stdout.columns = 80;
  const program = new commander.Command();
  program
    .option('-x -extra-long-option-switch', 'x')
    .command('alpha', 'Lorem mollit quis dolor ex do eu quis ad insa a commodo esse.');

  const expectedOutput =
`
Usage:  [options] [command]

Options:

  -x -extra-long-option-switch  x
  -h, --help                    Outputs usage information.

Commands:

  alpha                         Lorem mollit quis dolor ex do eu quis ad insa a
                                commodo esse.
  help [command]                Outputs usage information.

`;

  expect(program.helpInformation()).toBe(expectedOutput);
  process.stdout.columns = oldColumns;
});

test('when not enough room then help not wrapped', () => {
  // Not wrapping if less than 40 columns available for wrapping.
  const oldColumns = process.stdout.columns;
  process.stdout.columns = 60;
  const program = new commander.Command();
  const commandDescription = 'description text of very long command which should not be automatically be wrapped. Do fugiat eiusmod ipsum laboris excepteur pariatur sint ullamco tempor labore eu.';
  program
    .command('1234567801234567890x', commandDescription);

  const expectedOutput =
`
Usage:  [options] [command]

Options:

  -h, --help            Outputs usage information.

Commands:

  1234567801234567890x  ${commandDescription}
  help [command]        Outputs usage information.

`;

  const receivedOutput = program.helpInformation();
  expect(receivedOutput).toBe(expectedOutput);
  process.stdout.columns = oldColumns;
});

test('when option description preformatted then only add small indent', () => {
  const oldColumns = process.stdout.columns;
  process.stdout.columns = 80;
  // #396: leave custom format alone, apart from space-space indent
  const program = new commander.Command();
  program
    .option('-t, --time <HH:MM>', `select time

Time can also be specified using special values:
  "dawn" - From night to sunrise.
`);

  const expectedOutput =
`
Usage:  [options]

Options:

  -t, --time <HH:MM>  select time
  
  Time can also be specified using special values:
    "dawn" - From night to sunrise.
  
  -h, --help          Outputs usage information.

`;

  const receivedOutput = program.helpInformation();
  expect(receivedOutput).toBe(expectedOutput);
  process.stdout.columns = oldColumns;
});

// test for argsDescription passed to command ????

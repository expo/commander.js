const commander = require('../');

// Do some testing of the default export(s).

test('when require commander then is a Command (default export of global)', () => {
  // Legacy global command
  const program = commander;
  expect(program.constructor.name).toBe('Command');
});

test('when require commander then has program (named export of global)', () => {
  // program added in v5
  const program = commander.program;
  expect(program.constructor.name).toBe('Command');
});

test('when require commander then has newable Command', () => {
  const cmd = new commander.Command();
  expect(cmd.constructor.name).toBe('Command');
});

describe('complex program', () => {
  test('properly prints color help', () => {
    const program = new commander.Command();
    program
      .name('complex-program')
      .version('0.0.1')
      .command('install [name]', 'install one or more packages').alias('i')
      .command('search [query]', 'search with optional query').alias('s')
      .command('cache', 'actions dealing with the cache').alias('c')
      .command('echo', 'echo arguments')
      .command('list', 'list packages installed').alias('lst')
      .command('listen', 'listen for supported signal events').alias('l')
      .command('publish', 'publish or update package').alias('p')
      .command('default', 'default command', { noHelp: true, isDefault: true })
      .command('specifyInstall', 'specify install subcommand', { executableFile: 'pm-install' })
      .command('specifyPublish', 'specify publish subcommand', { executableFile: 'pm-publish' })
      .command('silent', 'silently succeed');

    const received = program.helpInformation();
    const expected = `
[1m[33mUsage: [39m[22m[1m[32mcomplex-program[39m[22m [[33moptions[39m] [[3m[32mcommand[39m[23m]

[1m[33mOptions:[39m[22m

  [35m-V[39m, [35m--version[39m       [33moutput the version number[39m
  [35m-h[39m, [35m--help[39m          [33mOutputs usage information.[39m

[1m[33mCommands:[39m[22m

  [1m[32minstall[39m[22m[90m | [39m[3m[32mi[39m[23m [90m[[91mname[39m[90m][39m  [33minstall one or more packages[39m
  [1m[32msearch[39m[22m[90m | [39m[3m[32ms[39m[23m [90m[[91mquery[39m[90m][39m  [33msearch with optional query[39m
  [1m[32mcache[39m[22m[90m | [39m[3m[32mc[39m[23m           [33mactions dealing with the cache[39m
  [1m[32mecho[39m[22m                [33mecho arguments[39m
  [1m[32mlist[39m[22m[90m | [39m[3m[32mlst[39m[23m          [33mlist packages installed[39m
  [1m[32mlisten[39m[22m[90m | [39m[3m[32ml[39m[23m          [33mlisten for supported signal events[39m
  [1m[32mpublish[39m[22m[90m | [39m[3m[32mp[39m[23m         [33mpublish or update package[39m
  [1m[32mspecifyInstall[39m[22m      [33mspecify install subcommand[39m
  [1m[32mspecifyPublish[39m[22m      [33mspecify publish subcommand[39m
  [1m[32msilent[39m[22m              [33msilently succeed[39m
  [1m[32mhelp [0m[90m[[91mcommand[39m[32m[90m][39m[32m[0m[39m[22m      [33mOutputs usage information.[39m

`;
    expect(received).toBe(expected);
  });
});

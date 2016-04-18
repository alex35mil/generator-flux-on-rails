import chalk from 'chalk';
import yosay from 'yosay';
import shift from 'change-case';
import shell from 'shelljs';
import path  from 'path';

export default function mainPrompts() {
  this.log(
    yosay(
      `Welcome to the marvelous ${chalk.red('Flux-on-Rails')} generator!`
    )
  );

  const done = this.async();

  const defaultName = shift.param(this.options.argv.original[0]) || null;
  const skipPrompts = this.options.skipPrompts;

  if (skipPrompts) {
    if (!defaultName) {
      this.env.error(
        chalk.red('NoNameError: Sorry, bro, no way.')
      );
    }

    this.name        = defaultName;
    this.appName     = `${this.name}-app`;
    this.apiName     = `${this.name}-api`;
    this.installApp  = true;
    this.installApi  = true;

    this.root        = path.join(shell.pwd(), this.name);
    this.rubyVersion = shell.env['RUBY_VERSION'];
    this.rvmString   = `rvm ${this.rubyVersion}@${this.name} do `;

    this.configRepo  = false;

    return done();
  }

  const prompts = [
    {
      type   : 'input',
      name   : 'name',
      message: 'Enter app name:',
      default: defaultName,
    },
    {
      type   : 'checkbox',
      name   : 'parts',
      message: 'Choose parts to install:',
      choices: [
        {
          name   : 'Frontend App',
          value  : 'app',
          checked: true,
        },
        {
          name   : 'Rails API',
          value  : 'api',
          checked: true,
        },
      ],
    },
    {
      type   : 'confirm',
      name   : 'configRepo',
      message: 'Configure remote repo on Github / Bitbucket?',
      default: true,
    },
  ];

  return this.prompt(prompts, props => {
    const installPart = part => props.parts.indexOf(part) !== -1;

    this.name        = shift.param(props.name);
    this.appName     = `${this.name}-app`;
    this.apiName     = `${this.name}-api`;
    this.installApp  = installPart('app');
    this.installApi  = installPart('api');

    this.root        = path.join(shell.pwd(), this.name);
    this.rubyVersion = shell.env['RUBY_VERSION'];
    this.rvmString   = `rvm ${this.rubyVersion}@${this.name} do `;

    this.configRepo  = props.configRepo;

    return done();
  });
}

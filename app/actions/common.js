import * as say from '../utils/say';

export function createRvmFiles() {
  say.info('Creating rvm files...');
  this.render(
    'ruby-version',
    '.ruby-version',
    { version: this.rubyVersion }
  );
  this.render(
    'ruby-gemset',
    '.ruby-gemset',
    { gemset: this.name }
  );
}


export function createGitignore() {
  say.info('Creating `.gitignore` file...');
  this.render('gitignore', '.gitignore');
}


export function gitInit() {
  say.info('Initializing git repo...');
  this.shellExec('git init');
  this.shellExec('git add .');
  this.shellExec('git commit --quiet -m "Initial commit"');
}

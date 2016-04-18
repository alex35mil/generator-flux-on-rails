import shell from 'shelljs';

import * as say   from '../utils/say';
import * as utils from '../utils';

export function setupProject() {
  say.info('Setting up project...');

  this.render(
    'app/_package.json',
    'package.json',
    { appName: this.appName, repoUrl: this.repoAppUrl }
  );

  this.copy('app/server.js', '.', 'server.js');
  this.copy('app/server.app.js', '.', 'server.app.js');
  this.copy('app/server.dev.js', '.', 'server.dev.js');
  this.copy('app/server.hot.js', '.', 'server.hot.js');

  shell.mkdir('-p', 'configs/build');
  shell.mkdir('-p', 'configs/server');

  this.render(
    'app/configs/server/_server.base.js',
    'configs/server/server.base.js',
    { name: this.name }
  );
  this.copy(
    'app/configs/server/server.app.js',
    'configs/server/',
    'configs/server/server.app.js'
  );
  this.copy(
    'app/configs/build/',
    'configs/build/',
    'configs/build'
  );

  this.copy('app/flyfile.js', '.', 'flyfile.js');

  this.copy('app/.babelrc', '.', '.babelrc');
  this.copy('app/.eslintrc', '.', '.eslintrc');
  this.copy('app/.eslintignore', '.', '.eslintignore');
  this.copy('app/.editorconfig', '.', '.editorconfig');

  this.copy('app/app/', 'app/');
  this.copy('app/middlewares/', 'middlewares/');
  this.copy('app/scripts/', 'scripts/');

  shell.chmod('-R', '700', 'scripts/*');

  shell.mkdir('build/');
  shell.mkdir('public/');
  shell.mkdir('logs/');
}


export function setupDeploy() {
  say.info('Setting up deploy...');

  shell.mkdir('-p', 'configs/deploy');

  this.copy('app/configs/deploy/', 'configs/deploy/');

  this.render(
    'docs/app.rb',
    'configs/deploy/docs/deploy.rb'
  );
  this.render(
    'app/configs/_deploy_defaults.rb',
    'configs/deploy/defaults.rb',
    { repo: this.repoAppSsh }
  );
  this.render(
    'app/configs/_deploy.rb',
    'configs/deploy/deploy.rb',
    { name: this.name }
  );
}


export function npmInstall() {
  const deps    = utils.latestifyDeps(this.npmDeps);
  const devDeps = utils.latestifyDeps(this.npmDevDeps);

  say.info('Installing dependencies...');

  this.shellExec(`npm install --save ${deps}`);
  this.shellExec(`npm install --save-dev ${devDeps}`);
  this.shellExec('npm shrinkwrap --loglevel error');
}


export function gitRemote() {
  if (this.repoAppSsh) {
    say.info('Configuring remote...');
    this.shellExec(`git remote add origin ${this.repoAppSsh}`);
    if (this.pushToRemote) {
      say.info('Pushing to remote...');
      this.shellExec('git push -u origin master');
    }
  }
}

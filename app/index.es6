/* eslint no-console: 0, no-sync: 0, indent: 0 */

import yeoman from 'yeoman-generator';
import ejs    from 'ejs';
import chalk  from 'chalk';
import yosay  from 'yosay';
import shell  from 'shelljs';
import shift  from 'change-case';
import fs     from 'fs';
import path   from 'path';

import pkg from '../package.json';


module.exports = yeoman.generators.Base.extend({

  initializing() {

    this.pkg = pkg;

    this.npmDependencies = [
      'axios',
      'babel',
      'babel-cli',
      'babel-core',
      'babel-polyfill',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0',
      'babel-register',
      'body-parser',
      'classnames',
      'compression',
      'cookie',
      'cookie-parser',
      'express',
      'history',
      'immutable',
      'jade',
      'mirror-creator',
      'morgan',
      'normalize.css',
      'normalizr',
      'nprogress',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'serialize-javascript',
      'transit-immutable-js',
      'transit-js',
    ];

    this.npmDevDependencies = [
      'autoprefixer',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-react-transform',
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-typecheck',
      'chunk-manifest-webpack-plugin',
      'compression-webpack-plugin',
      'css-loader',
      'escape-string-regexp',
      'eslint',
      'eslint-config-alexfedoseev',
      'eslint-plugin-babel',
      'eslint-plugin-react',
      'extract-text-webpack-plugin',
      'file-loader',
      'fly',
      'fly-build-utils',
      'image-webpack-loader',
      'json-loader',
      'nodemon',
      'node-sass',
      'path',
      'postcss-loader',
      'react-addons-test-utils',
      'react-transform-catch-errors',
      'react-transform-hmr',
      'redbox-react',
      'redux-devtools',
      'sass-loader',
      'sass-resources-loader',
      'source-map-support',
      'style-loader',
      'url-loader',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'webpack-manifest-plugin',

      'chai',
      'chai-immutable',
      'jsdom',
      'mocha',
      'mocha-jsdom',
      'sinon',
    ];

    this.say = {
      arr: '----> ',
      tab: '      ',
      section(msg) {
        console.log('\n\n\n' + chalk.black.bgGreen(this.arr + msg));
      },
      info(msg) {
        console.log('\n\n' + chalk.yellow(this.arr + msg));
      },
      cmd(cmd) {
        console.log('\n' + chalk.green('$ ' + cmd));
      },
      status(item, status) {
        console.log(this.tab + chalk.green(status + ' ') + item);
      },
      plain(msg) {
        console.log(this.tab + msg);
      },
    };

    this.shellExec = function(cmd) {
      this.say.cmd(cmd);
      shell.exec(cmd);
      console.log('Completed.');
    };

    this.rvmExec = function(cmd) {
      this.shellExec(this.rvmString + cmd);
    };

    this.render = function(src, dest, params = {}) {
      const output = ejs.render(this.read(this.templatePath(src)), params);
      fs.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, 'done ');
    };

    this.copy = function(src, dest, show) {
      shell.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(show || dest, 'done ');
    };

    this.injectInto = function(file, baseString, addString, readFromFile) {
      const injectant = (
        readFromFile ?
        fs.readFileSync(this.templatePath(addString)) :
        addString
      );
      const content = (
        fs
          .readFileSync(path.resolve(file), 'utf8')
          .replace(
            baseString + '\n',
            baseString + '\n\n' + injectant + '\n\n'
          )
      );
      fs.writeFileSync(this.destinationPath(file), content);
      this.say.status(file, 'done ');
    };

    this.getLatestOrUseProvided = modules => (
      modules
        .map(module => module.includes('@') ? module + '@latest' : module)
        .join(' ')
    );

  },


  appPrompts() {

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
      this.appName     = this.name + '-app';
      this.apiName     = this.name + '-api';
      this.installApp  = true;
      this.installApi  = true;

      this.root        = path.join(shell.pwd(), this.name);
      this.rubyVersion = shell.env['RUBY_VERSION'];
      this.rvmString   = `rvm ${this.rubyVersion}@${this.name} do `;

      this.configRepo  = false;

      done();

    } else {

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
              name   : 'Node App',
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

      this.prompt(prompts, props => {

        const installPart = part => props.parts.indexOf(part) !== -1;

        this.name        = shift.param(props.name);
        this.appName     = this.name + '-app';
        this.apiName     = this.name + '-api';
        this.installApp  = installPart('app');
        this.installApi  = installPart('api');

        this.root        = path.join(shell.pwd(), this.name);
        this.rubyVersion = shell.env['RUBY_VERSION'];
        this.rvmString   = `rvm ${this.rubyVersion}@${this.name} do `;

        this.configRepo  = props.configRepo;

        done();

      });

    }

  },

  repoPrompts() {

    const done = this.async();

    if (this.configRepo) {

      const prompts = [
        {
          type   : 'list',
          name   : 'repo',
          message: 'Github or Bitbucket?',
          default: 0,
          choices: [
            {
              name : 'Github',
              value: 'github',
            },
            {
              name : 'Bitbucket',
              value: 'bitbucket',
            },
          ],
        },
        {
          type   : 'input',
          name   : 'repoUser',
          message: 'Your username:',
        },
      ];

      this.prompt(prompts, props => {

        const { appName, apiName } = this;

        this.repo = props.repo;

        if (this.repo === 'github') {
          this.repoUser = props.repoUser || 'alexfedoseev';

          const { repoUser } = this;

          this.repoAppUrl = `https://github.com/${repoUser}/${appName}`;
          this.repoApiUrl = `https://github.com/${repoUser}/${apiName}`;
          this.repoAppSsh = `git@github.com:${repoUser}/${appName}.git`;
          this.repoApiSsh = `git@github.com:${repoUser}/${apiName}.git`;
        } else {
          this.repoUser = props.repoUser || 'alex_fedoseev';

          const { repoUser } = this;

          this.repoAppUrl = `https://bitbucket.org/${repoUser}/${appName}`;
          this.repoApiUrl = `https://bitbucket.org/${repoUser}/${apiName}`;
          this.repoAppSsh = `git@bitbucket.org:${repoUser}/${appName}.git`;
          this.repoApiSsh = `git@bitbucket.org:${repoUser}/${apiName}.git`;
        }

        done();

      });

    } else {

      done();

    }

  },


  pushPrompt() {

    const done = this.async();

    if (this.configRepo && this.repo) {

      const newLine = '\n    ';
      const { repoAppSsh, repoApiSsh } = this;

      let notice = newLine + 'Check that you have created:';
      if (this.installApp) notice += newLine + `Node app repo: ${repoAppSsh}`;
      if (this.installApi) notice += newLine + `Rails app repo: ${repoApiSsh}`;
      notice = newLine + notice + newLine + newLine;

      const prompt = [
        {
          type   : 'confirm',
          name   : 'pushToRemote',
          message: 'Push first commit to remote?' + notice + 'Push now?',
          default: false,
        },
      ];

      this.prompt(prompt, props => {

        this.pushToRemote = props.pushToRemote;
        done();

      });

    } else {

      done();

    }

  },


  methods() {

    this.app = {

      setupProject: () => {
        this.say.info('Setting up project...');

        this.render(
          'app/_package.json',
          'package.json',
          {
            appName: this.appName,
            repoUrl: this.repoAppUrl,
          }
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
      },


      setupDeploy: () => {
        this.say.info('Setting up deploy...');

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
      },


      npmInstall: () => {
        const deps    = this.getLatestOrUseProvided(this.npmDependencies);
        const devDeps = this.getLatestOrUseProvided(this.npmDevDependencies);

        this.say.info('Installing dependencies...');

        this.shellExec(`npm install --save ${deps}`);
        this.shellExec(`npm install --save-dev ${devDeps}`);
        this.shellExec('npm shrinkwrap --loglevel error');
      },


      gitRemote: () => {
        if (this.repoAppSsh) {
          this.say.info('Configuring remote...');
          this.shellExec('git remote add origin ' + this.repoAppSsh);
          if (this.pushToRemote) {
            this.say.info('Pushing to remote...');
            this.shellExec('git push -u origin master');
          }
        }
      },

    };


    this.api = {

      prepareEnv: () => {
        this.say.info('Creating gemset...');
        this.shellExec('rvm gemset create ' + this.name);

        this.say.info('Installing `bundler` gem...');
        this.rvmExec('gem install bundler --quiet');

        this.say.info('Installing `rails-api` gem...');
        this.rvmExec('gem install rails-api --quiet');
      },


      createApp: () => {
        const { apiName } = this;

        this.say.info('Creating Rails app...');
        this.rvmExec(`rails-api new ${apiName} --skip-sprockets --skip-bundle --quiet --database=postgresql`);
      },


      editGemfile: () => {
        this.say.info('Modifying Gemfile...');
        this.render(
          'api/_Gemfile',
          'Gemfile',
          {
            version: (
              fs
                .readFileSync(path.resolve('Gemfile'), 'utf8')
                .match(/gem 'rails', (.*)/i)[1]
            ),
          }
        );
      },


      installGems: () => {
        this.say.info('Installing gems...');
        this.say.plain('This WILL take a while.');
        this.rvmExec('bundle install --without production --quiet');
      },


      editDBConfig: () => {
        this.say.info('Modifying database config...');
        this.render(
          'api/config/_database.yml',
          'config/database.yml',
          {
            app: shift.snake(this.apiName),
          }
        );
      },


      createDB: () => {
        this.say.info('Creating databases...');
        this.rvmExec('bundle exec rake db:create:all');
      },


      editCore: () => {
        this.say.info('Modifying core...');
        this.injectInto(
          'config/application.rb',
          'class Application < Rails::Application',
          '    config.middleware.use Rack::Deflater'
        );
        this.render(
          'api/lib/_api_constraints.rb',
          'lib/api_constraints.rb',
          { name: this.name }
        );
        this.render(
          'api/app/controllers/_application_controller.rb',
          'app/controllers/application_controller.rb'
        );
        this.copy(
          'api/app/controllers/api/',
          'app/controllers/api/'
        );
      },


      setupDeploy: () => {
        this.say.info('Setting up deploy...');

        this.copy('api/lib/mina/', 'lib/mina/');

        this.render(
          'docs/api.rb',
          'lib/mina/docs/deploy.rb'
        );
        this.render(
          'api/lib/_deploy_defaults.rb',
          'lib/mina/defaults.rb',
          { repo: this.repoApiSsh }
        );
        this.render(
          'api/config/_deploy.rb',
          'config/deploy.rb',
          { name: this.name }
        );
        this.render(
          'api/config/_environment_variables.yml',
          'config/environment_variables.yml'
        );
        this.copy(
          'api/config/initializers/!environment_variables.rb',
          'config/initializers/'
        );
      },


      setupTests: () => {
        this.say.info('Setting up tests...');

        this.rvmExec('rails g rspec:install');

        shell.mkdir('-p', 'spec/routing');
        shell.mkdir('-p', 'spec/support');

        this.render(
          'api/spec/routing/_api_constraints_spec.rb',
          'spec/routing/api_constraints_spec.rb',
          { name: this.name }
        );
        this.render(
          'api/spec/support/_request_helpers.rb',
          'spec/support/request_helpers.rb',
          { name: this.name }
        );
        this.copy(
          'api/spec/support/unauthorized_shared_examples.rb',
          'spec/support/'
        );
        this.injectInto(
          'spec/spec_helper.rb',
          'RSpec.configure do |config|',
          'api/spec/__spec_helper.rb',
          true
        );
      },


      setupAuth: () => {
        this.say.info('Setting up authentication...');

        this.rvmExec('rails generate devise:install');
        this.rvmExec('rails generate devise User');

        this.injectInto(
          'app/models/user.rb',
          ':recoverable, :rememberable, :trackable, :validatable',
          '  acts_as_token_authenticatable'
        );

        const migration = fs.readdirSync(this.destinationPath('db/migrate'))[0];

        this.injectInto(
          'db/migrate/' + migration,
          't.string :encrypted_password, null: false, default: ""',
          '      t.string :authentication_token, null: false, default: ""'
        );
        this.injectInto(
          'db/migrate/' + migration,
          'add_index :users, :reset_password_token, unique: true',
          '    add_index :users, :authentication_token, unique: true'
        );

        this.rvmExec('rails generate serializer User');

        this.copy(
          'api/app/serializers/user_serializer.rb',
          'app/serializers/'
        );

        this.injectInto(
          'config/initializers/devise.rb',
          'Devise.setup do |config|',
          "  config.secret_key = ENV['DEVISE_SECRET_KEY'] if Rails.env.production?"
        );

        this.render('api/config/_routes.rb', 'config/routes.rb');
      },


      gitRemote: () => {
        if (this.repoApiSsh) {
          this.say.info('Configuring remote...');
          this.shellExec('git remote add origin ' + this.repoApiSsh);
          if (this.pushToRemote) {
            this.say.info('Pushing to remote...');
            this.shellExec('git push -u origin master');
          }
        }
      },

    };


    this.shared = {

      createRvmFiles: () => {
        this.say.info('Creating rvm files...');
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
      },


      createGitignore: () => {
        this.say.info('Creating `.gitignore` file...');
        this.render('gitignore', '.gitignore');
      },


      gitInit: () => {
        this.say.info('Initializing git repo...');
        this.shellExec('git init');
        this.shellExec('git add .');
        this.shellExec('git commit --quiet -m "Initial commit"');
      },

    };

  },


  writing: {

    scaffoldRoots() {
      shell.mkdir('-p', this.name);

      if (this.installApp) {
        shell.mkdir('-p', path.join(this.name, this.appName));
      }

      if (this.installApi) {
        shell.mkdir('-p', path.join(this.name, this.apiName));
      }
    },


    scaffoldApp() {

      if (!this.installApp) return;

      this.say.section('Scaffolding Node App...');

      shell.cd(path.join(this.root, this.appName));
      this.app.setupProject();
      this.shared.createRvmFiles();
      this.shared.createGitignore();
      this.app.setupDeploy();
      this.app.npmInstall();
      this.shared.gitInit();
      this.app.gitRemote();

    },


    scaffoldApi() {

      if (!this.installApi) return;

      this.say.section('Scaffolding Rails API...');

      shell.cd(this.root);
      this.api.prepareEnv();
      this.api.createApp();

      shell.cd(path.join(this.root, this.apiName));
      this.shared.createRvmFiles();
      this.shared.createGitignore();
      this.api.editGemfile();
      this.api.installGems();
      this.api.editDBConfig();
      this.api.createDB();
      this.api.editCore();
      this.api.setupDeploy();
      this.api.setupTests();
      this.api.setupAuth();
      this.shared.gitInit();
      this.api.gitRemote();

    },


    allDone() {

      console.log('\n\n');

      this.say.status('What else:', 'All done!');

      if (this.installApp) {
        this.say.section('Node App');
        this.say.plain('- Check app configuration.');
        this.say.plain('- Check deploy settings in `configs/deploy.rb` & `configs/deploy` folder.');
      }

      if (this.installApi) {
        this.say.section('Rails Api');
        this.say.plain('- Setup User:');
        this.say.plain('---> Check User model: `app/models/user.rb`');
        this.say.plain('---> Check User migration: `db/migrate/XXXXXXXXXXXXXX_devise_create_users.rb`');
        this.say.plain('---> Migrate: `bundle exec rake db:migrate`');
        this.say.plain('');
        this.say.plain('- Check app configuration.');
        this.say.plain('- Check deploy settings in `config/deploy.rb` & `lib/mina` folder.');
      }

      this.say.section('And...');
      this.say.plain('Spin it up > Check logs > Fix errors > Have fun!');

      console.log('\n\n');

    },

  },

});

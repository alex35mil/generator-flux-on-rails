'use strict';

var yeoman  = require('yeoman-generator'),
    chalk   = require('chalk'),
    yosay   = require('yosay'),
    shell   = require('shelljs'),
    shift   = require('change-case'),
    fs      = require('fs'),
    path    = require('path');


module.exports = yeoman.generators.Base.extend({

  initializing: function() {

    this.pkg = require('../package.json');

    this.npmDependencies = [
      'axios',
      'babel',
      'babel-core',
      'body-parser',
      'compression',
      'cookie',
      'cookie-parser',
      'express',
      'immutable',
      'jade',
      'morgan',
      'nprogress',
      'path',
      'react',
      'react-redux',
      'react-router@1.0.0-beta3',
      'redux@1.0.0-rc',
      'redux-thunk'
    ];

    this.npmDevDependencies = [
      'autoprefixer-loader',
      'babel-eslint',
      'babel-loader',
      'compression-webpack-plugin',
      'css-loader',
      'del',
      'extract-text-webpack-plugin',
      'gulp',
      'gulp-changed',
      'gulp-eslint',
      'gulp-if',
      'gulp-imagemin',
      'gulp-util',
      'node-notifier',
      'react-hot-loader',
      'redux-devtools',
      'run-sequence',
      'style-loader',
      'stylus-loader',
      'webpack',
      'webpack-dev-server'
    ];

    this.say = {
      arr: '----> ',
      tab: '      ',
      section: function(msg) {
        console.log('\n\n\n' + chalk.bgGreen(this.arr + msg));
      },
      info: function(msg) {
        console.log('\n\n' + chalk.yellow(this.arr + msg));
      },
      cmd: function(cmd) {
        console.log('\n' + chalk.green('$ ' + cmd));
      },
      status: function(item, status) {
        console.log(this.tab + chalk.green(status + ' ') + item);
      },
      plain: function(msg) {
        console.log(this.tab + msg);
      }
    };

    this.shellExec = function(cmd) {
      this.say.cmd(cmd);
      shell.exec(cmd);
      console.log('Completed.');
    };

    this.rvmExec = function(cmd) {
      this.shellExec(this.rvmString + cmd);
    };

    this.render = function(src, dest, params) {
      var _params = params || {},
          output  = this.engine(this.read(this.templatePath(src)), _params);
      fs.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, 'done ');
    };

    this.copy = function(src, dest, show) {
      var el = show || dest;
      shell.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(el, 'done ');
    };

    this.injectInto = function(file, baseString, addString, readFromFile) {
      var _content  = this.readFileAsString(file),
          injectant = readFromFile ? fs.readFileSync(this.templatePath(addString)) : addString;
      _content = _content.replace(
          baseString + '\n',
          baseString + '\n\n' + injectant + '\n\n'
      );
      fs.writeFileSync(this.destinationPath(file), _content);
      this.say.status(file, 'done ');
    };

  },


  appPrompts: function() {

    var done = this.async();

    this.log(yosay(
      'Welcome to the marvelous ' + chalk.red('React-on-Rails') + ' generator!'
    ));

    var prompts = [
      {
        type   : 'input',
        name   : 'name',
        message: 'Enter app name:',
        default: shift.param(this.options.argv.original[0]) || null
      },
      {
        type   : 'checkbox',
        name   : 'parts',
        message: 'Choose parts to install:',
        choices: [
          {
            name   : 'Node App',
            value  : 'app',
            checked: true
          },
          {
            name   : 'Rails API',
            value  : 'api',
            checked: true
          }
        ]
      },
      {
        type   : 'confirm',
        name   : 'configRepo',
        message: 'Configure remote repo on Github / Bitbucket?',
        default: true
      }

    ];

    this.prompt(prompts, function (props) {

      function installPart(part) {
        return props.parts.indexOf(part) !== -1;
      }

      this.name        = shift.param(props.name);
      this.appName     = this.name + '-app';
      this.apiName     = this.name + '-api';
      this.installApp  = installPart('app');
      this.installApi  = installPart('api');

      this.root        = path.join(shell.pwd(), this.name);
      this.rubyVersion = shell.env['RUBY_VERSION'];
      this.rvmString   = 'rvm ' + this.rubyVersion + '@' + this.name + ' do ';

      this.configRepo  = props.configRepo;

      done();

    }.bind(this));

  },

  repoPrompts: function() {

    var done = this.async();

    if (this.configRepo) {

      var prompts = [
        {
          type   : 'list',
          name   : 'repo',
          message: 'Github or Bitbucket?',
          default: 0,
          choices: [
            {
              name : 'Github',
              value: 'github'
            },
            {
              name : 'Bitbucket',
              value: 'bitbucket'
            }
          ]
        },
        {
          type   : 'input',
          name   : 'repoUser',
          message: 'Your username:'
        }
      ];

      this.prompt(prompts, function (props) {

        this.repo = props.repo;

        if (this.repo === 'github') {
          this.repoUser   = props.repoUser || 'alexfedoseev';
          this.repoAppUrl = 'https://github.com/' + this.repoUser + '/' + this.appName;
          this.repoApiUrl = 'https://github.com/' + this.repoUser + '/' + this.apiName;
          this.repoAppSsh = 'git@github.com:' + this.repoUser + '/' + this.appName + '.git';
          this.repoApiSsh = 'git@github.com:' + this.repoUser + '/' + this.apiName + '.git';
        } else {
          this.repoUser   = props.repoUser || 'alex_fedoseev';
          this.repoAppUrl = 'https://bitbucket.org/' + this.repoUser + '/' + this.appName;
          this.repoApiUrl = 'https://bitbucket.org/' + this.repoUser + '/' + this.apiName;
          this.repoAppSsh = 'git@bitbucket.org:' + this.repoUser + '/' + this.appName + '.git';
          this.repoApiSsh = 'git@bitbucket.org:' + this.repoUser + '/' + this.apiName + '.git';
        }

        done();

      }.bind(this));

    } else {

      done();

    }

  },


  pushPrompt: function() {

    var done = this.async();

    if (this.configRepo && this.repo) {

      var notice, newLine = '\n    ';

      notice  = newLine + 'Check that you have created:';
      if (this.installApp) notice += newLine + 'Node app repo:  ' + this.repoAppSsh;
      if (this.installApi) notice += newLine + 'Rails app repo: ' + this.repoApiSsh;

      var prompt = [
        {
          type   : 'confirm',
          name   : 'pushToRemote',
          message: 'Push first commit to remote?' + newLine + notice + newLine + newLine + 'Push now?',
          default: false
        }
      ];

      this.prompt(prompt, function (props) {

        this.pushToRemote = props.pushToRemote;
        done();

      }.bind(this));

    } else {

      done();

    }

  },


  methods: function() {

    this.app = {

      setupProject: function() {
        this.say.info('Setting up project...');
        this.render('app/_package.json', 'package.json', { appName: this.appName, repoUrl: this.repoAppUrl });
        this.copy('app/server.js', '.', 'server.js');
        this.copy('app/server.app.js', '.', 'server.app.js');
        this.copy('app/server.dev.js', '.', 'server.dev.js');
        shell.mkdir('config/');
        this.render('app/config/_server.js', 'config/server.js', { name: this.name });
        this.copy('app/config/server.app.js', 'config/', 'config/server.app.js');
        this.copy('app/gulpfile.babel.js', '.', 'gulpfile.babel.js');
        this.copy('app/.eslintrc', '.', '.eslintrc');
        this.copy('app/.editorconfig', '.', '.editorconfig');
        this.copy('app/app/', 'app/');
        this.copy('app/build/', 'build/');
        this.copy('app/server/', 'server/');
        this.copy('app/public/', 'public/');
        shell.exec('touch public/.keeper');
        this.copy('app/log/', 'log/');
        shell.exec('touch log/.keeper');
      }.bind(this),

      setupDeploy: function() {
        this.say.info('Setting up deploy...');
        this.copy('app/config/mina/', 'config/mina/');
        this.render('docs/app.rb', 'config/mina/docs/deploy.rb');
        this.render('app/config/_deploy_defaults.rb', 'config/mina/defaults.rb', { repo: this.repoAppSsh });
        this.render('app/config/_deploy.rb', 'config/deploy.rb', { name: this.name });
      }.bind(this),

      npmInstall: function() {
        var _deps    = this.npmDependencies.join(' '),
            _devDeps = this.npmDevDependencies.join(' ');
        this.say.info('Installing dependencies...');
        this.shellExec('npm install ' + _deps + ' --save --loglevel error');
        this.shellExec('npm install ' + _devDeps + ' --save-dev --loglevel error');
        this.shellExec('npm shrinkwrap --loglevel error');
      }.bind(this),

      gitRemote: function() {
        if (this.repoAppSsh) {
          this.say.info('Configuring remote...');
          this.shellExec('git remote add origin ' + this.repoAppSsh);
          if (this.pushToRemote) {
            this.say.info('Pushing to remote...');
            this.shellExec('git push -u origin master');
          }
        }
      }.bind(this)

    };

    this.api = {

      prepareEnv: function() {
        this.say.info('Creating gemset...');
        this.shellExec('rvm gemset create ' + this.name);

        this.say.info('Installing `rails-api` gem...');
        this.rvmExec('gem install rails-api --quiet');
      }.bind(this),

      createApp: function() {
        this.say.info('Creating Rails app...');
        this.rvmExec('rails-api new ' + this.apiName + ' --skip-sprockets --skip-bundle --quiet --database=postgresql');
      }.bind(this),

      editGemfile: function() {
        this.say.info('Modifying Gemfile...');
        this.render('api/_Gemfile', 'Gemfile', { version: this.readFileAsString('Gemfile').match(/gem 'rails', (.*)/i)[1] });
      }.bind(this),

      installGems: function() {
        this.say.info('Installing gems...');
        this.say.plain('This WILL take a while.');
        this.rvmExec('bundle install --without production --quiet');
      }.bind(this),

      editDBConfig: function() {
        this.say.info('Modifying database config...');
        this.render('api/config/_database.yml', 'config/database.yml', { app: shift.snake(this.apiName) });
      }.bind(this),

      createDB: function() {
        this.say.info('Creating databases...');
        this.rvmExec('bundle exec rake db:create:all');
      }.bind(this),

      editCore: function() {
        this.say.info('Modifying core...');
        this.injectInto('config/application.rb', 'class Application < Rails::Application', '    config.middleware.use Rack::Deflater');
        this.render('api/lib/_api_constraints.rb', 'lib/api_constraints.rb', { name: this.name });
        this.render('api/app/controllers/_application_controller.rb', 'app/controllers/application_controller.rb');
        this.copy('api/app/controllers/api/', 'app/controllers/api/');
      }.bind(this),

      setupDeploy: function() {
        this.say.info('Setting up deploy...');
        this.copy('api/lib/mina/', 'lib/mina/');
        this.render('docs/api.rb', 'lib/mina/docs/deploy.rb');
        this.render('api/lib/_deploy_defaults.rb', 'lib/mina/defaults.rb', { repo: this.repoApiSsh });
        this.render('api/config/_deploy.rb', 'config/deploy.rb', { name: this.name });
        this.render('api/config/_environment_variables.yml', 'config/environment_variables.yml');
        this.copy('api/config/initializers/!environment_variables.rb', 'config/initializers/');
      }.bind(this),

      setupTests: function() {
        this.say.info('Setting up tests...');
        this.rvmExec('rails g rspec:install');
        shell.mkdir('-p', 'spec/routing');
        shell.mkdir('-p', 'spec/support');
        this.render('api/spec/routing/_api_constraints_spec.rb', 'spec/routing/api_constraints_spec.rb', { name: this.name });
        this.render('api/spec/support/_request_helpers.rb', 'spec/support/request_helpers.rb', { name: this.name });
        this.copy('api/spec/support/unauthorized_shared_examples.rb', 'spec/support/');
        this.injectInto('spec/spec_helper.rb', 'RSpec.configure do |config|', 'api/spec/__spec_helper.rb', true);
      }.bind(this),

      setupAuth: function() {
        this.say.info('Setting up authentication...');
        this.rvmExec('rails generate devise:install');
        this.rvmExec('rails generate devise User');
        this.injectInto('app/models/user.rb', ':recoverable, :rememberable, :trackable, :validatable', '  acts_as_token_authenticatable');
        var migration = fs.readdirSync(this.destinationPath('db/migrate'))[0];
        this.injectInto('db/migrate/' + migration, 't.string :encrypted_password, null: false, default: ""', '      t.string :authentication_token, null: false, default: ""');
        this.injectInto('db/migrate/' + migration, 'add_index :users, :reset_password_token, unique: true', '    add_index :users, :authentication_token, unique: true');
        this.rvmExec('rails generate serializer User');
        this.copy('api/app/serializers/user_serializer.rb', 'app/serializers/');
        this.injectInto('config/initializers/devise.rb', 'Devise.setup do |config|', "  config.secret_key = ENV['DEVISE_SECRET_KEY'] if Rails.env.production?");
        this.render('api/config/_routes.rb', 'config/routes.rb');

      }.bind(this),

      gitRemote: function() {
        if (this.repoApiSsh) {
          this.say.info('Configuring remote...');
          this.shellExec('git remote add origin ' + this.repoApiSsh);
          if (this.pushToRemote) {
            this.say.info('Pushing to remote...');
            this.shellExec('git push -u origin master');
          }
        }
      }.bind(this)

    };

    this.shared = {

      createRvmFiles: function() {
        this.say.info('Creating rvm files...');
        this.render('ruby-version', '.ruby-version', { version: this.rubyVersion });
        this.render('ruby-gemset', '.ruby-gemset', { gemset: this.name });
      }.bind(this),

      createGitignore: function() {
        this.say.info('Creating `.gitignore` file...');
        this.render('gitignore', '.gitignore');
      }.bind(this),

      gitInit: function() {
        this.say.info('Initializing git repo...');
        this.shellExec('git init');
        this.shellExec('git add .');
        this.shellExec('git commit --quiet -m "Initial commit"');
      }.bind(this)

    };

  },


  writing: {

    scaffoldRoots: function() {
      this.mkdir(this.name);
      if (this.installApp) this.mkdir(path.join(this.name, this.appName));
      if (this.installApi) this.mkdir(path.join(this.name, this.apiName));
    },

    scaffoldApp: function() {

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

    scaffoldApi: function() {

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

    allDone: function() {

      console.log('\n\n');

      this.say.status('What else:', 'All done!');

      if (this.installApp) {
        this.say.section('Node App');
        this.say.plain('- Check app configuration.');
        this.say.plain('- Check deploy settings in `config/deploy.rb` & `config/mina` folder.');
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

    }

  }

});

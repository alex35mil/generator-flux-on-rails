import shell from 'shelljs';
import shift from 'change-case';
import fs    from 'fs';
import path  from 'path';

import * as say from '../utils/say';

export function prepareEnv() {
  say.info('Creating gemset...');
  this.shellExec(`rvm gemset create ${this.name}`);

  say.info('Installing `bundler` gem...');
  this.rvmExec('gem install bundler --quiet');

  say.info('Installing `rails-api` gem...');
  this.rvmExec('gem install rails-api --quiet');
}


export function createApp() {
  say.info('Creating Rails app...');

  const cmd = `rails-api new ${this.apiName}`;
  const opts = [
    '--skip-sprockets',
    '--skip-bundle',
    '--quiet',
    '--database=postgresql',
  ].join(' ');

  this.rvmExec(`${cmd} ${opts}`);
}


export function editGemfile() {
  say.info('Modifying Gemfile...');
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
}


export function installGems() {
  say.info('Installing gems...');
  say.plain('This WILL take a while.');
  this.rvmExec('bundle install --without production --quiet');
}


export function editDBConfig() {
  say.info('Modifying database config...');
  this.render(
    'api/config/_database.yml',
    'config/database.yml',
    { app: shift.snake(this.apiName) }
  );
}


export function createDB() {
  say.info('Creating databases...');
  this.rvmExec('bundle exec rake db:create:all');
}


export function editCore() {
  say.info('Modifying core...');
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
}


export function setupDeploy() {
  say.info('Setting up deploy...');

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
}


export function setupTests() {
  say.info('Setting up tests...');

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
}


export function setupAuth() {
  say.info('Setting up authentication...');

  this.rvmExec('rails generate devise:install');
  this.rvmExec('rails generate devise User');

  this.injectInto(
    'app/models/user.rb',
    ':recoverable, :rememberable, :trackable, :validatable',
    '  acts_as_token_authenticatable'
  );

  const migration = fs.readdirSync(this.destinationPath('db/migrate'))[0];

  this.injectInto(
    `db/migrate/${migration}`,
    't.string :encrypted_password, null: false, default: ""',
    '      t.string :authentication_token, null: false, default: ""'
  );
  this.injectInto(
    `db/migrate/${migration}`,
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
}


export function gitRemote() {
  if (this.repoApiSsh) {
    say.info('Configuring remote...');
    this.shellExec(`git remote add origin ${this.repoApiSsh}`);
    if (this.pushToRemote) {
      say.info('Pushing to remote...');
      this.shellExec('git push -u origin master');
    }
  }
}

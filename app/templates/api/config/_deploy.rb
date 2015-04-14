$:.unshift './lib'

require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

require 'mina/defaults'
require 'mina/check'
require 'mina/setup'
require 'mina/env'
require 'mina/nginx'
require 'mina/unicorn'
require 'mina/log'

require 'mina/helpers/servers'
require 'mina/helpers/checkers'
require 'mina/helpers/print'
require 'mina/helpers/render'

require 'mina/docs/deploy'


Dir['lib/mina/servers/*.rb'].each { |s| load s }


set :app,             '<%= name %>'
set :app_part,        'api'

set :default_server,  :production
set :server,          all_servers.include?(ARGV.first) ? ARGV.first : default_server

invoke  :"#{server}"
invoke  :set_defaults


desc "Using the right Ruby."
task :environment do
  invoke :"rvm:use[#{RUBY_VERSION}@#{app_rails}]"
end


desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do

    invoke :'check:revision'
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    invoke :'deploy:cleanup'

    to :launch do
      invoke :'unicorn:restart'
    end

  end
end

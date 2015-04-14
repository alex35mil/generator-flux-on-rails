$:.unshift './config'

require 'mina/git'
require 'mina/npm'

require 'mina/defaults'
require 'mina/check'
require 'mina/setup'
require 'mina/env'
require 'mina/nginx'
require 'mina/upstart'
require 'mina/log'

require 'mina/helpers/servers'
require 'mina/helpers/checkers'
require 'mina/helpers/print'
require 'mina/helpers/render'

require 'mina/docs/deploy'


Dir['config/mina/servers/*.rb'].each { |s| load s }


set :app,             '<%= name %>'
set :app_part,        'app'

set :default_server,  :production
set :server,          all_servers.include?(ARGV.first) ? ARGV.first : default_server

invoke  :"#{server}"
invoke  :set_defaults


desc "Deploys the current version to the server."
task :deploy do
  deploy do

    invoke :'check:revision'
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'npm:install'
    invoke :'deploy:cleanup'

    to :launch do
      # invoke :'systemd:restart'
      invoke :'upstart:restart'
    end

  end
end

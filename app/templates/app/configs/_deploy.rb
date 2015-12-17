$:.unshift './configs'

require 'deploy/git'
require 'deploy/npm'

require 'deploy/defaults'
require 'deploy/check'
require 'deploy/setup'
require 'deploy/env'
require 'deploy/nginx'
require 'deploy/upstart'
require 'deploy/log'

require 'deploy/helpers/servers'
require 'deploy/helpers/checkers'
require 'deploy/helpers/print'
require 'deploy/helpers/render'

require 'deploy/docs/deploy'


Dir['configs/deploy/servers/*.rb'].each { |s| load s }


set :app,             '<%= name %>'
set :app_part,        'app'
# set :admin_part,      'admin'

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
      invoke :'upstart:app:restart'
      # invoke :'upstart:admin:restart'
    end

  end
end

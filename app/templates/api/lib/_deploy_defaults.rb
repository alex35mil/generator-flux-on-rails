task :set_defaults do

  set_default :app_rails,         "#{app}-#{app_part}"
  set_default :keep_releases,     5
  set_default :forward_agent,     true

  set_default :repository,        '<%= repo || 'user@domain.com:your/repo.git' %>'
  set_default :branch,            'master'

  set_default :user,              'deployer'
  set_default :group,             'deployer'
  set_default :deploy_to,         "/home/#{user}/apps/#{app_server_name}/#{app_rails}"
  set_default :shared_paths,      ['config/database.yml', 'config/environment_variables.yml', 'tmp', 'log']
  set_default :term_mode,         :system  # `sudo` don't like :pretty
  set_default :rails_env,         :production
  set_default :enable_ssl,        false

  set_default :current_release,   "#{deploy_to}/current"
  set_default :config_path,       "#{deploy_to}/#{shared_path}/config"
  set_default :logs_path,         "#{deploy_to}/#{shared_path}/log"
  set_default :sockets_path,      "#{deploy_to}/#{shared_path}/tmp/sockets"
  set_default :pids_path,         "#{deploy_to}/#{shared_path}/tmp/pids"

  set_default :erb_templates,     'lib/mina/templates'
  set_default :configs_tmp_path,  'tmp/deploy_configs'

  set_default :unicorn_workers,   3
  set_default :unicorn_timeout,   30
  set_default :unicorn_symlink,   "unicorn_#{app_sys_id!}"
  set_default :unicorn_script,    "/etc/init.d/#{unicorn_symlink}"

  set_default :nginx_port,        80
  set_default :nginx_config,      "/etc/nginx/sites-enabled/#{app_sys_id!}"
  set_default :nginx_log,         "/var/log/nginx/#{app_sys_id!}.log"
  set_default :nginx_error_log,   "/var/log/nginx/#{app_sys_id!}.error.log"

  set_default :logrotate_path,    "/etc/logrotate.d/#{app_sys_id!}_rails"

end
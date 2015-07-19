task :set_defaults do

  set_default :app_node,              "#{app}-#{app_part}"
  set_default :keep_releases,         5
  set_default :forward_agent,         true

  set_default :repository,            '<%= repo || 'user@domain.com:your/repo.git' %>'
  set_default :branch,                'master'

  set_default :user,                  'deployer'
  set_default :group,                 'deployer'
  set_default :deploy_to,             "/home/#{user}/apps/#{app_server_name}/#{app_node}"
  set_default :shared_paths,          ['log']
  set_default :term_mode,             :system  # `sudo` don't like :pretty
  set_default :enable_ssl,            false

  set_default :current_release,       "#{deploy_to}/current"
  set_default :config_path,           "#{deploy_to}/#{shared_path}/config"
  set_default :logs_path,             "#{deploy_to}/#{shared_path}/log"

  set_default :erb_templates,         'config/mina/templates'
  set_default :tmp_path,              'tmp'
  set_default :configs_tmp_path,      "#{tmp_path}/deploy_configs"

  set_default :nginx_port,            80
  set_default :nginx_app_port,        3500
  set_default :nginx_app_config,      "/etc/nginx/sites-enabled/#{app_sys_id!}"
  set_default :nginx_app_log,         "/var/log/nginx/#{app_sys_id!}.log"
  set_default :nginx_error_app_log,   "/var/log/nginx/#{app_sys_id!}.error.log"

  set_default :express_app_log,       "#{logs_path}/production.app.log"

  set_default :upstart_app_symlink,   "#{app_sys_id!}.conf"
  set_default :upstart_app_conf,      "/etc/init/#{upstart_app_symlink}"
  set_default :upstart_app_log,       "/var/log/#{app_sys_id}.log"

  set_default :systemd_app_symlink,   "#{app_sys_id!}.service"
  set_default :systemd_app_service,   "/etc/systemd/system/#{systemd_app_symlink}"

  set_default :logrotate_path,        "/etc/logrotate.d/#{app_sys_id!}_node"

end
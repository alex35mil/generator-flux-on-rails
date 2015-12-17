require 'fileutils'

set(:config_files, %w(
  nginx.app.conf
  systemd.app.service
  upstart.app.conf
  logrotate
))

set(:symlinks, [
                 {
                     source: 'nginx.app.conf',
                     link: '{{nginx_app_config}}'
                 },
                 {
                     source: 'systemd.app.service',
                     link: '{{systemd_app_service}}'
                 },
                 {
                     source: 'upstart.app.conf',
                     link: '{{upstart_app_conf}}'
                 },
                 {
                     source: 'logrotate',
                     link: '{{logrotate_path}}'
                 },
             ]
)

namespace :env do

  task :setup => ['configs:render', 'configs:upload', 'configs:cleanup'] do

    invoke :'configs:symlink'
    invoke :'configs:load'
    invoke :'nginx:reload'
    invoke :'nginx:remove_default_vhost'

    print_status 'Done.'

  end

  task :update => ['configs:render', 'configs:upload', 'configs:cleanup'] do

    if ENV['only'] == 'nginx'
      invoke :'nginx:reload'
    # elsif ENV['only'] == 'systemd'
    #   invoke :'systemd:app:restart'
    elsif ENV['only'] == 'upstart'
      if ENV['unit'] == 'app'
        invoke :'upstart:app:stop'
        invoke :'upstart:app:start'
      # elsif ENV['unit'] == 'admin'
      #   invoke :'upstart:admin:stop'
      #   invoke :'upstart:admin:start'
      else
        invoke :'upstart:app:stop'
        invoke :'upstart:app:start'
        # invoke :'upstart:admin:stop'
        # invoke :'upstart:admin:start'
      end
    else
      invoke :'nginx:reload'
      invoke :'upstart:app:stop'
      invoke :'upstart:app:start'
      # invoke :'upstart:admin:stop'
      # invoke :'upstart:admin:start'
      # invoke :'systemd:app:restart'
    end
    print_status 'Done.'

  end

end


namespace :configs do

  task :render do
    print_status %[Rendering configs locally...]
    config_files.each do |file|
      render_config file
    end
  end

  task :upload do
    print_status %[Uploading configs to #{server} server...]
    %x[scp -r #{configs_tmp_path}/. #{user}@#{domain}:#{config_path}]
  end

  task :cleanup do
    print_status %[Cleaning up...]
    FileUtils.rm_r tmp_path
  end

  task :symlink do
    symlinks.each do |symlink|
      queue!  %[sudo ln -nfs #{config_path}/#{symlink[:source]} #{render_string symlink[:link]}]
    end
  end

  task :load do
    # uncomment this if you're using `systemd`
    # queue!  %[sudo systemctl daemon-reload]
    # queue!  %[sudo systemctl enable #{app_sys_id}]
    queue!  %[sudo initctl reload-configuration]
  end

end

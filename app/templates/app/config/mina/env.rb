require 'fileutils'

set(:config_files, %w(
  nginx.conf
  systemd.service
  upstart.conf
  logrotate
))

set(:symlinks, [
                 {
                     source: 'nginx.conf',
                     link: '{{nginx_config}}'
                 },
                 {
                     source: 'systemd.service',
                     link: '{{systemd_service}}'
                 },
                 {
                     source: 'upstart.conf',
                     link: '{{upstart_conf}}'
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
    #   invoke :'systemd:restart'
    elsif ENV['only'] == 'upstart'
      invoke :'upstart:stop'
      invoke :'upstart:start'
    else
      invoke :'nginx:reload'
      invoke :'upstart:stop'
      invoke :'upstart:start'
      # invoke :'systemd:restart'
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

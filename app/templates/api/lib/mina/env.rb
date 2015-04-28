require 'fileutils'

set(:config_files, %w(
  nginx.conf
  database.example.yml
  environment_variables.example.yml
  unicorn.rb
  unicorn_init.sh
  logrotate
))

set(:executable_config_files, %w(
  unicorn_init.sh
))

set(:symlinks, [
                 {
                     source: 'nginx.conf',
                     link: '{{nginx_config}}'
                 },
                 {
                     source: 'unicorn_init.sh',
                     link: '{{unicorn_script}}'
                 },
                 {
                     source: 'logrotate',
                     link: '{{logrotate_path}}'
                 },
             ]
)

namespace :env do

  task :setup => ['configs:render', 'configs:upload', 'configs:cleanup'] do

    invoke :'configs:chmod_x'
    invoke :'configs:symlink'
    invoke :'configs:autoload'
    invoke :'nginx:reload'
    invoke :'nginx:remove_default_vhost'

    print_status 'Done.'

  end

  task :update => ['configs:render', 'configs:upload', 'configs:cleanup'] do

    if ENV['only'] == 'nginx'
      invoke :'nginx:reload'
    elsif ENV['only'] == 'unicorn'
      invoke :'unicorn:restart'
    else
      invoke :'nginx:reload'
      invoke :'unicorn:restart'
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
    FileUtils.rm_r configs_tmp_path
  end

  task :chmod_x do
    executable_config_files.each do |file|
      queue!  %[chmod +x "#{deploy_to}/#{shared_path}/config/#{file}"]
    end
  end

  task :symlink do
    symlinks.each do |symlink|
      queue!  %[sudo ln -nfs #{config_path}/#{symlink[:source]} #{render_string symlink[:link]}]
    end
  end

  task :autoload do
    queue! %[sudo update-rc.d #{unicorn_symlink} defaults]
  end

end

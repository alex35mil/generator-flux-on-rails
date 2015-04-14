namespace :log do

  desc 'Nginx Log'
  task 'nginx' do
    lines = ENV['l'] || 20
    if ENV['only'] == 'error'
      queue!  %[sudo tail #{nginx_error_log} --lines=#{lines}]
    else
      queue!  %[sudo tail #{nginx_log} --lines=#{lines}]
    end
  end

  desc 'Express Log'
  task 'express' do
    lines = ENV['l'] || 20
    queue!  %[tail #{express_log} --lines=#{lines}]
  end

  desc 'Upstart Log'
  task 'upstart' do
    lines = ENV['l'] || 20
    queue!  %[sudo tail #{upstart_log} --lines=#{lines}]
  end

  desc 'Systemd Log'
  task 'systemd' do
    queue!  %[sudo journalctl --follow -u #{app_sys_id}]
  end

end
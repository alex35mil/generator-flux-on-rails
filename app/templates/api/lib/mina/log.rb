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

  desc 'Rails Log'
  task 'rails' do
    lines = ENV['l'] || 20
    queue!  %[tail #{logs_path}/production.log --lines=#{lines}]
  end

  desc 'Unicorn Log'
  task 'unicorn' do
    lines = ENV['l'] || 20
    queue!  %[tail #{logs_path}/unicorn.log --lines=#{lines}]
  end

end
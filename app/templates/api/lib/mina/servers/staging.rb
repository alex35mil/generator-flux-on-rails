task :staging do

  set :domain,          'ssh.your-app.com'
  set :public_domain,   'api.dev.your-app.com'
  set :app_server_name, "#{app}-#{server}"
  set :app_sys_id,      "#{app}-#{app_part}-#{server}"

end

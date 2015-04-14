task :production do

  set :domain,          'ssh.your-app.com'
  set :public_domain,   'api.your-app.com'
  set :app_server_name, "#{app}"
  set :app_sys_id,      "#{app}-#{app_part}"

end

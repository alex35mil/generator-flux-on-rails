task :production do

  set :domain,          'ssh.your-app.com'
  set :public_domain,   'your-app.com'
  set :api_domain,      "api.#{public_domain}"
  set :app_server_name, "#{app}"
  set :app_sys_id,      "#{app}-#{app_part}"

end

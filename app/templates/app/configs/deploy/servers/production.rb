task :production do

  set :domain,          'ssh.your-app.com'

  set :app_server_name, "#{app}"

  set :app_domain,      'your-app.com'
  set :app_api_domain,  "api.#{app_domain}"
  set :app_sys_id,      "#{app}-#{app_part}"

end

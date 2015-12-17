task :staging do

  set :domain,          'ssh.your-app.com'

  set :app_server_name, "#{app}-#{server}"

  set :app_domain,      'dev.your-app.com'
  set :app_api_domain,  "api.#{app_domain}"
  set :app_sys_id,      "#{app}-#{app_part}-#{server}"

end

namespace :docs do

  task :responses do
    print_stdout    %[200 :ok]
    print_stdout    %[201 :created]
    print_stdout    %[204 :no_content]
    print_stdout    %[401 :unauthorized]
    print_stdout    %[403 :forbidden]
    print_stdout    %[404 :not_found]
    print_stdout    %[422 :unprocessable_entity]
    print_stdout    %[500 :internal_server_error]
    print_stdout    %[502 :bad_gateway]
    print_stdout    %[503 :service_unavailable]
  end

  task :deploy do

    print_title     %[Add items to sudoers on #{server} server], 'remote'
    print_command   %[sudo visudo]
    print_stdout    %[]
    print_stdout    %[# Common]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/ln -nfs /home/#{user}/* /etc/nginx/sites-enabled/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/ln -nfs /home/#{user}/* /etc/init.d/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/ln -nfs /home/#{user}/* /etc/logrotate.d/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/ln -nfs /home/#{user}/* /etc/systemd/system/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/ln -nfs /home/#{user}/* /etc/init/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/bin/tail /var/log/*]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/bin/rm /etc/nginx/sites-enabled/default]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/etc/init.d/nginx reload]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/etc/sbin/service nginx reload]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/sbin/initctl reload-configuration]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/bin/systemctl daemon-reload]
    print_stdout    %[]
    print_stdout    %[# #{app_sys_id}]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/sbin/update-rc.d #{unicorn_symlink} defaults]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/etc/init.d/#{unicorn_symlink} restart]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/sbin/service #{unicorn_symlink} restart]

    print_title     %[Create project dirs on #{server} server], 'remote'
    print_command   %[sudo mkdir -p #{deploy_to}]
    print_command   %[sudo chmod 755 /home/#{user}/apps]
    print_command   %[sudo chown -R #{user}:sudo /home/#{user}/apps/#{app_server_name}]
    print_command   %[sudo chown -R #{user}:sudo #{deploy_to}]

    print_title     %[Check access to project dir on #{server} server], 'local'
    print_command   %[mina check:access]

    print_title     %[Setup project dir on #{server} server], 'local'
    print_command   %[mina setup]

    print_title     %[Setup environment configs on #{server} server], 'local'
    print_command   %[mina env:setup]

    print_title     %[Setup database on #{server} server], 'remote'
    print_command   %[sudo -u postgres psql]
    print_command   %[create user #{app_server_name.gsub('-', '_')} with password 'PASSWORD_GOES_HERE';]
    print_command   %[create database #{app_server_name.gsub('-', '_')} owner #{app_server_name.gsub('-', '_')};]
    print_command   %[\\q]

    print_title     %[Edit `database.yml` on #{server} server], 'remote'
    print_command   %[nano #{config_path}/database.example.yml]
    print_stdout    %[# And save it as `database.yml`]

    print_title     %[Deploy app on #{server} server], 'local'
    print_command   %[mina deploy]

    print_title     %[Everytime you update configs for #{server} server], 'local'
    print_command   %[mina env:update]
    print_command   %[mina env:update only=nginx]
    print_command   %[mina env:update only=unicorn]

    print_str       %[]

  end

end

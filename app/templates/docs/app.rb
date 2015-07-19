namespace :docs do

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
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/sbin/start #{app_sys_id}]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/sbin/stop #{app_sys_id}]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/sbin/restart #{app_sys_id}]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/bin/systemctl enable #{app_sys_id}]
    print_stdout    %[deployer ALL=(ALL) NOPASSWD:/usr/bin/systemctl restart #{app_sys_id}]

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

    print_title     %[Deploy app on #{server} server], 'local'
    print_command   %[mina deploy]
    print_stdout    %[# If you're deploying for the first time]
    print_stdout    %[# In `config/deploy.rb`:]
    print_stdout    %[# Change `invoke :'upstart:app:restart'` to `invoke :'upstart:app:start'`]
    print_stdout    %[# And bring it back after first deploy]

    print_title     %[Everytime you update configs for #{server} server], 'local'
    print_command   %[mina env:update]
    print_command   %[mina env:update only=nginx]
    print_command   %[mina env:update only=upstart]
    print_command   %[mina env:update only=upstart unit=app]

    print_str       %[]

  end

end

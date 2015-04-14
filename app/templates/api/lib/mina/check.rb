namespace :check do

  task :access do

    print_start %[Checking access to project dir on #{server} server...]

    if check("[ -w #{deploy_to} ]")
      print_success   %[#{app_rails} is writable on #{server} server]
    else
      print_fail      %[#{app_rails} is not writable or doesn't even exist on #{server} server]
      print_str       %[Do the following on remote:]
      print_command   %[sudo mkdir -p #{deploy_to}]
      print_command   %[sudo chmod 755 /home/#{user}/apps]
      print_command   %[sudo chown -R #{user}:sudo /home/#{user}/apps/#{app_server_name}]
      print_command   %[sudo chown -R #{user}:sudo #{deploy_to}]
      die
    end

  end


  task :revision do

    unless `git rev-parse HEAD` == `git rev-parse origin/#{branch}`

      print_error   "WARNING: HEAD is not the same as origin/#{branch}"
      print_stdout  "Run `git push` to sync changes or make sure you've"
      print_stdout  "checked out the branch: #{branch} as you can only deploy"
      print_stdout  "if you've got the target branch checked out"
      die

    end

  end


end
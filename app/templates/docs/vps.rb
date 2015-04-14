namespace :docs do

  namespace :vps do

    task :setup do
      invoke :login
    end

    task :login do
      print_start     %[Login to #{server} server]
      print_command   %[ssh #{user}@#{domain}]
    end

    # TODO: VPS setup docs

  end

end

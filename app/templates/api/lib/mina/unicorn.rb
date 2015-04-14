namespace :unicorn do

  %w(start stop force-stop restart upgrade reopen-logs).each do |action|
    desc "#{action.capitalize} Unicorn"
    task action.to_sym do
      queue!  %[sudo #{unicorn_script} #{action}]
    end
  end

end
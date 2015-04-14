namespace :upstart do

  %w(start stop reload restart status).each do |action|
    desc "#{action.capitalize} Upstart"
    task action.to_sym do
      queue!  %[sudo #{action} #{app_sys_id}]
    end
  end

end

namespace :systemd do

  %w(start stop restart).each do |action|
    desc "#{action.capitalize} Systemd"
    task action.to_sym do
      queue!  %[sudo systemctl #{action} #{app_sys_id}]
    end
  end

end

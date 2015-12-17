namespace :systemd do

  [ ['app', '{{app_sys_id}}'] ].each do |unit|

    namespace unit[0].to_sym do

      %w(start stop restart).each do |action|
        desc "#{action.capitalize} #{unit[0].capitalize} Systemd"
        task action.to_sym do
          queue!  %[sudo systemctl #{action} #{render_string unit[1]}]
        end
      end

    end

  end

end

namespace :upstart do

  [ ['app', '{{app_sys_id}}'] ].each do |unit|

    namespace unit[0].to_sym do

      %w(start stop reload restart status).each do |action|
        desc "#{action.capitalize} #{unit[0].capitalize} Upstart"
        task action.to_sym do
          queue!  %[sudo #{action} #{render_string unit[1]}]
        end
      end

    end

  end

end

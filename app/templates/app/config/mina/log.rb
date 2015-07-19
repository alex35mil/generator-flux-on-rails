namespace :log do

  namespace :nginx do

    [ ['app', '{{nginx_app_log}}', '{{nginx_error_app_log}}'] ].each do |unit|
      desc "Nginx #{unit[0].capitalize} Log"
      task unit[0].to_sym do
        lines = ENV['l'] || 20
        if ENV['only'] == 'error'
          queue!  %[sudo tail #{render_string unit[2]} --lines=#{lines}]
        else
          queue!  %[sudo tail #{render_string unit[1]} --lines=#{lines}]
        end
      end
    end

  end


  namespace :express do

    [ ['app', '{{express_app_log}}'] ].each do |unit|
      desc "Express #{unit[0].capitalize} Log"
      task unit[0].to_sym do
        lines = ENV['l'] || 20
        queue!  %[tail #{render_string unit[1]} --lines=#{lines}]
      end
    end

  end


  namespace :upstart do

    [ ['app', '{{upstart_app_log}}'] ].each do |unit|
      desc "Upstart #{unit[0].capitalize} Log"
      task unit[0].to_sym do
        lines = ENV['l'] || 20
        queue!  %[sudo tail #{render_string unit[1]} --lines=#{lines}]
      end
    end

  end


  namespace :systemd do

    [ ['app', '{{app_sys_id}}'] ].each do |unit|
      desc "Systemd #{unit[0].capitalize} Log"
      task unit[0].to_sym do
        queue!  %[sudo journalctl --follow -u #{render_string unit[1]}]
      end
    end

  end

end

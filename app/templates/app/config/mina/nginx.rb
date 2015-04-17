namespace :nginx do

  %w(stop start restart reload status).each do |action|
    desc "#{action.capitalize} Nginx"
    task action.to_sym do
      queue!  %[sudo /etc/init.d/nginx #{action}]
    end
  end

  desc 'Remove default Nginx Virtual host'
  task 'remove_default_vhost' do
    if check("[ -f /etc/nginx/sites-enabled/default ]")
      queue!          %[sudo rm /etc/nginx/sites-enabled/default]
      print_success   %[Removed default Nginx Virtual host]
    end

  end

end
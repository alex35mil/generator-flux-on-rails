task :setup do

  # Creating config folder on server...
  queue!  %[mkdir -p "#{config_path}"]
  queue!  %[chmod g+rx,u+rwx "#{config_path}"]

  # Creating log folder on server...
  queue!  %[mkdir -p "#{logs_path}"]
  queue!  %[chmod g+rx,u+rwx "#{logs_path}"]

  queue!  %[touch "#{express_app_log}"]

end

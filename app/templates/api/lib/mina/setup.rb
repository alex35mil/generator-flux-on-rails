task :setup => :environment do

  # Creating config folder on server...
  queue!  %[mkdir -p "#{config_path}"]
  queue!  %[chmod g+rx,u+rwx "#{config_path}"]

  # Creating log folder on server...
  queue!  %[mkdir -p "#{logs_path}"]
  queue!  %[chmod g+rx,u+rwx "#{logs_path}"]

  # Creating pids folder on server...
  queue!  %[mkdir -p "#{pids_path}"]
  queue!  %[chmod g+rx,u+rwx "#{pids_path}"]

  # Creating sockets folder on server...
  queue!  %[mkdir -p "#{sockets_path}"]
  queue!  %[chmod g+rx,u+rwx "#{sockets_path}"]

end

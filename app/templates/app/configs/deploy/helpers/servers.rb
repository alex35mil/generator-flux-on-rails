def all_servers
  Dir['configs/deploy/servers/*.rb'].reduce([]) do |servers, file|
    servers << File.basename(file, '.rb')
  end
end

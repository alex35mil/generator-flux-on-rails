def all_servers
  Dir['lib/mina/servers/*.rb'].reduce([]) do |servers, file|
    servers << File.basename(file, '.rb')
  end
end

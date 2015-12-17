def print_start(msg)
  print_stdout color("[START]: #{msg}", 33)
end

def print_success(msg)
  print_status color("[#{status_success}]: #{msg}", 32)
end

def print_fail(msg)
  print_error "[#{status_fail}]: #{msg}"
end

def print_title(title, location)
  server = location == 'remote' ? '[REMOTE]' : '[LOCAL]'
  print_str     "\n"
  print_status  "#{server}: #{title}"
end

def status_success
  'SUCCESS'
end

def status_fail
  'FAILED'
end

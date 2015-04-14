def check(condition)
  !capture("if #{condition} ; then echo '#{status_success}' ; fi").empty?
end

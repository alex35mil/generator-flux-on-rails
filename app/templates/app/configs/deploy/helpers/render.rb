require 'fileutils'

def render_config(from, to = nil)

  to ||= from
  src  = "#{erb_templates}/#{from}.erb"
  dest = "#{configs_tmp_path}/#{to}"

  if File.exist?(src)

    render = erb(src)

    FileUtils.mkdir_p(configs_tmp_path)

    file = File.new(dest, 'w')
    file.write(render)
    file.close

  else

    print_fail %[#{from} not found]

  end

end

def render_string(inp)
  str = inp
  inp.scan(/{{(\w*)}}/).each do |var|
    str.gsub!("{{#{var[0]}}}", fetch(var[0].to_sym))
  end
  str
end

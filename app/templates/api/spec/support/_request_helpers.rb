module Requests

  module JsonHelpers
    def json
      @json ||= JSON.parse(response.body, symbolize_names: true)
    end
  end

  module URIHelpers
    def public_url(path = nil)
      "http://api.lvh.me#{path}"
    end
  end

  module RequestHelpers

    def get!(url, params)
      get url, nil, params
    end
    def post!(url, data, params)
      post url, data.to_json, params
    end
    def patch!(url, data, params)
      patch url, data.to_json, params
    end
    def delete!(url, params)
      delete url, nil, params
    end

    def headers(api_version = 1)
      {
          'Accept'        => "application/vnd.<%= name %>.v#{api_version}+json",
          'Content-Type'  => 'application/json'
      }
    end
    def auth_headers(user, api_version = 1)
      headers(api_version).merge({
        'X-User-Email' => user.email,
        'X-User-Token' => user.authentication_token
      })
    end
    def bad_auth_headers(user, api_version = 1)
      headers = auth_headers(user, api_version)
      headers['X-User-Token'].upcase!
      headers
    end

  end

end

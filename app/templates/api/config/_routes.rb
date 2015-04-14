require 'api_constraints'

Rails.application.routes.draw do

  # route to CORS preflight checker
  # match '*all', to: 'application#cors_preflight_check', via: :options

  namespace :api, defaults: { format: :json }, constraints: { subdomain: 'api' }, path: '/' do

    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      get '/component', to: 'components#hello'
    end

  end

end

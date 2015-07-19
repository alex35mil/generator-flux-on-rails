require 'api_constraints'

Rails.application.routes.draw do

  # route to CORS preflight checker
  # match '*all', to: 'application#cors_preflight_check', via: :options

  get '/auth/preflight', to: 'application#auth_preflight'

  namespace :api, defaults: { format: :json }, constraints: { subdomain: 'api' }, path: '/' do

    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do

      devise_for :users, skip: :all
      devise_scope :api_user do
        post    '/signup',  to: 'registrations#create'
        post    '/login',   to: 'sessions#create'
        delete  '/logout',  to: 'sessions#destroy'
      end

      get '/dummy', to: 'dummy#hello'

    end

  end

end

class ApplicationController < ActionController::API

  include ActionController::ImplicitRender

  acts_as_token_authentication_handler_for User, fallback_to_devise: false
  before_action :authenticate_api_user!

  respond_to :json


  def auth_preflight
    head 200
  end


  ### CORS Headers

  # before_action :set_origin
  # before_action :set_headers

  # def cors_preflight_check
  #   if request.method == :options
  #     headers['Access-Control-Allow-Origin'] = '*'
  #     headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  #     headers['Access-Control-Allow-Headers'] = 'Content-Type'
  #     render text: '', content_type: 'text/plain'
  #   end
  # end

  private

    # def set_origin
    #   @origin = request.headers['HTTP_ORIGIN']
    # end
    #
    # def set_headers
    #
    #   if @origin
    #     allowed = ['lvh.me:3500', 'localhost:3500', 'your.domain.com']
    #     allowed.each do |host|
    #       if @origin.match /^https?:\/\/#{Regexp.escape(host)}/i
    #         headers['Access-Control-Allow-Origin'] = @origin
    #         break
    #       end
    #     end
    #     # or '*' for public access
    #     # headers['Access-Control-Allow-Origin'] = '*'
    #     headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE'
    #     headers['Access-Control-Request-Method'] = '*'
    #     headers['Access-Control-Allow-Headers'] = 'Content-Type'
    #   end
    #
    # end

end

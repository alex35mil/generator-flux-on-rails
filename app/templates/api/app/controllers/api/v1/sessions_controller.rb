class Api::V1::SessionsController < Devise::SessionsController

  include ActionController::ImplicitRender

  respond_to :json

end
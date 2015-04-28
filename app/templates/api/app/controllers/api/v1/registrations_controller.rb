class Api::V1::RegistrationsController < Devise::RegistrationsController

  include ActionController::ImplicitRender

  respond_to :json

end
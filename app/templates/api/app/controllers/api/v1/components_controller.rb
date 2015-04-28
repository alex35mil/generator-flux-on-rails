class Api::V1::ComponentsController < ApplicationController

  skip_before_action :authenticate_api_user!, only: [ :hello ]

  def hello
    render json: { say: 'Hi!' }
  end

end
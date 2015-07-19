class Api::V1::DummyController < ApplicationController

  skip_before_action :authenticate_api_user!, only: [ :hello ]

  def hello
    @user = current_api_user ? 'User' : 'Guest'
    render json: { say: "Hi, #{@user}!" }
  end

end

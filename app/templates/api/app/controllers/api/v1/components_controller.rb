class Api::V1::ComponentsController < ApplicationController

  def hello
    render json: { say: 'Hello, world!' }
  end

end
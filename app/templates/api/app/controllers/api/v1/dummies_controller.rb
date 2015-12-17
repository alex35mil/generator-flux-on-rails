class Api::V1::DummiesController < ApplicationController

  skip_before_action :authenticate_api_user!, only: [ :index ]

  def index
    @person = current_api_user ? '🎉 User' : '🙈 Guest'
    @dummies = [1, 2, 3].map do |id|
      {
        id: id,
        card: "#{@person} card ##{id}"
      }
    end

    sleep 1
    render json: { dummies: @dummies }
  end

end

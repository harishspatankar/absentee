class ApplicationController < ActionController::API
  # before_action :authenticate_user!
  X_API_KEY = 'X-API-KEY'

  def jwt_payload
    @jwt_payload ||= JWT.decode(request.headers[X_API_KEY], JWT_SECRET)
  end

  def current_user
    @current_user ||= User.where(mobile_number: jwt_payload.first["mobile_number"]).first
  end
end

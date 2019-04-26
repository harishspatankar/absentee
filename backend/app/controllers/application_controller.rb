class ApplicationController < ActionController::API
  before_action :authenticate!

  X_API_KEY = 'X-API-KEY'
  AUTHORIZATION = 'Authorization'

  def jwt_payload
    @jwt_payload ||= JWT.decode(request.headers[X_API_KEY], JWT_SECRET)
  end

  def current_user
    @current_user ||= User.where(mobile_number: jwt_payload.first["mobile_number"]).first
  end

  def auth_token
    @auth_token ||= request.headers[AUTHORIZATION]
  end

  def authenticate!
    (token_invalid and return) unless current_user&.authorize_token?(auth_token)

    rescue NameError
      invalid_token and return
  end

  def invalid_token
    render json: { message: "Invalid authentication token"}, status: :unauthorized
  end
end

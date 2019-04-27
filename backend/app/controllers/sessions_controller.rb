class SessionsController < ApplicationController
  # skip_before_action :validate_jwt_token!, only: [:create]
  skip_before_action :authenticate!, only: [:create ]

  def create
    head :bad_request and return false unless params[:user].present?
    user = User.where(mobile_number: params[:user][:mobile_number]).first
    if user && user.valid_password?(params[:user][:password])
      user.generate_and_set_token
      render json: {messasge: "Signed in successful", user: user.as_json(methods: [:api_key, :roles, :school])}
    else
      render json: { message: "Authentication failed" }, status: :unauthorized
    end
  end

  def destroy
    current_user.auth_token = nil
    if current_user.save
      render json: { message: "Signed out successfully." }
    else
      render json: { message: "Failed to sign out." }, status: :unauthorized
    end
  end

  private

  def validate_jwt_token!
    jwt_payload
  rescue JWT::DecodeError
    head :unauthorized
    return false
  end

  def jwt_payload
    @jwt_payload ||= JWT.decode(request.headers[X_API_KEY], JWT_SECRET)
  end
end

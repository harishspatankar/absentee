class RolesController < ApplicationController
  #before_action :authenticate_user!
  before_action :find_role, only: [:show, :edit, :destroy, :update]

  def index
    render json: Role.all.select(:id, :title)
  end

  def create
    role = Role.new(role_params)
    if role.save
      render json: {message: "Role created successfully"}, status: 201
    else
      render json: role.errors.messages, status: 422
    end
  end

  def update
    role = Role.find params[:id]
    role.attribues = role_params
    if role.save
      render json: {message: "Role updated successfully"}, status: 201
    else
      render json: role.errors.messages, status: 422
    end
  end

  private

  def find_role
    Role.find(params[:id]).select(:id, :title)
  end

  def role_params
    params.require(:role).permit!
  end
end

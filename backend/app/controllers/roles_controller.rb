class RolesController < ApplicationController
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
    @role.attribues = role_params
    if @role.save
      render json: {message: "Role updated successfully"}, status: 201
    else
      render json: @role.errors.messages, status: 422
    end
  end

  def destroy
    # TODO add role.destroy code as per school
    # NOT as of now as we have generic roles of system
    render json: {message: "Invalid action"}, status: 401
  end

  private

  def find_role
    @role = Role.where(params[:id]).first
    render json: {message: "Role not found"}, status: 404 unless @role
    @role.select(:id, :title)
  end

  def role_params
    params.require(:role).permit!
  end
end

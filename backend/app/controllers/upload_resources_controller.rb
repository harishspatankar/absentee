class UploadResourcesController < ApplicationController
  #before_action :authenticate_user!
  before_action :find_resource, only: [:destroy]

  def index
    render json: UploadResource.all.as_json
  end

  def create
    upload_resource = UploadResource.new(upload_resource_params)
    if upload_resource.save
      render json: {message: "Upload job created successfully."}, status: 201
    else
      render json: upload_resource.errors.messages, status: 422
    end
  end

  def destroy
    if @resource.destroy
      render json: {message: "Upload job deleted successfully."}
    else
      render json: @resource.errors.messages, status: 422
    end
  end
  private

  def find_resource
    @resource = UploadResource.find(params[:id])
  end

  def upload_resource_params
    params.require(:upload_resource).permit(:file, :log_file, :resource_type)
  end
end

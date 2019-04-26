class ClassroomsController < ApplicationController
  #before_action :authenticate_user!
  before_action :find_classroom, only: [:show, :edit, :destroy, :update]

  def index
    render json: Classroom.all.as_json
  end

  def create
    classroom = Classroom.new(classroom_params)
    if classroom.save
      render json: {message: "Class created successfully"}, status: 201
    else
      render json: classroom.errors.messages, status: 422
    end
  end

  def update
    classroom = classroom.find params[:id]
    classroom.attribues = classroom_params
    if classroom.save
      render json: {message: "Class updated successfully"}, status: 201
    else
      render json: classroom.errors.messages, status: 422
    end
  end

  private

  def find_classroom
    Classroom.find(params[:id])
  end

  def classroom_params
    params.require(:classroom).permit(:title, :start_time, :end_time,:standard, :division )
  end
end

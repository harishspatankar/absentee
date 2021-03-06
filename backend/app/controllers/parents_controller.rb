class ParentsController < ApplicationController
  before_action :set_student
  before_action :find_parent, only: [:show, :edit, :destroy, :update]

  def show
    render json: @student.parents
  end

  def create
    parent = Parent.new(parent_params)
    if parent.save
      render json: {message: "Parent created successfully"}, status: 201
    else
      render json: parent.errors.messages, status: 422
    end
  end

  def update
    @parent.attribues = parent_params
    if @parent.save
      render json: {message: "Parent created successfully"}, status: 201
    else
      render json: @parent.errors.messages, status: 422
    end
  end

  def destroy
    if @parent.destroy
      render json: {message: "Parent deleted successfully"}, status: 201
    else
      render json: @parent.errors.messages, status: 422
    end
  end

  private

  def find_parent
    @parent = Parent.where(id: params[:id]).first
    render json: {message: "Parent not found"}, status: 404 unless @parent
  end

  def set_student
    @student = Student.where(id: params[:student_id])
  end

  def parent_params
    params.require(:parent).permit!
  end
end

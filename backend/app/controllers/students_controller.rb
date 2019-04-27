class StudentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_class
  before_action :find_class_student, only: [:show, :edit, :destroy, :update]

  def index
    classroom = Classroom.find(params[:classroom_id])
    students = classroom.students
    render json: students
  end

  def show
    render json: @student
  end

  def create
    student = @class.students.new(student_params)
    if student.save
      render json: {message: "Student created successfully"}, status: 201
    else
      render json: @student.errors.messages, status: 422
    end
  end

  def update
    if @student.update(student_params)
      render json: {message: "Student updated successfully"}, status: 201
    else
      render json: @student.errors.messages, status: 422
    end
  end

  def destroy
    if @student.destroy
      render json: {message: "Student deleted successfully"}, status: 201
    else
      render json: @student.errors.messages, status: 422
    end
  end

  private

  def student_params
    params.permit(:roll_number, :first_name, :middle_name, :last_name, :gender, :date_of_birth, :blood_group)
  end

  def set_class
    @class = Classroom.find(params[:classroom_id])
  end

  def find_class_student
    @student = @class.students.find_by!(id: params[:id])
    render json: {message: "Student not found"}, status: 404 unless @student.present?
  end
end

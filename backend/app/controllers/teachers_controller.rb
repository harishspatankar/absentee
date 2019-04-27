class TeachersController < ApplicationController

  before_action :find_school_teachers, only: [:show, :edit, :destroy, :update, :mark_attendance]

  def index
    render json: current_school.teachers
  end

  def show
    render json: @teacher
  end

  def create
    teacher = Teacher.new(teacher_params)
    if teacher.save
      render json: {message: "Teacher created successfully"}, status: 201
    else
      render json: teacher.errors.messages, status: 422
    end
  end

  def update
    if @teacher.update(teacher_params)
      render json: {message: "Teacher updated successfully"}, status: 201
    else
      render json: @teacher.errors.messages, status: 422
    end
  end

  def destroy
    if @teacher.destroy
      render json: {message: "Teacher updated successfully"}, status: 201
    else
      render json: @teacher.errors.messages, status: 422
    end
  end

  def mark_attendance
    # teacher = Teacher.find params[:id]
    student = Student.find params[:student_id]
    render json: {message: "Student not found"}, status: 404 unless student.present?

    attendance = Attendance.find_or_initialize_by(
      teacher_id: @teacher.id,
      student_id: student.id,
      date: Date.today
    )

    if attendance.update_attribute(is_present: params[:is_present])
      render json: {}, status: 200
    else
      render json: {message: "Failed to mark attendance for student #{student.first_name}"}, status: 422
    end
  end

  private

  def teacher_params
  end

  def find_school_teacher
    @teacher = current_school.teachers.find_by(id: params[:id]) if current_school.present?
    render json: {message: "Teacher not found"}, status: 404 unless @teacher.present?
  end
end

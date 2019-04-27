class ClassroomsController < ApplicationController
  #before_action :authenticate_user!
  before_action :find_classroom, only: [:show, :edit, :destroy, :update, :mark_attendance_done]

  def index
    render json: current_school.classrooms.as_json(methods: [:total_present_count, :total_students_count, :failed_sms_count])
  end

  def create
    classroom = Classroom.new(classroom_params)
    if classroom.save
      render json: {message: "Class created successfully"}, status: 201
    else
      render json: classroom.errors.messages, status: 422
    end
  end

  def show
    render json: @classroom.as_json
  end

  def mark_attendance_done
    # classroom = Classroom.find params[:id]
    absent_students = @classroom.present_students.rewhere(is_present: false)
    absent_students.each {|student| SmsNotifierJob.set(wait: 1).perform(student, student.parent.pluck(:primary_contact))}
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
    @classroom = Classroom.find(params[:id])
  end

  def classroom_params
    params.require(:classroom).permit(:title, :start_time, :end_time,:standard, :divison, :class_teacher_id, :school_id)
  end
end

class Attendances_controller < ApplicationController

  def attendance_for_classroom
    present_count = 0
    absent_count = 0
    attendance = Attendance.where(classroom_id: 1)
    attendance.each do |a|
      a.is_present? ? present_count += 1 : absent_count += 1
    end
    render json: { "present_count" => present_count, "absent_count" => absent_count }.as_json
  end

  def attendance_for_student
    present_count = 0
    absent_count = 0
    attendance = Attendance.where(student_id: 1)
    attendance.each do |a|
      a.is_present? ? present_count += 1 : absent_count += 1
    end
    render json: { "present_count" => present_count, "absent_count" => absent_count }.as_json
  end

  def attendance_for_school

    Attendance.where(classroom_id: params[:id])
  end

end

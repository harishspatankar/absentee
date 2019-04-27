class Classroom < ApplicationRecord
  validates :standard, :start_time, :end_time, presence: true
  validate :start_time_cannot_be_greater_than_end_time

  has_many :students
  has_many   :attendances
  has_and_belongs_to_many :teachers, join_table: 'classroom_teachers'

  def start_time_cannot_be_greater_than_end_time
    if start_time >= end_time
      errors.add(:start_time, "cannot be greater than end time.")
    end
  end

  def present_students
    Attendance.where(
      student_id: students.pluck(:id),
      date: Date.today,
      is_present: true
    )
  end

  def total_present_count
    present_students.count
  end

  def failed_sms_count
    absentee_list = present_students.rewhere(is_present: false)

    DeliveryStatus.where(
      attendance_id: absentee_list,
      sms_delivered_at_primary: nil,
      sms_delivered_at_secondary: nil
    ).count
  end

  def total_students_count
    students.count
  end
end

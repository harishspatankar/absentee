class Classroom < ApplicationRecord
  validates :standard, :start_time, :end_time, presence: true
  validate :start_time_cannot_be_greater_than_end_time

  has_many :students
  has_many   :attendances

  def start_time_cannot_be_greater_than_end_time
    if start_time >= end_time
      errors.add(:start_time, "cannot be greater than end time.")
    end
  end
end

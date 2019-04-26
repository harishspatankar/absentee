class Classroom < ApplicationRecord
  validates :standard, :start_time, :end_time, presence: true
end

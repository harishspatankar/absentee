class Attendance < ApplicationRecord

  belongs_to :student
  belongs_to :teacher

  def update_delivery_status(status)

  end
end

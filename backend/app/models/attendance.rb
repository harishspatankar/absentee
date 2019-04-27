class Attendance < ApplicationRecord

  belongs_to :student
  belongs_to :teacher
  belongs_to :classroom
  has_one :delivery_status

  def update_delivery_status(status)

  end
end

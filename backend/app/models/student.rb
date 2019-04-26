class Student < ApplicationRecord
  validates :roll_number, :first_name, :middle_name, :last_name, :gender, :date_of_birth, presence: true

  belongs_to :parent
  belongs_to :class_room
  has_many   :attendances
end

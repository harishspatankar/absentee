class Student < ApplicationRecord
  validates :roll_number, :first_name, :middle_name, :last_name, :gender, :date_of_birth, presence: true

  belongs_to :parent
  has_many   :attendances
  belongs_to :classroom
  has_many :attendances

  # accepts_nested_attributes_for :address
end

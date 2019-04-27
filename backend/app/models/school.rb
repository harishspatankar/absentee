class School < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true

  has_one :address
  has_many :teachers
  has_many :classrooms

  accepts_nested_attributes_for :address
end

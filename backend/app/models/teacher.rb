class Teacher < ApplicationRecord
  validates :name, :mobile, :gender, presence: true

  has_one    :address
  belongs_to :school
  has_many :attendances

  accepts_nested_attributes_for :address
end

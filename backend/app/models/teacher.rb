class Teacher < ApplicationRecord
  validates :name, :mobile, :gender, presence: true

  has_one    :address
  belongs_to :school
end

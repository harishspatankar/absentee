class School < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true

  has_one :address
  
  accepts_nested_attributes_for :address
end

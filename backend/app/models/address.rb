class Address < ApplicationRecord

  belongs_to :resource, polymorphic: true

  validates :line_1, :city, :state, :pincode, presence: true
end

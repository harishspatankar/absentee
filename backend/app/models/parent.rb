class Parent < ApplicationRecord

  validates :father_name, :mother_name, :primary_contact, presence: true

end

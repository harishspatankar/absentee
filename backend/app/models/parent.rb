class Parent < ApplicationRecord

  validates :father_name, :mother_name, :primary_contact, presence: true

  has_many :students
  has_one  :address, as: :resource
  has_and_belongs_to_many :students, join_table: 'parent_students'

  accepts_nested_attributes_for :address

  def as_json(options={})
    json_to_return = super(only: [:id, :father_name, :mother_name, :guardian_name,
      :primary_contact, :secondary_contact, :email])
    json_to_return
  end

  def permenant_address_data
    self.addresses.where(address_type: Address::TYPES[1]).first
  end

  def current_address_data
    self.addresses.where(address_type: Address::TYPES[0]).first
  end
end

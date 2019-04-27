class Parent < ApplicationRecord

  validates :father_name, :mother_name, :primary_contact, presence: true

  has_many :students
  has_many :addresses, as: :resource

  def as_json(options={})
    json_to_return = super(only: [:id, :father_name, :mother_name, :guardian_name,
      :primary_contact, :secondary_contact, :email])
    json_to_return[:permenant_address] = permenant_address_data.as_json
    json_to_return[:current_address] = current_address_data.as_json
    json_to_return
  end

  def permenant_address_data
    self.addresses.where(address_type: Address::TYPES[1]).first
  end

  def current_address_data
    self.addresses.where(address_type: Address::TYPES[0]).first
  end
end

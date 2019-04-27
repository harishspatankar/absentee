class Student < ApplicationRecord
  validates :roll_number, :first_name, :middle_name, :last_name, :gender, :date_of_birth, presence: true

  has_and_belongs_to_many :parent, join_table: 'parent_students'
  has_many   :attendances
  belongs_to :classroom
  has_many :attendances
  has_one :address, as: :resource

  # accepts_nested_attributes_for :address

  def as_json(options={})
    json_to_return = super(only: [:id, :roll_number, :first_name, :middle_name,
      :last_name, :gender, :date_of_birth, :blood_group, :photo])
    json_to_return["classroom_details"] = get_classroom_details.as_json
    json_to_return
  end

  def get_classroom_details
    self.classroom
  end
end

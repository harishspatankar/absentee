class Student < ApplicationRecord
  validates :roll_number, :first_name, :middle_name, :last_name, :gender, :date_of_birth, presence: true

  has_and_belongs_to_many :parent, join_table: 'parent_students'
  has_many   :attendances
  belongs_to :classroom
  has_many :attendances
  has_one :address, as: :resource

  accepts_nested_attributes_for :address

  def as_json(options={})
    json_to_return = super(only: [:id, :roll_number, :first_name, :middle_name,
      :last_name, :gender, :date_of_birth, :blood_group, :photo])
    attendance = options[:students_attendance].find {|attendance| attendance["student_id"] == self.id }
    json_to_return.merge!({is_present: attendance.present? ? attendance["is_present"] : true})
    json_to_return
  end
end

class Teacher < ApplicationRecord
  validates :name, :mobile, :gender, presence: true

  has_one    :address, as: :resource
  belongs_to :school
  has_many   :attendances
  has_and_belongs_to_many :classroom, join_table: 'classroom_teachers'

  accepts_nested_attributes_for :address

  def as_json(options={})
    json_to_return = super(only: [:id, :name, :email, :mobile,
      :gender, :qualification])
    json_to_return["classroom"] = get_classrooms.as_json
    json_to_return["address"] = get_address.as_json
    json_to_return["role"] = get_roles.as_json
    json_to_return
  end

  def get_address
    self.address
  end

  def get_roles
    Role.find(Teacher.last.role_id)
  end

  def get_classrooms
    self.classroom.select(:id, :standard, :divison)
  end

  def role_data
    Role.where(id: self.role_id).select(:id, :title)
  end
end

class Teacher < ApplicationRecord
  validates :name, :mobile, :gender, presence: true

  has_one    :address, as: :resource
  belongs_to :school
  has_many   :attendances

  accepts_nested_attributes_for :address

  def as_json(options={})
    json_to_return = super(only: [:id, :name, :email, :mobile,
      :gender, :qualification])
    json_to_return
  end

  def role_data
    Role.where(id: self.role_id).select(:id, :title)
  end
end

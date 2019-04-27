class Address < ApplicationRecord
  TYPES = %w{current permanent}

  belongs_to :resource, polymorphic: true

  validates :line_1, :city, :state, :pincode, :address_type, presence: true
  validates :pincode, numericality: { only_integer: true }

  def as_json(options = {})
    super(only: [:id, :line_1, :line_2, :area, :landmark, :city, :state,
      :pincode, :resource_id, :resource_type, :address_type]
    )
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :mobile_number, uniqueness: true
  validates :mobile_number, presence: true
  validates :mobile_number, format: { with: /\A[6789]\d{9}\z/, message: "Not a valid mobile no" }

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def api_key
    JWT.encode({mobile_number: mobile_number}, JWT_SECRET)
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :mobile_number, uniqueness: true
  validates :mobile_number, presence: true
  validates :mobile_number, format: { with: /\A[6789]\d{9}\z/, message: "Not a valid mobile no" }

  scope :syste_admin_user,  -> { where(role_id: Role.where(title: 'Super Admin').first.id).first }

  belongs_to :resource, polymorphic: true, required: false


  def email_required?
    false
  end

  def email_changed?
    false
  end

  def teacher?
    resource_type == "Teacher"
  end

  def roles
    ["SuperAdmin"]
  end

  def school
    resource.school  if teacher?
  end


  def api_key
    JWT.encode({mobile_number: mobile_number}, JWT_SECRET)
  end

  def generate_and_set_token
    self.auth_token = generate_token
    self.save
  end

  def generate_token
    loop do
      random_token = SecureRandom.urlsafe_base64(24, false)
      break random_token unless User.where(auth_token: random_token).exists?
    end
  end

  def authorize_token?(token)
    token && self.auth_token.present?
  end
end

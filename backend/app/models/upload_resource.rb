class UploadResource < ApplicationRecord

  validates :file, :resource_type, presence: true
  has_one_attached :file
  has_one_attached :log_file

end

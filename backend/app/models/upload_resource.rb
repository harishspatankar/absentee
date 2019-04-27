class UploadResource < ApplicationRecord
  validates :file, :resource_type, presence: true
end

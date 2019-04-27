class UploadResourceObserver < ActiveRecord::Observer

  def after_create(upload_resource)
    UploadProcessJob.new(upload_resource.id).perform_now
  end

end

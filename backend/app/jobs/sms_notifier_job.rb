class SmsNotifierJob < ApplicationJob
  # include Sidekiq::Worker
  include ActiveJobRetryControlable
  queue_as :default
  # after_perform { |job| p "=======================${$statsd}" }
  retry_limit 5
  # retry_on Textlocal::DeliveryFailed # defaults to 3s wait, 5 attempts
  discard_on ActiveJob::DeserializationError

  rescue_from(Textlocal::DeliveryFailed) do |exception|
    raise "Retry limit reached" and return if retry_limit_exceeded?
    p retry_job
  end

  def perform(msg, numbers, attendance)
    sms = Textlocal::SMS.new(msg, numbers)
    sms.deliver!
    if sms.result['status'] == 'failure'
      raise Textlocal::DeliveryFailed
      # attendance.update_delivery_status('failed')
    elsif sms.result['status'] == 'success'
      attendance.update_delivery_status('success')
    end
  end
end

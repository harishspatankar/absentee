class SmsNotifierJob < ApplicationJob
  queue_as :default
  # after_perform { |job| p "=======================${$statsd}" }

  retry_on Textlocal::DeliveryFailed # defaults to 3s wait, 5 attempts
  discard_on ActiveJob::DeserializationError

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

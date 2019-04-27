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
    retry_job
  end

  def perform(student, numbers)
    todays_attendance = Attendance.where(
      date: Date.today,
      student_id: student.id,
      classroom_id: student.classroom.id
    ).last

    if todays_attendance.present? && !todays_attendance.is_present
      msg = "Your child #{student.first_name} is absent today as per attendance marked by teacher."
      sms = Textlocal::SMS.new(msg, numbers, todays_attendance.id)
      sms.deliver!
      if sms.result['status'] == 'failure'
        raise Textlocal::DeliveryFailed
        # attendance.update_delivery_status('failed')
      elsif sms.result['status'] == 'success'
        DeliveryStatus.create(sms_sent_at_primary: true, attendance_id: todays_attendance.id)
        # attendance.update_delivery_status('success')
      end
    end
  end
end

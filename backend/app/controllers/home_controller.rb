class HomeController < ApplicationController

=begin
<ActionController::Parameters
  {"sender"=>"919011996612", "content"=>"H9G3F 9-A-220-Absent 6-B-18-Present",
  "inNumber"=>"919220592205", "submit"=>"Submit", "network"=>"", "email"=>"none",
  "keyword"=>"H9G3F", "comments"=>"9-A-220-Absent 6-B-18-Present", "credits"=>"8",
  "msgId"=>"5444833038", "rcvd"=>"2019-04-27 16:55:53", "firstname"=>"", "lastname"=>"",
  "custom1"=>"", "custom2"=>"", "custom3"=>"", "controller"=>"home", "action"=>"sms_response"}
  permitted: false>
=end
  def sms_response
    content   = params[:content]
    sender_no = params[:sender_no]
    sender_no = sender_no.length == 12 ? sender_no[2..-1] : sender_no
    reporter  = User.where(mobile_number: sender_no).first
    if reporter && reporter.resource_type == 'Teacher'
      status  = content.split(' ')[1..-1]
      status.each do |stats|
        process_sms_stats(stats, reporter)
      end
    end
  end

  def process_sms_stats(stats, reporter)
    standard, div, roll_no, presence_status = stats.split('-')
    school    = reporter.resource.school
    classroom = school.classrooms.where(standard: standard, divison: div).first
    student   = classroom.students.where(roll_number: roll_no).first
    if classroom && student
      attendance = Attendance.where(
        teacher_id:   reporter.id,
        student_id:   student.id,
        classroom_id: student.classroom_id,
        date:         Date.today
      ).first
      if (attendance && attendance.is_present) || attendance.blank?
        attendance = Attendance.create(
          teacher_id:   reporter.id,
          student_id:   student.id,
          classroom_id: student.classroom_id,
          date:         Date.today
          is_present:   presence_status == 'Present'
        )

        SmsNotifierJob.set(wait: 3).perform_later(student, student.parent.pluck(:primary_contact).last)
      end
    end
  end
end

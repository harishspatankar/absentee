require 'csv'
class UploadProcessJob < ApplicationJob
  include Rails.application.routes.url_helpers

  queue_as :default

  attr_accessor :data, :file, :upload_type
  attr_reader   :csv_data, :upload_type, :valid_headers, :upload, :current_time

  def perform(upload_id)
    @upload       = UploadResource.find upload_id
    file_path     = ActiveStorage::Blob.service.send(:path_for, upload.file.key)
    @csv_data     = read_csv_data(file_path)
    @upload_type  = upload.resource_type.downcase.pluralize
    @current_time = Time.now.strftime('%d-%b-%Y')
    @valid_headers = valid_headers
    if check_for_errors
      # update record as invalid
    else
      send "process_#{upload_type}_upload"
      attach_log_to_record
    end
  end

  def attach_log_to_record

    # delete log file if already has log file
    if upload.log_file.present?
      record = ActiveStorage::Blob.where(id: upload.log_file.record.id).first
      if record
        record.purge_later
        upload.save
      end
    end
    #upload.log_file = File.open(log_file_path)
    upload.log_file.attach(io: File.open(log_file_path), filename: "#{log_filename}.csv")
    upload.save
  end

  def read_csv_data(file_path)
    CSV.read(file_path, headers: true, col_sep: ",")
  end

  def check_for_errors
    available_headers = csv_data[0].headers
    missing_headers   = valid_headers - available_headers
    if available_headers.empty? || !missing_headers.empty?
      write_error_log(missing_headers, available_headers)
      return true
    end
    false
  end

  def write_error_log(missing_headers, available_headers)
    CSV.open(log_file_path, 'w') do |csv|
      if available_headers.empty?
        csv << ["Empty File. Valid headers are #{valid_headers.join(',')}"]
      elsif !missing_headers.empty?
        csv << ["Invalid File. Invalid Headers provided. (Missing Headers are = #{@missing_headers.join(',')}"]
      end
    end
  end

  def valid_headers
    headers = case upload_type
    when 'roles'
      ['Name']
    when 'schools'
      ['Name', 'Contact Numbers', 'Email', 'Helpline Contact']
    when 'teachers'
      ['Name', 'Email', 'Mobile', 'Gender', 'Qualification', 'Role', 'School Name']
    when 'classrooms'
      ['Title', 'Standard', 'Divison', 'Start Time', 'End Time', 'Class Teacher Contact']
    end
    headers
  end

  def log_filename
    file_name = File.basename(@upload.file.key, '.*')
    "#{file_name}-log-#{current_time}"
  end

  def log_file_path
    @log_file_path ||=
      begin
        Rails.root.join("public/uploads/#{log_filename}.csv").to_s
      end
  end

  def write_log(csv_data)
    CSV.open(log_file_path, 'wb') do |csv|
      headers = csv_data[0].headers
      csv     << headers
      csv_data.each do |row|
        csv << headers.collect{|i| row[i]}
      end
    end
  end

  def process_roles_upload
    csv_data.each_with_index do |row, index|
      role = Role.new(title: row['Name'])
      row << {'Status' => role.save ? 'Success' : role.errors.messages}
    end
    write_log(csv_data)
  end

  def process_schools_upload
    csv_data.each_with_index do |row, index|
      school = School.new(name: row['Name'], contact_numbers: row['Contact Numbers'],
        email: row['Email'], helpline_contact: row['Helpline Contact'])
      row << {'Status' => school.save ? 'Success' : school.errors.messages}
    end
    write_log(csv_data)
  end

  def process_teachers_upload
    csv_data.each_with_index do |row, index|
      role    = Role.where(title: row['Role']).first
      school  = School.where(name: row['School Name']).first
      msg     = ""
      teacher = Teacher.new(name: row['Name'], email: row['Email'],
        mobile:  row['Mobile'], gender: row['Gender'], role_id: role,
        qualification: row['Qualification'], school_id: school.id
      )
      if role.blank? || school.blank?
        msg += " Invalid Role provided" if role.blank?
        msg += " Invalid School Name provided" if school.blank?
      else
        teacher.school_id = school.id if school
        teacher.role_id   = role.id if role
      end
      row << {'Status' => msg.blank? ? (teacher.save! ? 'Success' : teacher.errors.messages) : msg}
    end
    write_log(csv_data)
  end

end

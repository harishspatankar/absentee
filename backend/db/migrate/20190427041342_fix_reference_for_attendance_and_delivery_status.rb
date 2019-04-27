class FixReferenceForAttendanceAndDeliveryStatus < ActiveRecord::Migration[5.2]
  def change
    remove_column :attendances, :students_id
    remove_column :attendances, :teachers_id
    remove_column :delivery_statuses, :attendances_id

    add_reference :attendances, :student
    add_reference :attendances, :teacher
    add_reference :delivery_statuses, :attendance
  end
end

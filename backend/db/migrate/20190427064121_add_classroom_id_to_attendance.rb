class AddClassroomIdToAttendance < ActiveRecord::Migration[5.2]
  def change
    add_reference :attendances, :classroom
  end
end

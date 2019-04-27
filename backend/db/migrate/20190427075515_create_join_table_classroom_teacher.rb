class CreateJoinTableClassroomTeacher < ActiveRecord::Migration[5.2]
  def change
    create_table :classroom_teachers do |t|
      t.references :classroom, :null => false
      t.references :teacher, :null => false
    end
  end
end

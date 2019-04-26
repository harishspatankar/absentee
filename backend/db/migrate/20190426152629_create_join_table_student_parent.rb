class CreateJoinTableStudentParent < ActiveRecord::Migration[5.2]
  def change
    create_table :parent_students do |t|
      t.references :parent, :null => false
      t.references :student, :null => false
    end
  end
end

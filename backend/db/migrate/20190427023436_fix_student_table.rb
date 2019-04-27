class FixStudentTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :students, :addresses_id
  end
end

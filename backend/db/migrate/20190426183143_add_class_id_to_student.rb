class AddClassIdToStudent < ActiveRecord::Migration[5.2]
  def change
    add_reference :students, :classroom, foreign_key: true
  end
end

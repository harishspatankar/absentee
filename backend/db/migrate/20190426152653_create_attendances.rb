class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.references :students, null: false, foreign_key: true, index: true
      t.references :teachers, null: false, foreign_key: true, index: true
      t.boolean    :is_present, default: true

      t.timestamps
    end
  end
end

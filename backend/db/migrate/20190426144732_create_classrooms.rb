class CreateClassrooms < ActiveRecord::Migration[5.2]
  def change
    create_table :classrooms do |t|
      t.string  :title
      t.string  :standard
      t.string  :divison
      t.time    :start_time
      t.time    :end_time
      t.integer :school_id
      t.integer :class_teacher_id

      t.timestamps
    end
  end
end

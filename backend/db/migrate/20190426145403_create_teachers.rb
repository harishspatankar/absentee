class CreateTeachers < ActiveRecord::Migration[5.2]
  def change
    create_table :teachers do |t|
      t.string :name
      t.string :email
      t.string :mobile
      t.string :gender
      t.string :qualification
      t.integer :school_id
      t.integer :role_id

      t.timestamps
    end
  end
end

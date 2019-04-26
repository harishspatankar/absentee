class CreateParents < ActiveRecord::Migration[5.2]
  def change
    create_table :parents do |t|
      t.string :father_name
      t.string :mother_name
      t.string :guardian_name
      t.string :primary_contact
      t.string :secondary_contact
      t.string :email, array:true, default: []
      t.references :addresses, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateSchools < ActiveRecord::Migration[5.2]
  def change
    create_table :schools do |t|
      t.string :name
      t.text   :contact_numbers, array: true, default: []
      t.string :email
      t.text   :helpline_contact, array: true, default: []

      t.timestamps
    end
  end
end

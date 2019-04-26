class CreateUploadResources < ActiveRecord::Migration[5.2]
  def change
    create_table :upload_resources do |t|
      t.string :file
      t.string :log_file
      t.integer :uploaded_by_id
      t.string :resource_type

      t.timestamps
    end
  end
end

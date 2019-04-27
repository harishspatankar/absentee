class AddRoleIdToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :role_ids, :integer, array: true, default: []
  end
end

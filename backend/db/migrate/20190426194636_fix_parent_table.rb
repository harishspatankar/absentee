class FixParentTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :parents, :addresses_id
    rename_column :parents, :email, :emails
  end
end

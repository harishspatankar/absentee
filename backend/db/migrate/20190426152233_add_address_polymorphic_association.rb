class AddAddressPolymorphicAssociation < ActiveRecord::Migration[5.2]
  def up
    add_column :addresses, :resource_id, :integer
    add_column :addresses, :resource_type, :string
  end

  def down
    remove_column :addresses, :resource_id
    remove_column :addresses, :resource_type
  end
end

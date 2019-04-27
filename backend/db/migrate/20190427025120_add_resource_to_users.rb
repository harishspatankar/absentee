class AddResourceToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :resource, polymorphic: true
  end
end

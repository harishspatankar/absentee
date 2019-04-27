class AddStatusToDeliveryStatus < ActiveRecord::Migration[5.2]
  def change
    add_column :delivery_statuses, :status, :string
  end
end

class ChangeTypeColumnInAddress < ActiveRecord::Migration[5.2]
  def change
    rename_column :addresses, :type, :address_type
  end
end

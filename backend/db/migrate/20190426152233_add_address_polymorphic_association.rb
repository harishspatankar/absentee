class AddAddressPolymorphicAssociation < ActiveRecord::Migration[5.2]
  def change
    def up
      change_table :addresses do |t|
        t.references :resource, polymorphic: true
      end
    end

    def down
      change_table :addresses do |t|
        t.remove_references :resource, polymorphic: true
      end
    end
  end
end

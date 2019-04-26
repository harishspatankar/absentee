class CreateDeliveryStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :delivery_statuses do |t|
      t.datetime :sms_sent_at_primary
      t.datetime :sms_sent_at_secondary
      t.datetime :sms_delivered_at_primary
      t.datetime :sms_delivered_at_secondary
      t.datetime :emails_sent_at
      t.references :attendances, null: false, foreign_key: true, index: true
      
      t.timestamps
    end
  end
end

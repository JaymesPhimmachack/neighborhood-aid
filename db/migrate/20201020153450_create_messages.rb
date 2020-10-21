class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :creator_id
      t.integer :fulfillment_id
      t.string :body
      t.timestamps
    end
    add_index :messages, :fulfillment_id
    add_index :messages, :creator_id
  end
end

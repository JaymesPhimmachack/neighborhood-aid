class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :creator_id
      t.integer :request_id
      t.string :body
      t.timestamps
    end
    add_index :messages, :request_id
    add_index :messages, :creator_id
  end
end

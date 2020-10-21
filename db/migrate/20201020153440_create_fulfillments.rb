class CreateFulfillments < ActiveRecord::Migration[5.2]
  def change
    create_table :fulfillments do |t|
      t.integer :request_id
      t.integer :volunteer_id
      t.boolean :task_fulfilled, default: false
      t.timestamps
    end
    add_index :fulfillments, :request_id
    add_index :fulfillments, :volunteer_id
  end
end


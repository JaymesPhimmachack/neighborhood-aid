class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.integer :owner_id
      t.string :title
      t.string :request_type
      t.string :description
      t.string :address
      t.float :latitude
      t.float :longitude
      t.integer :helper_quantity
      t.integer :helper_fulfilled

      t.timestamps
    end
    add_index :requests, :owner_id
  end
end

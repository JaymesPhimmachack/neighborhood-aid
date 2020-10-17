class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.integer :owner_id
      t.string :title
      t.string :type
      t.string :description
      t.string :address
      t.float :latitude
      t.float :longitude
      t.integer :helper_quantity
      t.integer :helper_fufilled

      t.timestamps
    end
  end
end

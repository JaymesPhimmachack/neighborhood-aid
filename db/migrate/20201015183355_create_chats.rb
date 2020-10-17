class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.string :task_fulfilled
      
      t.timestamps
    end
  end
end

class Message < ApplicationRecord
	belongs_to :creator, class_name: "User"
	belongs_to :fulfillment

	validates :body, presence: { message: "Message can't be blank" }
  validates :body, length: { minimum: 4, maximum: 300, message: "Message between 4-300 characters" }
end

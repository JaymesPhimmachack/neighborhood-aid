class Message < ApplicationRecord
	belongs_to :creator, class_name: "User"
	belongs_to :request

	validates :body, presence: { message: "Message can't be blank" }
	validates :body, length: { minimum: 2, maximum: 300, message: "Message between 2-300 characters" }
end

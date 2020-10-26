class Request < ApplicationRecord
	belongs_to :owner, class_name: "User"  
  has_many :fulfillments, class_name: "Fulfillment", foreign_key: "request_id"
  has_many :messages, class_name: "Message", foreign_key: "request_id"

	validates :request_type, presence: { message: "Type can't be blank" }
  validates :title, presence: { message: "Title can't be blank" }
  validates :title, length: { minimum: 4, maximum: 50, message: "Description between 4-50 characters" }
  validates :description, presence: { message: "Description can't be blank" }
  validates :description, length: { minimum: 4, maximum: 300, message: "Description between 4-300 characters" }
  validates :address, presence: { message: "Location can't be blank" }
end

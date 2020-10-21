class Fulfillment < ApplicationRecord
	has_many :messages, class_name: "Message", foreign_key: "fulfillment_id"
	belongs_to :request
	belongs_to :volunteer, class_name: "User"
end

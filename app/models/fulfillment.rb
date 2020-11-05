class Fulfillment < ApplicationRecord
	belongs_to :request
	belongs_to :volunteer, class_name: "User"

	validates :request_id, presence: { message: "Request id can't be blank" }
	validates :volunteer_id, presence: { message: "Volunteer id can't be blank" }
end

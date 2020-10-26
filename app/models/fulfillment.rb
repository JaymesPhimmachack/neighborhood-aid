class Fulfillment < ApplicationRecord
	belongs_to :request
	belongs_to :volunteer, class_name: "User"
end

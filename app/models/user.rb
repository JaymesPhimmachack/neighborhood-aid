class User < ApplicationRecord
	has_secure_password
	has_one_attached :photo
	has_many :requests
	
	validates_presence_of :first_name
	validates_presence_of :last_name
	validates_presence_of :email
	validates_uniqueness_of :email
end

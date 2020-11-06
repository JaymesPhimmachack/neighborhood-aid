class User < ApplicationRecord
	has_secure_password
	has_one_attached :photo
	has_many :requests, class_name: "Request", foreign_key: "owner_id", dependent: :destroy 
	has_many :fulfillments, class_name: "Fulfillment", foreign_key: "volunteer_id", dependent: :destroy 
	has_many :messages, class_name: "Message", foreign_key: "creator_id", dependent: :destroy 
	
	validates :first_name, presence: { message: "First name can't be blank" },
	length: { minimum: 2, message: "First name is too short (minimum is 2 characters)" }
	validates :last_name, presence: { message: "First name can't be blank" },
	length: { minimum: 2, message: "First name is too short (minimum is 2 characters)" }
	validates :password, presence: {message: "Passsword can't be blank"},
                     length: {minimum: 4, message: "Password is too short (minimum is 4 characters)"}
	validates :email, presence: { message: "Email can't be blank" },
	uniqueness: { message: "Email already exist" }
validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, :message => "Email is invalid"
end

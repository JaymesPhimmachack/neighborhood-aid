class RequestSerializer < ActiveModel::Serializer
  attributes :id, :title, :request_type, :description, :address, :latitude, :longitude, :fulfillments
  belongs_to :owner 
  has_many :fulfillments   
end

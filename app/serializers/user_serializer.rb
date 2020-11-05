class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes  :id, :first_name, :last_name, :email, :photo_url, :logged_in, :request_count

	  
  attributes :photo_url
  def photo_url
    variant = object.photo.variant(resize: "80x80")
    return rails_representation_url(variant, only_path: true)
  end  

  def logged_in
     true
  end 

  def request_count
    object.requests.length || 0
  end 
end

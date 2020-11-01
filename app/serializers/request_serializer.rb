class RequestSerializer < ActiveModel::Serializer
  attributes :id, :title, :request_type, :description, :address, :latitude, :longitude, :helper_quantity, :helper_fulfilled, :created_date, :owner_id

  def created_date
    self.object.created_at.strftime("%c")
  end  

  def owner_id
    self.object.owner.id
  end  
end

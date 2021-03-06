class RequestSerializer < ActiveModel::Serializer
  attributes :id, :title, :request_type, :description, :address, :latitude, :longitude, :helper_quantity, :helper_fulfilled, :created_date, :hide_item
  belongs_to :owner, class_name: "User", serializer: UserIdSerializer
  has_many :fulfillments, class_name: "Fulfillment", foreign_key: "request_id"

  def created_date
    object.created_at.strftime("%c")
  end  

  def hide_item
    object.fulfillments.length == object.helper_quantity
  end   
end

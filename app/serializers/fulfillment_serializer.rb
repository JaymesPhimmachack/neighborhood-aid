class FulfillmentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :request_id, :volunteer_id, :task_fulfilled, :photo_url

  belongs_to :volunteer, class_name: "User", serializer: SimpleFulfillmentSerializer

  def photo_url
    variant = object.volunteer.photo.variant(resize: "80x80")
    return rails_representation_url(variant, only_path: true)
  end  
end

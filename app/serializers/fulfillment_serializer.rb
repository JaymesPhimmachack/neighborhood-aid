class FulfillmentSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :volunteer_id, :task_fulfilled

  belongs_to :volunteer, class_name: "User", serializer: SimpleFulfillmentSerializer
end

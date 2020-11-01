class FulfillmentSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :volunteer_id, :task_fulfilled, :volunteer, 
  def volunteer
    { first_name: self.object.volunteer.first_name,
      last_name:  self.object.volunteer.last_name,
      email: self.object.volunteer.email
     }
  end   
end

class FulfillmentSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :volunteer_id, :task_fulfilled, :volunteer, :messages, :room
 
  def volunteer
    { first_name: self.object.volunteer.first_name,
      last_name:  self.object.volunteer.last_name,
      email: self.object.volunteer.email
     }
  end  

  def room
      self.object.request.title
  end

  def messages
    self.object.volunteer.messages.map do |message|
    { first_name: message.creator.first_name,
      last_name: message.creator.last_name,
      body: message.body,
      created_at: message.created_at
    }
    end
  end  
end

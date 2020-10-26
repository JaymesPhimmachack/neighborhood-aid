class MessageSerializer < ActiveModel::Serializer
  attributes :id, :creator

  def creator
    {
      first_name: self.object.creator.first_name,
      last_name: self.object.creator.last_name,
      body: self.object.body,
      created_at: self.object.created_at
    }
  end  
end

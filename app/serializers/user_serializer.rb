class UserSerializer < ActiveModel::Serializer
  attributes  :id, :first_name, :last_name, :email, :login_status

  def user 
    {
    id: :id, 
    first_name: :first_name,
    last_name: :last_name,
    email: :email
    }
  end

  def login_status
    {
      status: :created,
      logged_in: true
    }
  end  

  # def requests
  #   self.object.requests.map do |request|
  #     {
  #     id: request.id,
  #     created_at: request.created_at.strftime("%c"),
  #     helper_fulfilled: request.helper_fulfilled,
  #     helper_quantity: request.helper_quantity,
  #     request_type: request.request_type,
  #     title: request.title
  #     }
  #   end  
  # end  

  # def fulfillments
  #   self.object.fulfillments.map do |fulfillment|
  #     {
  #       request_id: fulfillment.request_id,
  #       task_fulfilled: fulfillment.task_fulfilled,
  #       volunter_id: fulfillment.volunter_id
  #     }
  #   end  
  # end  
end

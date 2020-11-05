class MessagesController < ApplicationController
	def index
		messages = Message.all
		render json: messages
	end
	
	def create
		message = Message.new(message_params)
		
		room_name = message.request.title
		user = User.find(message.creator_id)
		
		 
		if message.save
			ActionCable.server.broadcast("Chat Channel #{room_name}", {
				message: { id: message.id, creator_id: message.creator_id, request_id: message.request_id, first_name: user.first_name, last_name: user.last_name , created_at: message.created_at.strftime("%c"), content: message.body  }
			})
		else
			render json: { status: :internal_server_error }
		end
	end		

	private

    def message_params
      params.require(:message).permit(:request_id, :creator_id, :body)
    end
end

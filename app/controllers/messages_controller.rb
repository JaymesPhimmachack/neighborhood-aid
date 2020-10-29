class MessagesController < ApplicationController
	def index
		@messages = Message.all
		render json: @messages
	end
	
	def create
		@message = Message.new(message_params)
		request = @message.request
		room_name = request.title
		user = User.find(@message.creator_id)
		username = "#{user.first_name} #{user.last_name}"


		if @message.save
			render json: @message

			ActionCable.server.broadcast("Chat Channel #{room_name}", {
				message: { id: @message.id, creator_id: @message.creator_id, request_id: @message.request_id, username: username, created_at: @message.created_at.strftime("%c"), content: @message.body  }
			})
		else
			render json: { status: :internal_server_error }
		end
	end		

	private

    def message_params
      params.fetch(:message, {}).permit(:request_id, :creator_id, :body)
    end
end

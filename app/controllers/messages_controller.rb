class MessagesController < ApplicationController
	def index
		@messages = Message.all
		render json: @messages
	end
	
	def create
		message = Message.new(message_params)
		fulfillment = Fulfillment.find(params[:fulfillment_id])
		# room = Request.find(params[:id])
		if message
			render json: fulfillment
			# render json: MessageSerializer.new(message)
			# RoomChannel.broadcast_to(room, {
			# 	room: room,
			# 	users: UserSerializer.new(request.fulfillments),
			# 	messages: MessageSerializer.new(message)
			# })
		else
			render json: { status: :internal_server_error }
		end
	end		

	private

    def message_params
      params.fetch(:fulfillment, {}).permit(:fulfillment_id, :creator_id, :body)
    end
end

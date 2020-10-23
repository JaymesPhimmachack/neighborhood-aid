class MessagesController < ApplicationController
	def index
		@messages = Message.all
		render json: {
			status: :ok,
			messages: messages
		}
	end
	
	def create
		@message = Message.new(message_params)
    if message.save
			render json: {
				status: :ok,
				messages: @messages
			}
		else
			render json: { status: :internal_server_error }
		end
	end		

	private

    def message_params
      params.fetch(:fulfillment, {}).permit(:fulfillment_id, :creator_id,:body)
    end
end

class ChatChannel < ApplicationCable::Channel
	def subscribed
		
		@request = Request.find(params[:id])
    
		stream_from "Chat Channel #{@request.title}"

	end	

	def received(data)
		ChatChannel.broadcast_to("Chat Channel #{@request.title}", data)
	end

	
	def unsubscribed
	end	
end	
class ChatChannel < ApplicationCable::Channel
	def subscribed
		
		room = Request.find(params[:id]).title

		stream_for "chat channel #{room}"
	end	

	def received(data)
		ChatChannel.broadcast_to(room, 'Testing chat stream')
	end
	
	def unsubscribed
	end	
end	
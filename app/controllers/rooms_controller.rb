class RoomsController < ApplicationController
	def index
		requests = Request.all
		rooms = []
		requests.each do |request|
			rooms.push({ id: request.id, title: request.title })
		end	
		
    render json: rooms
	end	

	def show
		request = Request.find(params[:id])
		members = []

		members << { id: request.owner.id, username: "#{request.owner.first_name} #{request.owner.last_name}" }

		request.fulfillments.each do |fulfillment|
			members  << { id: fulfillment.volunteer.id , username: "#{fulfillment.volunteer.first_name} #{fulfillment.volunteer.last_name}" }
		end
		
		member_messages = []

		request.messages.each do |content|
			member_messages  << { id: content.id, creator_id: content.creator_id, request_id: content.request_id, username: "#{content.creator.first_name} #{content.creator.last_name}", created_at: content.created_at.strftime("%c"), content: content.body  }
		end	

		render json: { roomId: request.id, members: members, messages: member_messages }
	end	
end

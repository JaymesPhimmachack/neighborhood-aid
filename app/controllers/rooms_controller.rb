class RoomsController < ApplicationController
	def index
		requests = Request.all

		rooms = []

		requests.each do |request|
			rooms.push({ id: request.id, title: request.title, members: [] })
		end	

		requests.each_with_index do |request, idx|
			if request.id == rooms[idx][:id]
				rooms[idx][:members] << { id: request.owner.id, first_name: request.owner.first_name, last_name: request.owner.last_name }
			end	

			request.fulfillments.each do |fulfillment|
				if request.id == fulfillment.request_id
					rooms[idx][:members] << { id: fulfillment.volunteer.id , first_name: fulfillment.volunteer.first_name, last_name: fulfillment.volunteer.last_name }
				end
			end
		end	
		
    render json: rooms
	end	

	def show
		request = Request.find(params[:id])
		members = []

		members << { id: request.owner.id, first_name: request.owner.first_name, last_name: request.owner.last_name }

		request.fulfillments.each do |fulfillment|
			members  << { id: fulfillment.volunteer.id , first_name: fulfillment.volunteer.first_name, last_name: fulfillment.volunteer.last_name }
		end
		
		member_messages = []

		request.messages.each do |content|
			member_messages  << { id: content.id, creator_id: content.creator_id, request_id: content.request_id, first_name: content.creator.first_name, last_name: content.creator.last_name, created_at: content.created_at.strftime("%c"), content: content.body  }
		end	

		render json: { roomId: request.id, members: members, messages: member_messages }
	end	
end

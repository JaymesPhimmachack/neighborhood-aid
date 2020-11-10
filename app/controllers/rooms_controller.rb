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

		members << { id: request.owner.id, first_name: request.owner.first_name, last_name: request.owner.last_name, photo_url: photo_url(request.owner.photo) }

		request.fulfillments.each do |fulfillment|
			members  << { id: fulfillment.volunteer.id , first_name: fulfillment.volunteer.first_name, last_name: fulfillment.volunteer.last_name, photo_url: photo_url(fulfillment.volunteer.photo) }
		end
		
		member_messages = []

		request.messages.each do |content|
			member_messages  << { id: content.id, creator_id: content.creator_id, request_id: content.request_id, first_name: content.creator.first_name, last_name: content.creator.last_name, created_at: content.created_at.strftime("%c"), content: content.body, photo_url: photo_url(content.creator.photo)  }
		end	

		render json: { roomId: request.id, members: members, messages: member_messages }
	end	

	def photo_url(photo)
    variant = photo.variant(resize: "80x80")
    return rails_representation_url(variant, only_path: true)
  end  
end

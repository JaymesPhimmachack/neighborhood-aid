class RoomsController < ApplicationController
	def index
		requests = Request.all
		rooms = []
		requests.each do |request|
			rooms.push({id: request.id, title: request.title })
		end	
		
    render json: rooms
	end	
	def show
		request = Request.find(params[:id])
		render json: request
	end	
end

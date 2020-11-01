class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :edit, :update, :destroy]

  def index
    @requests = Request.all

    render json: @requests
  end

  def create
    @request = Request.new(request_params)

    if @request.save
      render json: { status: :created, request: @request }
    else
      render json: @request.errors.full_messages, status: :unprocessable_entity 
    end
  end

  def update
    if @request.update(request_params)
      render json: {
        status: :ok,
        request: @request
      }
    else
      render json: { status: :bad_request }
    end	
  end

  def destroy
    @request.destroy

    render json: { status: :no_content }
  end

  private

    def set_request
      @request = Request.find(params[:id])
    end

    def request_params
      params.fetch(:request, {}).permit(:owner_id, :title, :request_type, :description, :address, :latitude, :longitude, :helper_quantity)
    end
end

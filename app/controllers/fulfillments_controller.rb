class FulfillmentsController < ApplicationController
  before_action :set_fulfillment, only: [:show, :edit, :update, :destroy]

  def index
    @fulfillments = Fulfillment.all
    render json: {
			status: :ok,
			fulfillments: @fulfillments
		}
  end

  def create
    @fulfillment = Fulfillment.new(fulfillment_params)

    if @fulfillment.save
      render json: { status: :ok, fulfillment: @fulfillment }
    else
      render json: @fulfillment.errors.full_messages, status: :unprocessable_entity 
    end

  end


  def update
    if @fulfillment.update(fulfillment_params)
      render json: { status: :ok, fulfillment: @fulfillment }
    else
      render json: @fulfillment.errors.full_messages, status: :unprocessable_entity 
    end
  end

  def destroy
    @fulfillment.destroy
    render json: { status: :no_content }
  end

  private

    def set_fulfillment
      @fulfillment = Fulfillment.find(params[:id])
    end


    def fulfillment_params
      params.fetch(:fulfillment, {}).permit(:request_id, :volunteer_id, :task_fulfilled)
    end
end

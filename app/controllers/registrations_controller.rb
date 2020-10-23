class RegistrationsController < ApplicationController
	def create
		user = User.new(registration_params)

		if user.save
			session[:user_id] = user.id
			render json: {
				status: :created,
				user: user
			}
		else
			render json: { status: :internal_server_error }
		end
	end	

	def update
		  @user = User.find(params[:id])
		if @user.update(registration_params)
			render json: {
				status: :ok,
				user: user
			}
		else
			render json: { status: :bad_request }
		end	
	end	

	def destroy
		@user = User.find(params[:id])
		@user.destroy
		render json: { status: :no_content }
	end	

	private 
		def registration_params
			params.fetch(:user, {}).permit(:first_name, :last_name, :email, :password, :password_confirmation, :photo)
		end
end



class RegistrationsController < ApplicationController

	def create
		@user = User.new(registration_params)

		if @user.save
			session[:user_id] = @user.id
			render json:  @user, 	status: 201
		else
			render json: { status: :internal_server_error }
		end
	end	

	def update
		user = User.find(params[:id])

		if user.update(registration_params)
			render json: user, status: 202, message: 'User updated'
		else
			render json: { status: 422 }
		end	
	end	

	def destroy
		user = User.find(params[:id])
		user.destroy
		render json: { status: :no_content }
	end	

	private 
		def registration_params
			params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :photo)
		end
end



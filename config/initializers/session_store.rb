if Rails.env == "production"
	Rails.application.config.session_store :cookie_store, key: "_neighborhood_aid_app", domain: "jp-neighborhood-aid.herokuapp.com", same_site: :lax
else
	Rails.application.config.session_store :cookie_store, key: "_neighborhood_aid_app"
end	


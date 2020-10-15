Rails.application.routes.draw do
  root 'pages#index'
  get 'pages/*path' => 'pages#index'
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete    :logout, to: "sessions#logout"
  get       :logged_in, to: "sessions#logged_in"
end

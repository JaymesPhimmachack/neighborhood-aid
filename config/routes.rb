Rails.application.routes.draw do
  root 'pages#index'
  get 'pages/*path' => 'pages#index'

  resources :sessions, only: [:create]
  resources :registrations, only: [:create, :update, :destroy]
  resources :requests, only: [:index, :create, :show, :update, :destroy]
  resources :fulfillments, only: [:index, :create, :destroy]
  resources :messages, only: [:index, :create]
  resources :rooms, only: [:index, :show]

  delete    :logout, to: "sessions#logout"
  get       :logged_in, to: "sessions#logged_in"
  mount ActionCable.server => '/cable'
end

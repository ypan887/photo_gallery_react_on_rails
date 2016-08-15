Rails.application.routes.draw do
  resources :images, only: [:create, :index]

  root 'images#index'
end

Rails.application.routes.draw do
  resources :images, only: :create

  root 'photo_gallery#index'
end

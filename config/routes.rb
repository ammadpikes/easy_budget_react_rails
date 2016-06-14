Rails.application.routes.draw do
  root 'records#index'
  devise_for :users
  resources :records
end

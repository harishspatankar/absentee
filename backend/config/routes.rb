Rails.application.routes.draw do
  # devise_for :users
  # resources :sessions, only: [:create, :destroy]
  post 'users/sign_in' => 'sessions#create'
  delete 'users/sign_out' => 'sessions#destroy'
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  constraints format: :json do
    resources :roles
  end
end

Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  constraints format: :json do
    resources :roles

    resources :teachers

    resources :classrooms do
      resources :students
    end
  end
end

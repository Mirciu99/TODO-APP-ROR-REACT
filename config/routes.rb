Rails.application.routes.draw do
  get 'todos/show_all'
  post 'todos/create'
  get '/todos/show/:id', to: 'todos#show'
  put '/todos/update/:id', to: 'todos#update'
  delete '/todos/destroy/:id', to: 'todos#destroy'


  root 'todos#index'
end

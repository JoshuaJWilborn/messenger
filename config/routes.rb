Messenger::Application.routes.draw do
  devise_for :users

  resource :chat, only: [:index, :show]
	resource :pusher, only: [] do
	  post 'auth' => 'pusher#auth'
	end

	get 'test' => 'chat#show'

	root to: 'chat#index'
end

Messenger::Application.routes.draw do
  devise_for :users

  resource :chat, only: :index
	resource :pusher, only: [] do
	  post 'auth' => 'pusher#auth'
	end
	root to: 'chat#index'
end

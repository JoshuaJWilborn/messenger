class ChatController < ApplicationController
  before_filter :authenticate_user!

	def index

	end

  def show
		render :test

	end
end

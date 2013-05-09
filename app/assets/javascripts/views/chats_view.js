CA.Views.ChatsView = Backbone.View.extend({

	render: function(){
    var that = this;
		_(CA.chats).each(function(value, key){
      if ( CA.chatViews[key] ) {
        CA.chatViews[key].render();
      } else {
        CA.chatViews[key] = new CA.Views.ChatView({chat: CA.chats[key], chatname: key});
        that.$el.append(CA.chatViews[key].render().el);
			}
		})
		return that;
	}
});
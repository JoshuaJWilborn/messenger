CA.Views.UsersView = Backbone.View.extend({

  events: {
    "dblclick ul": 'startChat'
  },
	render: function() {
    var that = this;
		var renderedContent = JST["users"]()
    that.$el.html(renderedContent);
		that.$el.draggable();
		return that;
  },

	startChat: function(event){
		var that = this;
		if (CA.chats[$(event.target).text()]) {
		} else {
      CA.chats[$(event.target).text()] = [];
      CA.chatsView.render();
		}
  }
})
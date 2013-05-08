CA.Views.ChatsView = Backbone.View.extend({

	events: {
		"keyup input": 'sendMessage'
  },

	render: function(){
    var that = this;
		var renderedContent = JST["chats"]()
		that.$el.html(renderedContent);
		that.$el.draggable()
		return that;

	},

	sendMessage: function(event) {
		var that = this;
		targetUser = event.target.attributes['data-target'].value
	  if (event.which == 13) {
			CA.onlineUsers.trigger(
													 		'client-receive_message',
															{target: targetUser,
															 user: CA.users.me.info.name,
															 message: event.target.value }
														 )
			CA.chats[targetUser].push(CA.users.me.info.name + ': ' + event.target.value);
			event.target.value = '';
			this.render();
	  }
	}
});
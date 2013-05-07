CA.Views.ChatsView = Backbone.View.extend({


	events: {
		"keyup input": 'sendMessage'
  },

	render: function(){
    var that = this;
		var renderedContent = JST["chats"]()
    that.$el.html(renderedContent);
		return that;
	},

	sendMessage: function(event) {
		var that = this;
		console.log("keypress sendmessage")
		targetUser = event.target.attributes['data-target'].value
	  if (event.which == 13) {
			window.onlineUsers.trigger('client-receive_message', {target: targetUser , user: window.users.me.info.name, message: event.target.value })
			window.chats[targetUser].push(window.users.me.info.name + ': ' + event.target.value);
			event.target.value = '';
			this.render();
	  }
	},

	log: function() {
		console.log('clicked')
	}
});

var startChat = function(event, user){
	if (window.chats[user.info.name]) {

	} else {
    window.chats[user.info.name] = [];
	}
};


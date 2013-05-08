CA.Views.ChatView = Backbone.View.extend({

	events: {
		"keyup input": 'sendMessage',
		"click .close": 'close',
		"click .maximize": 'maximize',
		"click .minimize": 'minimize'
  },

	render: function(){
    var that = this;
		var renderedContent = JST["chats"]({chat: that.options.chat, chatname: that.options.chatname})
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
	},

	close: function(event){
		delete CA.chatViews[this.options.chatname];
		delete CA.chats[this.options.chatname]
		this.remove();
	},

	maximize: function(event){
		console.log("click")
    parent = $(event.target).parent().parent().parent()[0];
		console.log(parent)
		console.log(parent.className)
		parent.className === "box" ? parent.className = "bigbox" : parent.className = "box";
	},

	minimize: function(event){
		console.log("click")
    parent = $(event.target).parent().parent().parent()[0];
		console.log(parent)
		console.log(parent.className)
		parent.className === "box" ? parent.className = "smallbox" : parent.className = "box";
	}
});
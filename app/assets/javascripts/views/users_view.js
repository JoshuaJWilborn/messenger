CA.Views.UsersView = Backbone.View.extend({

  events: {
    "dblclick ul": 'startChat',
		"click .close": 'close',
		"click .maximize": 'maximize',
		"click .minimize": 'minimize'
  },
	render: function() {
    var that = this;
		var renderedContent = JST["users"]({chatname: "Onliner Users"})
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
  },

	close: function(event){
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
})
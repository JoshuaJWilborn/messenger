CA.Views.ChatView = Backbone.View.extend({

	events: {
		"keyup input": 'sendMessage',
		"click .close": 'close',
		"click .maximize": 'maximize',
		"click .minimize": 'minimize',
		'dblclick .titleInside': 'maximize'
  },

	render: function(){
    var that = this;
		var renderedContent = JST["chats"]({
			chat: that.options.chat,
			chatname: that.options.chatname
		});
		var oldClass = that.$el.find('.parentwindow').attr('class');
		that.$el.html(renderedContent);
		that.$el.draggable({
			cancel: "input, textarea, .parentwindow ul"
		})
		that.$el.droppable({
			tolerance: "touch",
			drop: function(event, ui) {
        console.log("dropped")
			},
			deactivate: function(event, ui) {
				console.log("no longer dragging")
			}
		})
		if (oldClass) {
			that.$el.find('.parentwindow').attr('class', oldClass)
		}
		return that;
	},
	//break this off into a chat model
	sendMessage: function(event) {
		var chat = new CA.Models.Chat;
		chat.sendMessage(event,
			this.options.chat,
  		this.options.chatname,
			this.render.bind(this)
		)
	},

	close: function(event){
		delete CA.chatViews[this.options.chatname];
		delete CA.chats[this.options.chatname];
		this.remove();
	},

	maximize: function(event){
		var $parent = this.getParent(event);
		if ( $(event.target).parents('#minimize-bar').length != 0) {
			this.minimize(event);
		}
		this.toggleClass($parent, "bigbox", "smallbox");
	},


	minimize: function(event){
	  var $parent = this.getParent(event);
		this.toggleClass($parent, "smallbox", "bigbox");
		if ( $(event.target).parents('#minimize-bar').length == 0 ) {
			$('#minimize-bar').append(this.$el);
			this.$el.attr('style', null);
		} else {
			$('body').find('#chats').append(this.$el);
			this.$el.attr('style', "position: relative")
		}

	},

	toggleClass: function($el, classA, classB) {
		if ( $el.hasClass(classA) ) {
      $el.removeClass(classA)
		} else {
      $el.addClass(classA)
			$el.removeClass(classB)
		}
	},

	getParent: function(event) {
		var $el = $(event.target);
		return $parent = $el.parents('.parentwindow');
	}
});

CA.Views.UsersView = Backbone.View.extend({

  events: {
    "dblclick ul": 'startChat',
		"click .close": 'remove',
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
		var name = $(event.target).text();
		if (!CA.chats[name]) {
      CA.chats[name] = {messages: [], targets: [name]};
      CA.chatsView.render();
		}
  },

	maximize: function(event){
		var $parent = this.getParent(event);
		this.toggleClass($parent, "bigbox", "smallbox");
	},

	minimize: function(event){
	  var $parent = this.getParent(event);
		this.toggleClass($parent, "smallbox", "bigbox");
		if ( $(event.target).parents('#minimize-bar').length == 0 ) {
			$('#minimize-bar').append(this.$el);
			this.$el.attr('style', null);
		} else {
			$('body').append(this.$el);
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
})
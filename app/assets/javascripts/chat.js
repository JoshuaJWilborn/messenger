window.CA = {
	Views : {},
	Models: {},
	chats: {},
	chatViews: {},

	startChat: function() {
		// Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) window.console.log(message);
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;

    var pusher = new Pusher('59f43f1f5867e554bcfb');

    CA.onlineUsers = pusher.subscribe('presence-online')
		CA.onlineUsers.bind('pusher:subscription_succeeded', function(members){
			CA.users = members;
			CA.usersView.render();
		});
		CA.onlineUsers.bind('pusher:member_added', function(member) {
		  CA.usersView.render();
		});
		CA.onlineUsers.bind('pusher:member_removed', function(member) {
		  CA.usersView.render();
		});
		CA.onlineUsers.bind('client-receive_message', function(data) {
			if ( data['target'] == CA.users.me.info.name ) {
				var user = data['user'];
				var message = data['message'];
				CA.chats[user] ? '' : CA.chats[user] = {messages: [], targets: [user]} ;
			  CA.chats[user]['messages'].push(user + ': ' + message);
        CA.chatsView.render();
			}
		});


		CA.chatsView = new CA.Views.ChatsView({el: $('#chats')})
		CA.usersView = new CA.Views.UsersView({el: $('#users')})
	}
}
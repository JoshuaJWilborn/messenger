CA.Models.Chat = Backbone.Model.extend({
	sendMessage: function(event, chat, chatname, render) {
		var that = this;
	  if (event.which == 13) {
			var targetUsers = chat.targets
      _(targetUsers).each(function(target){
				CA.onlineUsers.trigger(
														 		'client-receive_message',
																{target: target,
																 user: CA.users.me.info.name,
																 message: event.target.value }
															 )
			});
			CA.chats[targetUsers[0]]['messages'].push('<strong>' + CA.users.me.info.name + '</strong>: ' + event.target.value);
			event.target.value = '';
			render();
			$('#' + chatname + '-input').focus();
			$('#' +  chatname + ' ul')[0].scrollTop = $('#' +  chatname + ' ul')[0].scrollHeight
	  }
	}
})
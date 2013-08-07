window.FriendRequestListView = Backbone.View.extend({

	initialize:function(){
		console.log("Starting Friend Request View ...");
		this.render(); 
	},

	render:function(){
		var requests = this.model.models;
        var length = requests.length;

        if(length > 0){
            for (var i = 0; i < length; i++) {
                $(this.el).append(new FriendRequestItemView({model: requests[i]}).el);
            }
        }
        return this;
	}

});

window.FriendRequestItemView = Backbone.View.extend({

	initialize:function(){
		console.log("Starting Friend Request View ...");
		this.render(); 
	},

	render:function(){
		var self= this;
		utils.getUser(this.model.get("requestingUser"),function(user){
			
			self.model.set({
				userPicture: user.profilePicture,
				userName: user.name
			});
			$(self.el).html(self.template(self.model.toJSON()));
			return this;
		});
		
	}


});
window.MenuNavigationView = Backbone.View.extend({

    initialize: function () {
    	console.log('Starting Menu Navigation...');   
        this.render();
    },

    render: function () {
   		var self = this;
    	utils.sessionInfo(function(data){
    		var user = new User(data);
    		console.log(user.toJSON());
    		$('.menu').html(self.template(user.toJSON()));     
        	return this;
    	});

    }

});
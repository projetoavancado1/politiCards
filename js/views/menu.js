window.MenuNavigationView = Backbone.View.extend({

    initialize: function () {
    	console.log('Starting Menu Navigation...');   
        this.render();
    },

    render: function () {
   		var self = this;
    	utils.sessionInfo(function(data){
    		var user = new User(data);    		
    		$('.menu').html(self.template(user.toJSON()));     
        	return this;
    	});

    }

});
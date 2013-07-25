window.PostView = Backbone.View.extend({

	initialize: function(){
		console.log("Starting Post View...");
		this.render();
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
        return this;
	},


	events: {
		"click #postButton"         : "savePost"

	},

	savePost: function(){
		var post = this;

        console.log(this.model.toJSON());

        this.model.save(null, {
            success: function (model) {
            	post.render();
                utils.showAlert('Sucesso!', 'Postagem realizada com sucesso', 'alert-success');                
            },
            error: function () {
                utils.showAlert('Erro', 'Um erro correu na criação desta postagem', 'alert-error');
            }
        });
   	}

});
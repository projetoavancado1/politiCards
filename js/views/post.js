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
      "change"                    : "change",
  		"click #postButton"         : "savePost",
  		"click #deletePostButton"   : "deletePost"
	},

  change: function (event) {    
      var target = event.target;
      var change = {};
      change[target.name] = target.value;
      this.model.set(change);
  },

	savePost: function(){

	    var self = this;

      console.log(this.model.toJSON());

      this.model.save(null, {
          success: function (model) {
              self.render();
              utils.showAlert('Sucesso!', 'Postagem realizada com sucesso', 'alert-success');                
          },
          error: function () {
              utils.showAlert('Erro', 'Um erro correu na criação desta postagem', 'alert-error');
          }
      });
 	},

 	deletePost:function(){
 		console.log(this.model.toJSON());
 		console.log(this.model.isNew());
 		this.model.destroy({
          success: function () {
              alert('Postagem removida');
              window.location.replace('#');
          },
          error: function(){
              alert("Não foi possível remover esta postagem!");
          }
      });
      return false;
 	}

});

window.PostShowView = Backbone.View.extend({

    initialize: function () {
        console.log('Starting Show Post View');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }


});
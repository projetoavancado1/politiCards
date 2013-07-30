window.CommentView = Backbone.View.extend({

	initialize:function(){
		console.log("Starting Comment View...");
		this.render();
	},

	render:function(){
		$(this.el).html(this.template(this.model.toJSON()));
      	return this;
	},

	events:{
		"change"                 : "change",
		"click #commentButton"   : "saveComment",		
		"click #commentButton"   : "saveComment",
		//"click #deleteComment"   : "deleteComment"
	},

	change: function (event) {    
		var target = event.target;
		var change = {};
		change[target.name] = target.value;
		this.model.set(change);
  	},

  	saveComment: function(){
  		var self = this;
  		console.log(this.model.toJSON());

		this.model.save(null, {
			success: function (model) {
			  self.render();
			  utils.showAlert('Sucesso!', 'Comentário enviado', 'alert-success');                
			},
			error: function () {
			  utils.showAlert('Erro', 'Tente enviar este cometário mais tarde', 'alert-error');
			}
		});
		postUtils.updatePostFullView(this.model);
  	},

  	deleteComment:function(){
  		alert("Entrei aqui!");
  		console.log("tentou deletar");
  		console.log(this.model.toJSON());
   		console.log(this.model.isNew());
   		this.model.destroy({
            success: function () {
                alert('Comentário excluído!');
                window.location.replace('#');
            },
            error: function(){
                alert("Não foi possível excluir este comentário!");
            }
        });
        return false;
  	}
});
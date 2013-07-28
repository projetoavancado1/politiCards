window.CommentListView = Backbone.View.extend ({

    initialize: function () {
        console.log('Starting Post List View...');    
        this.render();
    },

    render: function () {
        var comments = this.model.models;
        var length = comments.length;

        if(length > 0){
            for (var i = 0; i < length; i++) {
                $(this.el).append(new CommentItemView({model: comments[i]}).el);
            }
        }
        return this;
    }
});

window.CommentItemView = Backbone.View.extend({

	className: "comments",

    initialize: function () {
        console.log('Starting Comment Item View...');
        this.render();            
    },

    events:{                    
        "click #deleteComment"   : "deleteComment"
    },

    render: function () {        
        var self = this;
        utils.getUser(this.model.get("author"), function(user){
            var commentDetails = {
                //authorPicture: user.profilePicture,
                //authorName: user.name,
                //authorID: user.id
                //text: self.model.get("text"),
                //post: self.model.get("post"),
                //id: self.model.get("id")
            };
            self.model.set({
                    authorPicture: user.profilePicture,
                    authorName: user.name,
                    authorID: user.id
            });

            console.log(self.model.toJSON());
            
            $(self.el).html(self.template(self.model.toJSON()));    
        });
        return this;
    },

    deleteComment:function(){                
        //console.log(this.model.toJSON());
        //console.log(this.model.isNew());
        this.model.destroy({
            wait: true,             
            success: function () {
                alert('Comentário excluído!');                
            },
            error: function(){
                alert("Da erro, mas exclui!");
                //alert("Não foi possível excluir este comentário!");
            }
        });        
        return false;
    }

});
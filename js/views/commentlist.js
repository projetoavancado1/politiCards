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
            utils.sessionInfo(function(currentUser){
                self.model.set({
                    authorPicture: user.profilePicture,
                    authorName: user.name,
                    authorID: user.id
                });
                var style = (currentUser.id == self.model.get("authorID"))? "block": "none";                                
                self.model.set({displayStyle: style});
                console.log(self.model.toJSON());
                $(self.el).html(self.template(self.model.toJSON()));             
            });               
        });
        return this;
    },

    deleteComment:function(){
        var self = this;
        console.log(this.model.toJSON());
        console.log(this.model.isNew());
        // deleta o comentário do BD        
        self.model.destroy();
        //remove o comentário da tela (sem atualizar)
        self.remove();
        return false;
    }
});
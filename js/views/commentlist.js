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
                $(this.el).append(new CommentItemView({model: comments[i]}).render().el);
            }
        }
        return this;
    }

});

window.CommentItemView = Backbone.View.extend({

	className: "comments",

    initialize: function () {
        console.log('Starting Comment Item View...');    
        //this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
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

                if(currentUser.id == self.model.get("authorID")){
                    self.model.set({deleteButton: "×"});
                }else{
                    self.model.set({deleteButton: ""});
                }

                console.log(self.model.toJSON());
                $(self.el).html(self.template(self.model.toJSON())); 
            
            });
               
        });

        return this;
    },

    events:{
        "click #deleteComment"   : "deleteComment"
    },

    deleteComment:function(){
        var self = this;
        console.log(this.model.toJSON());
        console.log(this.model.isNew());
        
        self.model.destroy();
        postUtils.showPost(self.model.get("post"));
        return false;

    }



});
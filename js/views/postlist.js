window.PostListView = Backbone.View.extend ({

	initialize: function () {
        console.log('Starting Post List View...');    
        this.render();
    },

    render: function () {
        //limit of posts for page
        var boundaryElements = 12;

        var posts = this.model.models;
        var length = posts.length;
        var startPos = (this.options.page - 1) * boundaryElements;
        var endPos = Math.min(startPos + boundaryElements, length);

        $(this.el).html('<div id="id" class="span12">');
        
        for (var i = startPos; i < endPos; i++) {
            $('#id', this.el).append(new PostItemView({model: posts[i]}).render().el);
        }

        if(length > boundaryElements){
           $(this.el).append(new PostPaginator({model: this.model, page: this.options.page}).render().el);
        }
        return this;
    }

});


window.PostItemView = Backbone.View.extend({

    //tagName: "li",
	className: "well",

    initialize: function () {
        console.log('Starting Post List Item View...');    
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {        
        var self = this;        
        utils.getUser(this.model.get("author"), function(user){                    
            var postDetails = {
                authorProfilePicture: user["profilePicture"],
                author: user["name"],
                title: self.model.get("title"),
                text: self.model.get("text")
            };
            $(self.el).html(self.template(postDetails));
        });                
        return this;
    }

});
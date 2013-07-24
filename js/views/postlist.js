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

        $(this.el).html('<ul class="thumbnails"></ul>');

        console.log('entrou aki 1');
        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new PostItemView({model: posts[i]}).render().el);
        }

        if(length > boundaryElements){
           $(this.el).append(new PostPaginator({model: this.model, page: this.options.page}).render().el);
        }
        return this;
    }

});


window.PostItemView = Backbone.View.extend({

    tagName: "li",
	className: "span3",

    initialize: function () {
        console.log('Starting Post List Item View...');    
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {        
        $(this.el).html(this.template(this.model.toJSON()));        
        return this;
    }

});
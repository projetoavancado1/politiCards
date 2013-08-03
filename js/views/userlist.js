window.UserListView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing User List View');    
        this.render();
    },

    render: function () {
        var users = this.model.models;
        var len = users.length;
        var startPos = (this.options.page - 1) * 9;
        var endPos = Math.min(startPos + 9, len);

        //50px exibe a listagem de usuários de forma centralizada na div #content
        $(this.el).html('<ul style="padding-left:50px" class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new UserListItemView({model: users[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.UserListItemView = Backbone.View.extend({

    tagName: "li",

    className: "span3",

    initialize: function () {
        console.log('Initializing User List Item View');    
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));        
        return this;
    }

});
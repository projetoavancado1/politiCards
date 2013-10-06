window.UserListView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing User List View');    
        this.render();
    },

    render: function () {
        var users = this.model.models;
        var len = users.length;
        var usersPerPage = 12;
        var userPerLinePage = 4;
        var startPos = (this.options.page - 1) * usersPerPage;
        var endPos = Math.min(startPos + usersPerPage, len);
        
        var userIndex = startPos;
        for(var i = 0; i < usersPerPage/userPerLinePage && userIndex < endPos; i++){
            $(this.el).append('<ul id="thumbnails'+i+'" class="thumbnails"></ul>');
            for(var j = 0; j < userPerLinePage && userIndex < endPos; j++){
                $('#thumbnails'+i, this.el).append(new UserListItemView({model: users[userIndex++]}).render().el);
            }
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
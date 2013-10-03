window.SearchUserListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (user) {
            $(self.el).append(new EmployeeListItemView({model:user}).el);
        });
        this.render();
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (user) {
            $(this.el).append(new SearchUserListItemView({model:user}).el);
        }, this);
        return this;
    }
});

window.SearchUserListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {        
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
        this.render();
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
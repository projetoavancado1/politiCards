window.MessageListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
        console.log('Initializing MessageListView');         
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {
        $(this.el).empty();        
        _.each(this.model.models, function (message) {
            $(this.el).append(new MessageListItemView({model:message}).el);
        }, this);
        return this;
    }
});

window.MessageListItemView = Backbone.View.extend({

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
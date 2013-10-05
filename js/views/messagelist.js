window.MessageListView = Backbone.View.extend({

    tagName:'ul',

    //className:'nav nav-list',

    initialize:function () {
        console.log('Initializing MessageListView');         
        this.render();
    },

    render:function (){
        var self = this;
        $(this.el).empty();            
        $(self.el).append('<li><a href="#message">Detalhes das mensagens</a></li>');
        _.each(this.model.models, function (message) {            
            utils.getUser(message.get('sender'), function(sender){
                message.set("profilePicture", sender.profilePicture);
                message.set("senderName", sender.name);                
                $(self.el).append(new MessageListItemView({model:message}).el);
            });
        }, this);
        return this;
    }
});

window.MessageListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        console.log('Initializing MessageListItemView');
        this.render();
    },

    render:function () {                
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
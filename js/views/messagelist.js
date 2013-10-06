window.MessageListView = Backbone.View.extend({

    tagName:'ul',    

    initialize:function () {
        console.log('Initializing MessageListView');
        this.render();
    },    

    render:function (){
        var self = this;
        $(this.el).empty();          
        $(self.el).append('<li><a href="#message" role="presentation">Detalhes das mensagens</a></li>');
        _.each(this.model.models, function (message) {            
            utils.getUser(message.get('sender'), function(sender){
                message.set("profilePicture", sender.profilePicture);
                message.set("senderName", sender.name);                
                $(self.el).append(new MessageListItemView({model:message}).el);
            });
        }, this);
        $(this.el, '.ul').attr({"role": "menu", "class": "message-list dropdown-menu"});
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
        $(this.el, '.li').attr("role","presentation");
        return this;
    }
});
window.HeaderView = Backbone.View.extend({    

    initialize: function () {                
        console.log('Initializing Header View');         
        this.msgIcon = true;
        this.render();        
    },
    
    render: function () {                
        $(this.el).html(this.template());   
        return this;
    },

    events: {
        "click #message" : "toggleMessageList"                
    },

    showMessageList: function(){        
        var messages = new MessageCollection();        
        var messageListView = new MessageListView({model: messages, className: 'dropdown-menu message-list'}); 
        $('#message-list', this.el).append(messageListView.el);
        messages.test();
        setTimeout(function () {
            //$('#message-list').addClass('open');
        });
    },
        
    toggleMessageList: function(id){
        var element = document.getElementById("message");
        if(this.msgIcon){            
            element.style.opacity="1.0";
            this.showMessageList();
            this.msgIcon = false;
        }else{
            element.style.opacity="0.1";
            //$('#message-list').removeClass('open');            
            this.msgIcon = true;
        }
    }
});
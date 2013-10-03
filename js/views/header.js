window.HeaderView = Backbone.View.extend({    

    initialize: function () {                
        console.log('Initializing Header View'); 
        this.searchResults = new UserCollection();
        this.searchresultsView = new SearchUserListView({model: this.searchResults, className: 'dropdown-menu dropdown-user-search'});
        this.msgIcon = true;
        this.render();        
    },    
    
    render: function () {                
        $(this.el).html(this.template());          
        $('#dropdown-user-search', this.el).append(this.searchresultsView.el);
        this.alignmentUserLogginOption();
        return this;
    },

    events: {
        "click #message"       : "toggleMessageList",                 
        "keyup #user-search"   : "search",
        "keypress #user-search": "onkeypress",
        "click #logoutOption"  : "alignmentUserLogginOption",
        "click #loginButton"   : "alignmentUserLogginOption"
    },

    search: function () {
        var self = this;
        var key = $('#user-search').val();
        key = key.replace(" ","%");
        console.log('search ' + key);
        this.searchResults.findByName(key);
        setTimeout(function () {                    
            $('#dropdown-user-search', self.el).append(self.searchresultsView.el);
            $('#dropdown-user-search').addClass('open');
        });
    },

    onkeypress: function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    },

    showMessageList: function(){                
        utils.sessionInfo(function(sessionInfo){
            utils.receivedMessage(sessionInfo['id'], function(receivedMessagesData){
            var messages = new MessageCollection(receivedMessagesData);                        
            var messageListView = new MessageListView({model: messages, className: 'dropdown-menu message-list'}); 
            $('#message-list', this.el).append(messageListView.el);
        });
        });        
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
    },

    alignmentUserLogginOption: function(){
        utils.isLogged(function(islogged){
            if (islogged == true){
                $('#userLoginOptions', self.$el).removeClass("pull-right");
            }else{
                $('#userLoginOptions', self.$el).addClass("pull-right");
            }
        });
    }

});
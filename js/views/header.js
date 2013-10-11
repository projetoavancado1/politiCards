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
        return this;
    },

    events: {
        "click #message"       : "toggleMessageList",
        "click #new-user"      : "toggleRequests",
        "keyup #user-search"   : "search",
        "keypress #user-search": "onkeypress"
    },

    //copy of the toggleMessageList
    toggleRequests: function(){
        var element = document.getElementById("new-user");
        if(this.msgIcon){
            element.style.opacity="1.0";
            // uncomment the line below for activate resquest list
            //this.showRequests();
            this.msgIcon = false;
        }else{
            element.style.opacity="0.1";
            this.msgIcon = true;
        }
    },

    showRequests: function(){
        utils.sessionInfo(function(sessionInfo){
            utils.getFriendRequestsOfUser(sessionInfo['id'], function(requests){
                var requestsCollection = new FriendRequestCollection(requests);
                var requests = new FriendRequestListView({model: requestsCollection});
                $('#requests', this.el).append(requests.el);

            });


        });

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
            var messageListView = new MessageListView({model: messages});
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
    }

});
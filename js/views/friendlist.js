window.FriendListView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing FriendListView');    
        this.render();
    },

    render: function () {
        var users = this.model.models;
        var len = users.length;
        var usersPerPage = 12;
        var userPerLinePage = 4;       

        var userCount = 0;
        for(var i = 0; i < usersPerPage/userPerLinePage && userCount < len; i++){
            $(this.el).append('<ul id="thumbnails'+i+'" class="thumbnails"></ul>');
            for(var j = 0; j < userPerLinePage && userCount < len; j++){
                $('#thumbnails'+i, this.el).append('<li class="span3">'+ //users[userCount++]
                                                        '<a href="#" class="thumbnail inner-border">'+
                                                            '<span></span><img src="http://placehold.it/60x60" alt="">'+
                                                        '</a>'+
                                                    '</li>');
            }
        }
                

        return this;
    }
});
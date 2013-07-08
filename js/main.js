var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "users/page/:page"	: "list",
        "users/add"         : "addUser",
        "users/edit/:id"    : "editUser",
        "users/:id"         : "userDetails",
        "login"             : "login",
        "logout/:id"        : "logout"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            $("#content").html(new UserListView({model: userList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    editUser: function (id) {
        var user = new User({id: id});
        user.fetch({success: function(){
            $("#content").html(new UserView({model: user}).el);
        }});
        this.headerView.selectMenuItem();
    },

    userDetails: function (id) {
        var user = new User({id: id});
        user.fetch({success: function(){
            $("#content").html(new UserSummaryView({model: user}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addUser: function() {        
        var user = new User();
        $('#content').html(new UserView({model: user}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    login: function() {
        $('#content').html(new LoginView().render().el);        
        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        $.ajaxSetup({
            statusCode: {
                401: function(){
                    // Redirec the to the login page.
                    window.location.replace('/#login');             
                },
                403: function() {
                    // 403 -- Access denied
                    window.location.replace('/#denied');
                }
            }
        });
    },


    logout:function (id){        
           
        var url = '../api/logout';
        console.log('Logout... ');
        var logoutValue = {
            id: id
        };
        window.location.replace('#');             
        $.ajax({
            url: url,
            type:'POST',
            dataType:"json",
            data: logoutValue
            /*
            success:function (data) {
                //console.log(["Login request details: ", data]);
               
                if(data.error) {  // If there is an error, show the error messages
                    $('.alert-error').text(data.error.text).show();
                }
                else { // If not, send them back to the home page                    
                    window.location.replace('#users/'+data.id);                       

                    var user = new User({id: data.id,
                                         name: data.name,
                                         profilePicture: data.profilePicture});   
                    console.log(data);     
                    $('#userLoginOptions').html(new UserLoginOptionsView({model: user}).render().el);                            
                }
            }*/
            
        });
    },
     

    home: function(){
        $('#content').html(new HomeView().render().el);
    }
    
});

utils.loadTemplate(['HeaderView', 'UserView', 'UserListItemView', 
                    'LoginView', 'HomeView', 'UserSummaryView',
                    'UserLoginOptionsView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});


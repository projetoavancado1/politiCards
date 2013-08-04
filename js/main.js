var AppRouter = Backbone.Router.extend({

    routes: {
        ""                    : "home",
        "users/page/:page" 	  : "list",
        "users/add"           : "addUser",
        "users/edit/:id"      : "editUser",
        "users/:id"           : "userDetails",
        "login"               : "login",      
        "posts/edit/:id"      : "editPost",
        "posts/new"           : "createPost",
        "posts/page/:page"    : "listPosts",
        "my/posts/page/:page" : "listMyPosts",
        "posts/:id"           : "showPost"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
        $('#userLoginOptions').html(new UserLoginOptionsView().el);
        
        utils.renderMenuNavigation();
       
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            $("#content").html(new UserListView({model: userList, page: p}).el);
        }});
       
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
        postUtils.getPostsOfUser(id, function(data){
            //var p = page ? parseInt(page, 10) : 1;
            var postList = new PostCollection(data);
            $("#content").append(new PostListView({model: postList, page: 1}).el);
        });
        //cria o menu navigation quando logamos no sistema
        utils.renderMenuNavigation();
        
        //this.headerView.selectMenuItem();
    },

	addUser: function() {        
        var user = new User();
        $('#content').html(new UserView({model: user}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    login: function() {            
        var loginData = {email: $('#email-auth').length > 0? $('#email-auth').val(): "", 
                         password: $('#password-auth').length > 0? $('#password-auth').val(): "",
                         erroMessage: $("#erroMessage").text()};
        $('#content').prepend(new LoginView(loginData).el);         
        $('#loginModal').on('show', function (){
            $('#userLoginOptions').html("");
            if($("#errorAlert").text().length > 0){
                $("#errorAlert").show();       
            }else{
                $("#errorAlert").hide();                  
            }
        });        
        $('#loginModal').on('hide', function (){
            $('#userLoginOptions').html(new UserLoginOptionsView().el);                    
            window.location.replace('#');
        });
        $('#loginModal').modal('show');                        
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
     
    home: function(){
        $('#content').html(new HomeView().render().el);                                         
        this.headerView.selectMenuItem();
    },

    editPost: function(id){
        var post = new Post({id: id});
        post.fetch({success: function(){
            $("#content").html(new PostView({model: post}).el);
        }});
    },

    createPost: function(){        
        utils.sessionInfo(function(data){
           var post = new Post({author: data.id});           
           $('#content').html(new PostView({model: post}).el);
        });                
    },

    listPosts: function(page){
        var p = page ? parseInt(page, 10) : 1;
        var postList = new PostCollection();
        postList.fetch({success: function(){
            $("#content").html(new PostListView({model: postList, page: p}).el);
        }});
        //this.headerView.selectMenuItem('list-menu');
    },

    listMyPosts: function(page){
        postUtils.getPostsOfLoggedUser(function(data){
            console.log("qtde de posts: "+ data.length);
            var p = page ? parseInt(page, 10) : 1;
            var postList = new PostCollection(data);
            $("#content").html(new PostListView({model: postList, page: p}).el);
        });
        this.headerView.selectMenuItem('list-menu');

    },

    createListCommentsOfPost:function(postID){
        postUtils.getCommentsOfPost(postID,function(data){
            var commentList = new CommentCollection(data);            
        });
    },

    showPost:function(id){
        postUtils.showPost(id);
    }
});

utils.loadTemplate(['HeaderView', 'UserView','UserListItemView','PostShowView', 'PostItemView', 
                    'CommentView','LoginView', 'HomeView', 'UserSummaryView', 'PostView',
                    'CommentItemView','MenuNavigationView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
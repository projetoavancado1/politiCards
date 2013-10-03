window.LoginView = Backbone.View.extend({

    initialize:function(loginData){
        console.log('Initializing Login View');        
        this.render(loginData);                
    },

    events: {        
        "click #loginButton" : "login"
    },

    render:function(loginData){                   
        $(this.el).html(this.template(loginData));                                          
        return this;
    },

    login:function (event){        
        event.preventDefault(); // Don't let this button submit the form        
        $('.alert-error').hide(); // Hide any errors on a new submit        
        var email = $('#email').val();
        var password = $('#password').val();
        utils.login(email, password, function(loginInfo){
            if(loginInfo.error) {  // If there is an error, show the error messages                
                $('.alert-error').text(loginInfo.error.text).show();
            }else { // If not, send them back to the home page                                    
                $('#loginModal').modal('hide');
                $('#loginModal').remove();
                window.location.replace('#users/'+loginInfo.id);                                                           
                $('#userLoginOptions').html(new UserLoginOptionsView().el);                
            }
        });                    
    },
});

window.UserLoginOptionsView = Backbone.View.extend({                

    initialize:function (){
        console.log('Initializing User Login Options View');                
        this.render();                
    },

    events: {            
        "click #logoutOption": "logout",
        "click #loginButton" : "login"
    },            

    render:function (){                
        console.log("Rendering UserLoginOptionsView");
        var self = this;
        utils.isLogged(function(islogged){
            if (islogged == true){                
                utils.sessionInfo(function(sessionUserInfo){                                        
                    $.get('tpl/LoggedHeaderView.html', function(data) {                        
                         this.template = _.template(data, sessionUserInfo);                                                 
                         self.$el.html(this.template);                         
                    });                    
                });
            }else{                                
                $.get('tpl/UnLoggedHeaderView.html', function(data){                                            
                    this.template = _.template(data); 
                    self.$el.html(this.template);                           
                });                     
            }   
        });            
        return this;
    },

    login:function (event){        
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var email = $('#email-auth').val();
        var password = $('#password-auth').val();
        utils.login(email, password, function(loginInfo){
            if(loginInfo.error) {  // If there is an error, show the error messages
                window.location.replace("#login");  
                $('#erroMessage').text(loginInfo.error.text);
            }else { // If not, send them back to the home page
                window.location.replace('#users/'+loginInfo.id);                                                           
                $('#userLoginOptions').html(new UserLoginOptionsView().el);
            }
        });                    
    },

    logout: function(){        
        //assegura que o menu navigation será removido após o logout
        utils.deleteMenuNavigation();        
        window.location.replace('#');
        utils.logout();        
        this.render();
    }

});
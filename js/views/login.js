window.LoginView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Login View');       
    },

    events: {        
        "click #loginButton": "login"
    },

    render:function (){
        $(this.el).html(this.template());
        return this;
    },

    login:function (event){
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = '../api/login';
        console.log('Loggin in... ');
        var formValues = {
            email: $('#email').val(),
            password: $('#password').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,            
            success:function (data) {                               
                if(data.error) {  // If there is an error, show the error messages
                    $('.alert-error').text(data.error.text).show();
                }
                else { // If not, send them back to the home page                    
                    window.location.replace('#users/'+data.id);                                                           
                    $('#userLoginOptions').html(new UserLoginOptionsView().el);
                }
            }
        });
    }
});

window.UserLoginOptionsView = Backbone.View.extend({                

    initialize:function (){
        console.log('Initializing User Login Options View');                
        this.render();                
    },

    
    events: {            
        "click #logoutOption": "logout"
    },

    logout: function(){
        window.location.replace('#');
        utils.logout();        
        this.render();
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
    }

});
window.LoginView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Login View');
    },

    events: {
        "click #loginButton": "login"
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = '../api/login';
        console.log('Loggin in... ');
        var formValues = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
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
                    $('#userLoggof').html(new UserLoginOptionsView({model: user}).render().el);                            
                }
            }
        });
    }
});


window.UserLoginOptionsView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing User Login Options View');
        this.render();
    },

    events: {
        
    },

    render:function () {                
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

    /*
    login:function (event) {
        $("#userLoggof").html(this.template());
    }
    */
});
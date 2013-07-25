window.UserView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing User View');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"                  : "change",
        "click .save"             : "beforeSave",
        "click .delete"           : "deleteUser",        
        "change  #profilePicture" : "profilePictureUpload"        
    },

    //drop after presentation
    showCalendar: function(event){
        $("#birthday").datepicker({
            yearRange: "1900:2023",
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            showAnim: "slideDown",
            duration: "slow"
        }); 
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
        
    },

    beforeSave: function () {          
        var check = this.model.validateAll();
        if (check.isValid === false){            
            utils.displayValidationErrors(check.messages);
            return false;
        }
        if (this.pictureFile) {            
            this.model.set("profilePicture", "../img/profilePictures/"+this.pictureFile.name);            
            utils.uploadFile(this.pictureFile, null);
        }
        this.saveUser();
        return false;                
    },

    
    saveUser: function () {
        var self = this;
        console.log(this.model.toJSON());
        this.model.save(null, {
            success: function(model){
                self.render();                
                //app.navigate('users/' + model.id, false);                
                utils.showAlert('Sucesso!', 'Usuário salvo corretamente.', 'alert-success');
                utils.isLogged(function(islogged){                    
                    if (islogged == false){   
                        utils.login(model.get("email"), model.get("passWord"), function(){});
                        window.location.replace('#');
                        $('#userLoginOptions').html(new UserLoginOptionsView().el);                
                    }
                });
            },
            error: function () {
                utils.showAlert('Erro!', 'Um erro correu enquanto tentava salvar o usuário.', 'alert-error');
            }
        });
    },

    deleteUser: function () {
        this.model.destroy({
            success: function () {
                alert('Usuário removido com sucesso');
                //window.history.back();                
                window.location.replace('#');
                utils.logout();
            },

            error: function(){
                alert("Retorna error, mas exclui!");
            }
        });
        return false;
    },        
    
    profilePictureUpload: function (event){                          

        var files = event.target.files; // FileList object
        //render image files as thumbnails.        
        this.pictureFile = files[0];
        if (!this.pictureFile.type.match('image.*')){
            alert('Escolha um arquivo de imagem');
            return false;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onloadend = function (){
            $('#viewProfilePicture').attr('src', reader.result).width(180).height(200);                                
        };                
        // Read in the image file as a data URL.
        reader.readAsDataURL(this.pictureFile);
    }

});



window.UserSummaryView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified

    initialize: function () {
        console.log('Initializing Summary View');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change" : "render"        
    }

});
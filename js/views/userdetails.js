window.UserView = Backbone.View.extend({

    initialize: function () {
        console.log('Initializing User View');    
        this.render();        
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));                
        $('#gender option[name="'+this.model.attributes.gender+'"]', this.$el).attr({selected : "selected" });        
        $('#userType option[name="'+this.model.attributes.userType+'"]', this.$el).attr({selected : "selected" });
        return this;
    },

    events: {
        "change"                  : "change",
        "click .save"             : "beforeSave",
        "click .delete"           : "deleteUser",        
        "change  #profilePicture" : "profilePictureUpload"
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
        var check = utils.validateItem(target.id, this.model);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
        
    },

    beforeSave: function () {                          
        var check = utils.validateAll(this.model);
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
                utils.showAlert('Sucesso!', 'Usuário cadastrado com sucesso.', 'alert-success');                
                utils.isLogged(function(islogged){                    
                    if (islogged == false){   
                        app.navigate('#');
                        /*
                        utils.login(model.get("email"), model.get("passWord"), function(){});
                        window.location.replace('#');
                        $('#userLoginOptions').html(new UserLoginOptionsView().el);                
                        */
                    }
                });
                
            },
            error: function () {
                utils.showAlert('Erro!', 'Um erro correu enquanto tentava salvar o usuário. Por favor, tente mais tarde.', 'alert-error');
            }
        });
    },

    deleteUser: function () {
        this.model.destroy({
            success: function () {
                alert('Usuário removido com sucesso');
                //window.history.back();                                                
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
        if(!this.pictureFile.type.match('image.*')){
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

    initialize: function () {
        console.log('Initializing Summary View');    
        this.render();
    },

    events: {
        "change" : "render",
        "click #relationship-button"  : "createFriendRequest"        
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template(this.model.toJSON()));
        utils.sessionInfo(function(loggedUserInfo){
            if(loggedUserInfo["id"] == self.model.attributes.id){
                $('.form-actions', this.el).prepend('<a href="#/users/edit/'+self.model.attributes.id+'" class="btn save">Editar Dados</a>');
            }
        });        
        return this;
    },

    createFriendRequest: function(id){
        utils.createFriendRequest(this.model.attributes.id);
    },

    relationshipInformation: function(user){
        utils.relationshipStatus(user, function(status){    
            if(status == "not-friends"){
                $("#relationship-button").removeClass("btn-primary");
                $('#relationship-button').attr('disabled','disabled');
                
                if(status == "friends"){                
                    $('#relationship-button').text('Amigos');
                }else if(status == "friendshipEvaluation"){ 
                    $('#relationship-button').text('Solicitação de amizade enviada');
                }
            }            
        });
    }

});
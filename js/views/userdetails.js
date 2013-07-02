window.UserView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteUser",
        "click  #profilePictureUpload" : "profilePictureUpload"        
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
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }

        /*
           // Upload picture file if a new file
        if (this.pictureFile) {
            this.model.set("profilePicture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function () {
                    self.saveUser();
                }
            );
        } else {
            this.saveUser();
        }           
        */
        this.saveUser();
        return false;                
    },

    
    saveUser: function () {
        var self = this;
        console.log(this.model.toJSON());
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('users/' + model.id, false);
                utils.showAlert('Sucesso!', 'Usuário salvo corretamente', 'alert-success');
            },
            error: function () {
                utils.showAlert('Erro', 'Um erro correu enquanto tentava salvar o usuário', 'alert-error');
            }
        });
    },
    

    /*
    saveUser:function (){        
        var self = this;
        this.model.set({
            name:$('#name').val(),
            email:$('#email').val(),
            gender:$('#gender').val(),
            birthday:$('#birthday').val(),
            passWord:$('#passWord').val(),
            //profilePicture:$('#profilePicture').val(),            
            userType:$('#userType').val()            
        });        
        this.model.save(null,{
            success: function (model) {
                self.render();                
                app.navigate('users/' + model.id, false);
                utils.showAlert('Sucesso!', 'Usuário salvo corretamente', 'alert-success');
            },
            error: function () {
                utils.showAlert('Erro', 'Um erro correu enquanto tentava salvar o usuário', 'alert-error');
            }
        });
    },
    */

    deleteUser: function () {
        this.model.destroy({
            success: function () {
                alert('Usuário removido com sucesso');
                window.history.back();
            }
        });
        return false;
    },    
    
    profilePictureUpload: function (event) {          
        alert('Implementar upload de imagem');
        /*
        var files = event.target.files;
        if(files){
            this.pictureFile = files[0];
            var reader = new FileReader();
            reader.onloadend = function (){
                $('#profilePicture').attr('src',reader.result).width(180).height(200);
            };
            reader.readAsDataURL(this.pictureFile);        
        }
        */       
    }

});
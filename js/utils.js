window.utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },

    uploadFile: function (file, callbackSuccess) {
        var self = this;
        var data = new FormData();
        data.append('file', file);
        $.ajax({
            url: 'api/upload.php',
            type: 'POST',
            data: data,
            processData: false,
            cache: false,
            contentType: false
        })
        .done(function () {
            console.log("Upload de "+file.name + " realizado com sucesso");
            callbackSuccess();
        })
        .fail(function () {
            self.showAlert('Erro!', 'Um erro ocorreu enquanto fazia upload do arquivo ' + file.name, 'alert-error');
        });
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) 
                this.addValidationError(key, messages[key]);
        }
        this.showAlert('Aviso!', 'Corriga os erros de validação e tente novamente', 'alert-warning');
    },

    addValidationError: function (field, message) {        
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },

    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    hideAlert: function() {
        $('.alert').hide();
    },

    isLogged: function(callback){        
        var url = '../api/islogged';
        console.log('islogged... ');                                      
        $.ajax({
            url: url,
            type:'GET',
            dataType:"json",
            success:function (data) {                                                                                                    
                callback(data["islogged"]);
            },
        });        
    },

    getUser: function(id, user_callback){
        var url = '../api/users/'+id;
        console.log('islogged... ');                                      
        $.ajax({
            url: url,
            type:'GET',
            dataType:"json",
            success:function (data) {                                                                                                    
                user_callback(data);
            },
        });
    },

    sessionInfo: function(callback){        
        var url = '../api/sessionInfo';
        console.log('sessionInfo... ');                                      
        $.ajax({
            url: url,
            type:'GET',
            dataType:"json",
            success:function (data) {   
                //console.log("Session Info: ");
                //console.log(data);                                                                                                 
                callback(data);
            },
        });        
    },

    login:function (email, password, callback){
        var url = '../api/login';
        console.log('Loggin in... ');
        var formValues = {
            email: email,
            password: password
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,            
            success:function (data) {        
                callback(data);                                       
            }
        });
    },


    logout:function(){                   
        var url = '../api/logout';
        console.log('Logout... ');                           
        $.ajax({
            url: url,
            type:'GET'
        });                            
    },

    getPostsOfUser:function(callback){
        utils.sessionInfo(function(data){
            var userID =data.id;
            var url = '../api/posts/my/'+ userID;
            
            $.ajax({
                url:url,
                type:'GET',
                dataType:"json",            
                success:function (data) {        
                    callback(data);                                       
                }
            });
        
        });
        
    },

    getCommentsOfPost:function(postID, callback){

        var url = "../api/comments/list/"+postID;

         $.ajax({
                url:url,
                type:'GET',
                dataType:"json",            
                success:function (data) {        
                    callback(data);                                       
                }
            });

    }

};
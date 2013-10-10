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
            console.log("Upload de "+file.name + " realizado com sucesso.");
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
        this.showAlert('Aviso!', 'Corriga os erros de validação e tente novamente.', 'alert-warning');
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
        console.log('getUser... ');
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
        console.log('login... ');
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

    renderMenuNavigation:function(){
        utils.isLogged(function(state){
             //verifica se o usuário está logado, se sim, renderiza o menu navigation
            if(state){
                //cria o menu navigation, quando atualizamos a página
                $('.menu').html(new MenuNavigationView().el);
            }
        });
    },

    //garante a exclusão do menu navigation após logout
    deleteMenuNavigation: function(){
        $('.menu').html("<div />");
    },

    getFriendRequestsOfUser:function(userId, callback){
        var url = '../api/friendrequest/'+ userId;

        $.ajax({
            url:url,
            type:'GET',
            dataType:"json",
            success:function (data) {
                callback(data);
            }
        });
    },

    validateItem: function (key, model){
        return (model.validators[key]) ? model.validators[key](model.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function (model){

        var messages = {};

        for (var key in model.validators) {
            if(model.validators.hasOwnProperty(key)) {
                var check = model.validators[key](model.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    receivedMessage:function(user, callback){
        var url = '../api/messages/received/'+user;
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data){
                callback(data);
            }
        });
    },

    sentMessage:function(user, callback){
        var url = '../messages/sent/'+user;
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function(data){
                callback(data);
            }
        });
    },

    createFriendRequest:function(target_user){
        utils.sessionInfo(function(session){
            var user = session.id;

            console.log(user);
            console.log(target_user);

            var friendrequest = {
                requestingUser:user,
                targetUser:target_user
            };

            console.log(friendrequest);

            var url = '../api/friendrequest';

            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: friendrequest,
                success:function (data) {
                    callback(data);
                }
            });
        });

    },

};

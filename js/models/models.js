window.User = Backbone.Model.extend({

    urlRoot: "../api/users",
    
    
    initialize: function () {
        this.validators = {},

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um nome"};
        };

        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um email"};
        };    

        this.validators.gender = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um sexo"};
        };

        this.validators.birthday = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir a data de nascimento"};
        };

        this.validators.passWord = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir uma senha"};
        };

        /*
        this.validators.userType = function (value) {
            return value in {1,2} ? {isValid: true} : {isValid: false, message: "Você precisa inserir o tipo do usuário"};
        };
        */
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }        

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        email: "",        
        gender: "Masculino",
        birthday: "1970-01-01",
        passWord: "",
        profilePicture: "../img/profilePictures/defaultPicture.jpg",
        userType: null
    }
    
});

window.UserCollection = Backbone.Collection.extend({

    model: User,
    url:"../api/users"    

});


// Model Post

window.Post = Backbone.Model.extend({

    urlRoot: "../api/posts",
    
    defaults: {
        id: null,
        senderUser: "",
        content: "",        
        comments: null
    }
});


window.PostCollection = Backbone.Collection.extend({

    model: User,
    url:"../api/posts"    

});


window.User = Backbone.Model.extend({

    urlRoot: "../api/users",
    
    
    initialize: function () {
        this.validators = {},

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um nome."};
        };
        
        this.validators.email = function (value) {                                    
            var returnData = {isValid: true};
            if(! value.length > 0)
                returnData = {isValid: false, message: "Você precisa inserir um e-mail."};
            else{
                var atpos = value.indexOf("@");
                var dotpos = value.lastIndexOf(".");    
                if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= value.length)
                    returnData = {isValid: false, message: "Insira um e-mail válido."};
            }
            return returnData;
        },

        this.validators.gender = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um sexo."};
        };

        this.validators.birthday = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir a data de nascimento."};
        };

        this.validators.passWord = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir uma senha."};
        };
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
        author: "",
        title: "",
        text: ""
    }
});

window.PostCollection = Backbone.Collection.extend({
    model: Post,
    url:"../api/posts"    
});


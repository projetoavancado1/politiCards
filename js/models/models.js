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

        this.validators.userType = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir o tipo de usuário."};
        };
    },
    
    defaults: {
        id: null,
        name: "",
        email: "",        
        gender: "",
        birthday: "1970-01-01",
        //birthday: "",
        passWord: "",
        profilePicture: "../img/profilePictures/defaultPicture.jpg",
        userType: ""
    }
    
});

window.UserCollection = Backbone.Collection.extend({

    model: User,
    url:"../api/users",

    findByName:function (key) {
        var url = (key == '') ? '../api/users' : "../api/users/search/" + key;
        console.log('findByName: ' + key);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    } 
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

// Model Comment 

window.Comment = Backbone.Model.extend({

    urlRoot: "../api/comments",
    defaults:{
        id: null,
        author: "",
        post: "",
        text: ""
    },

    validate: function(values){
        if(values.text == ""){
            return 'Digite um comentário';
        }
    }
});

window.CommentCollection = Backbone.Collection.extend({

    model: Comment,
    url: "../api/comments"

});

window.FriendRequest = Backbone.Model.extend({
    urlRoot: "../api/friendrequests",
    defaults:{
        requestingUser:"",
        targetUser:""
    }

});

window.FriendRequestCollection = Backbone.Collection.extend({
    model: FriendRequest,
    url:"../api/friendrequests"    
});

// Message Model

window.Message = Backbone.Model.extend({

    urlRoot: "../api/messages",

    initialize: function () {
        
        this.validators = {},

        this.validators.title = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um título."};
        };

        this.validators.text = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Você precisa inserir um texto."};
        };
    },
    
    defaults: {
        id: null,
        sender: "",
        receiver: "",
        title: "",
        text: "",
        wasRead: 0
    }
});

window.MessageCollection = Backbone.Collection.extend({
    model: Message,
    url:"../api/messages",
});
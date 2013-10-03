window.TableMessageView = Backbone.View.extend({

    className: "table table-bordered table-hover",

    initialize:function(){
        console.log("Starting Table Message View...");        
        
        this.MESSAGES = {
            SENT     : 0,
            RECEIVED : 1
        };

        this.render();
    },

    render:function(){
        this.bildTable(3, this.MESSAGES.SENT);
        return this;
    },

    bildTable: function(userID, MESSAGE_TYPE){
      $(this.el).html('<table>'+
                        '<thead></thead>' +
                        '<tbody></tbody>' +
                      '</table>');      

      //var thead = [];   
      var self = this;   
      if(MESSAGE_TYPE == this.MESSAGES.SENT){
          this.sentMessages(userID, function(messages){
              self.bildTableAux(messages, MESSAGE_TYPE, userID);
          });   
      }else{
          this.receivedMessages(userID, function(messages){
              self.bildTableAux(messages, MESSAGE_TYPE, userID);
          });   
      }
    },

    bildTableAux: function(messages, MESSAGE_TYPE, userID){   
        utils.getUser(userID, function(user){
            for(var i = 0; i < messages.length; ++i){
                $('tbody', this.el).append("<tr><a>" +
                                              '<th>'+user['name']+'</th>' +
                                              '<th>'+messages[i]['title']+'</th>' +
                                              '<th>'+messages[i]['text']+'</th>' +
                                            "</a><tr>");
            }
        });             
    },    

    sentMessages: function(userID, callback){        
        var url = '../api/messages/sent/' + userID;
        console.log('Sent Messages... ');                                      
        $.ajax({
            url: url,
            type:'GET',
            dataType:"json",
            success:function (data) {                                                                                                                    
                callback(data);
            },
        })
    },

    receivedMessages: function(userID, callback){        
        var url = '../api/messages/received/' + userID;        
        console.log('Received Messages');
        $.ajax({
            url: url,
            type:'GET',
            dataType:"json",
            success:function (data) {                                                                                                                    
                callback(data);
            },
        })
    }
});
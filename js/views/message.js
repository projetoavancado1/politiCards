window.MessageView = Backbone.View.extend({

  events: {
      "change"                           : "change",
      "click #sendMessageButton"         : "beforeSend",
      "click #deleteMessageButton"       : "deleteMessage",
      "click #sendOtherMessage"          : "render",
  },  

  initialize: function(){
    console.log("Starting Message View");        
    this.render();
  },

  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    $("#message-action",this.el).append('<a id="sendMessageButton"'+ 
                                        'class="btn btn-primary save pull-right">Enviar Mensagem</a>');
    return this;
  },

  change: function (event) {    
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

  beforeSend: function () {                          
        var check = utils.validateAll(this.model);
        if (check.isValid === false){            
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.sendMessage();
        return false;                
    },

  sendMessage: function(){

      var self = this;      

      this.model.save(null, {
          success: function (model) {              
              utils.showAlert('Sucesso!', 'Sua mensagem foi enviada com sucesso.', 'alert-success');                
              $("#textInput").toggle();
              $("#message-action").html('<a id="sendOtherMessage"class="btn btn-primary save">Enviar outra mensagem</a> '+
                                        '<a href="#users/<%= receiver %>" class="btn delete">Voltar</a>');
          },
          error: function () {
              utils.showAlert('Erro:', 'Um erro correu na criação desta mensagem.', 'alert-error');
          }
      });
  },

  deleteMessage:function(){  
    this.model.destroy({
          success: function () {
              alert('Mensagem removida');
              window.location.replace('#');
          },
          error: function(){
              alert("Não foi possível remover esta mensagem!");
          }
      });
      return false;
  }
})

window.MessageDetailsView = Backbone.View.extend({

    initialize: function(){
        console.log("Starting Message Details View");        
        this.render();
    },

    render: function(){
        var self = this;
        var view = 'MessageView';        
        var deferred = $.get('tpl/' + view + '.html', function(data) {            
            self.$el.html(_.template(data, self.model.toJSON()));
            $('#title', self.$el).attr('disabled','disabled');
            $('#text', self.$el).attr('disabled','disabled');
            $("#message-action",self.$el).append('<a href="#message/send/user/'+self.model.get("sender")+'"'+
                                                 'class="btn btn-primary save pull-right">Responder Mensagem</a>');                                                 
        });                     
        return this;
    }
});
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
    $("#textInput",this.el).append('<div>'+
                                        '<a id="sendMessageButton" style="margin-left:427px"'+ 
                                        'class="btn btn-primary save">Enviar Mensagem</a>'+
                                   '</div>');                                                                          
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
              utils.showAlert('Sucesso!', 'Sua mensagem foi enviada com sucesso', 'alert-success');                
              $("#menuOptions").toggle();
              $("#textInput").toggle();
          },
          error: function () {
              utils.showAlert('Erro:', 'Um erro correu na criação desta mensagem', 'alert-error');
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
            //self.prototype.template = _.template(data);                  
            self.$el.html(_.template(data, self.model.toJSON()));
            $('#title', self.$el).attr('disabled','disabled');
            $('#text', self.$el).attr('disabled','disabled');
        });        
        //$(this.el).html(this.template(this.model.toJSON()));
        //this.$el.html(_.template(data, self.model.toJSON()));        
        //alert(this.template(this.model.toJSON()));
        //$(this.el).html(this.template(this.model.toJSON()));
        //console.log(this.el);
        return this;
 
    }
});
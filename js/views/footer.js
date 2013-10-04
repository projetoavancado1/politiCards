window.FooterView = Backbone.View.extend({

    initialize: function () {
    	console.log('Initializing FooterView');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());        
        return this;
    },
});
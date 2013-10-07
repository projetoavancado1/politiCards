window.FacebookLikeBoxView = Backbone.View.extend({

    initialize: function () {
    	console.log('Initializing FacebookLikeBoxView');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());        
        return this;
    },
});
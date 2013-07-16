window.HomeView = Backbone.View.extend({

    initialize: function () {
    	console.log('Initializing Home View');    
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());        
        return this;
    },
});
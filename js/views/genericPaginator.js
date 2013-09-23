window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        console.log('Initializing Paginator View');    
        //this.model.bind("reset", this.render, this);
        this.render();
    },

	events: {
        "reset"                   : "render",
        "click #nextPageList"     : "nextPageList",
        "click #previousPageList" : "previousPageList"                
    },

    nextPageList: function(){

    },

    previousPageList: function(){
    	
    },

    render:function () {

        var items = this.model.models;        
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

    	$('ul', this.el).append("<li id='nextPageList'     class='active'><a> >> </a></li>");		
        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#users/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }
        $('ul', this.el).append("<li id='previousPageList' class='active'><a> << </a></li>");

        return this;
    }
});
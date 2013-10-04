window.PostPaginator = Backbone.View.extend({
    className: "pagination pagination-centered",

    initialize:function () {
        console.log('Initializing Post Paginator View');    
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var boundarElements = 12;
        var length = items.length;
        var pageCount = Math.ceil(length / boundarElements);

        $(this.el).html('<ul/>');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#posts/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});
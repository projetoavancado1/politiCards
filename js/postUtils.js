window.postUtils = {

	showPost:function(id){
        var post = new Post({id: id});
        post.fetch({success: function(){
            $("#content").html(new PostShowView({model: post}).el);  
        }});
        
        this.showCommentsOfPost(id);
        this.showCommentBox(id);
    },

    showCommentBox:function(postID){
        utils.sessionInfo(function(user){
            var comment = new Comment({post: postID, author:user.id});
                $(".comment").html(new CommentView({model: comment}).el);
        });
        
    },

    showCommentsOfPost:function(postID){
        postUtils.getCommentsOfPost(postID, function(comments){
            var commentList = new CommentCollection(comments);
            $(".comments").append(new CommentListView({model: commentList}).el);
        });

    }, 

    updatePostFullView:function(comment){
  		$('.comments').append(new CommentItemView({model: comment}).render().el);
		postUtils.showCommentBox(comment.get("post"));
  	},

    getPostsOfUser:function(userID, posts){                
        var url = '../api/posts/my/'+ userID;
        
        $.ajax({
            url:url,
            type:'GET',
            dataType:"json",            
            success:function (data) {        
                posts(data);                                       
            }
        });                
    },

  	getPostsOfLoggedUser:function(callback){
        var self = this;
        utils.sessionInfo(function(data){
            var userID =data.id;
            self.getPostsOfUser(userID, function(posts){
                callback(posts);
            });
        });        
    },

    getCommentsOfPost:function(postID, callback){

        var url = "../api/comments/list/"+postID;

         $.ajax({
                url:url,
                type:'GET',
                dataType:"json",            
                success:function (data) {        
                    callback(data);                                       
                }
            });
    }

};
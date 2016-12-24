console.log('POSTS controller');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Posts      =  mongoose.model('Post');
var Comments   =  mongoose.model('Comment');

module.exports = {
/* POST "/messages/posts/:id/comments"
   Create a new POST based on form submission.
*/
create: function(req,res){
   console.log('got!!',req.params);
   Posts.findOne({_id: req.params.id}, function(err, post){
    var comment = new Comments({
        _post: req.params.id,
        commentby: req.body.commentby,
        content: req.body.content
    });

    comment.save(function(err,newcomment){
      //console.log('YEAH - GOT THE RETURNED NEW COMMENT', newcomment);
        if(err){
           //console.log('error',err);
           //res.render('index', {title: 'you have errors!', errors: err})
           res.json({
                  errors: {
                       comments: {
                           message: "Could not create comment!",
                           kind: "what didn't work",
                           path: "reference to the schema's name",
                           value: "cause of the initial error"
                       }
                  },
                  name: "Server error"
               });
        }else{
           post.comments.push(comment);
           post.save(function(err){
             if(err){
                res.json({
                      errors: {
                           users: {
                               message: "Could not create comment!",
                               kind: "what didn't work",
                               path: "reference to the schema's name",
                               value: "cause of the initial error"
                           }
                      },
                      name: "Server error"
                   });
             }else{
                res.json(newcomment);
             }
         })
        }
      });
   })
   }

}


console.log('POSTS controller');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Posts      =  mongoose.model('Post');

module.exports = {

// "/messages"
// Index - show all
index: function (req, res){
   console.log('Show all items.');
   Posts.find({})
      .sort({created_at: -1})
      .populate('comments')
      .exec(function(err, data) {
        console.log('it executed',data);
         //res.render('index', {posts: data, moment:moment});
         res.json(data);
      });
},
/* POST "/messages"
   Create a new POST based on form submission.
*/
create: function(req,res){
   console.log('Create POST: action. Post: ',req.body);
   var post = new Posts({
      postedby: req.body.postedby,
      content: req.body.content
   });
   post.save(function(err,newpost){
      if(err){
         console.log('error',err);
         // TODO: RETURN JSON ERROR DATA TO ANGULAR
         res.render('index', {title: 'you have errors!', errors: post.errors})
      }else{
         console.log('YEAH! POST: ',newpost);
         res.json(newpost);
      }
   })
}

}

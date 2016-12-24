app.factory('commentsFactory', function($http, $location){
    let factory = {};
    var comments;


    factory.create = function(id, newcomment,callback){
      console.log('CLIENT COMMENT FACTORY - MAKING NEW....', newcomment);
      // check to be sure there is a name and some content
      // if(!newpost.postedby.length > 2 || !newpost.content.length > 2){
      //     alert('Must enter a name and a post!');
      //     $location.path('/message');
      // } else {
      newcomment.post_id = id;

      ///messages/posts/:id/comments'
          $http.post('/messages/posts/' + id + '/comments', newcomment).then(function(returned_data){
            console.log('Client COMMENTS F - attempt to create new comment returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
              callback(returned_data.data);
            }
          });
      //}
    };

    return factory;
})

app.factory('postsFactory', function($http, $location){
    let factory = {};
    var posts;

    factory.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/messages').then(function(returned_data){
        //console.log('users factory - get users: ', returned_data.data);
        posts = returned_data.data;
        callback(posts);
      });
   };

    factory.create = function(newpost,callback){
      console.log('CLIENT POSTS FACTORY - MAKING NEW....');
      // check to be sure there is a name and some content
      if(!newpost.postedby || !newpost.content){
          alert('Must enter a name and a post!');
          $location.path('/messages');
      } else {
          $http.post('/messages', newpost).then(function(returned_data){
            console.log('Client POSTS F - attempt to create new post returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
              callback(returned_data.data);
            }
          });
       }
    };

    return factory;
})

app.factory('postsFactory', function($http, $location){
    let factory = {};

    factory.create = function(newpost,callback){
      console.log('CLIENT POSTS FACTORY - MAKING NEW....',newpost);
      // check to be sure there is a name and some content
      // if(!newpost.postedby.length > 2 || !newpost.content.length > 2){
      //     alert('Must enter a name and a post!');
      //     $location.path('/message');
      // } else {
          $http.post('/messages', newpost).then(function(returned_data){
            console.log('Client POSTS F - attempt to create new post returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
              callback(returned_data.data);
            }
          });
      //}
    };

    return factory;
})

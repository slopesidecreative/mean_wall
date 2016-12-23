console.log('friends factory js file loaded....');

app.factory('friendsFactory', ['$http', function($http) {
  // constructor
  var friends = [];
  var friend = {};

  function FriendsFactory(){
    var _this = this;

    _this.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/friends').then(function(returned_data){
        //console.log(returned_data.data);
        friends = returned_data.data;
        callback(friends);
      });


    _this.create = function(newfriend,callback){
      $http.post('/friends', newfriend).then(function(returned_data){
        //console.log(returned_data.data);
        // pass the returned data to the callback
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

   //  _this.create = function(newfriend,callback){
   //    console.log('CLIENT FRIEND FACTORY - MAKING NEW....');
   //    if(!newfriend.birthday){
   //        alert('Must enter a date!');
   //        $location.path('/new/friend');
   //    } else {
   //        $http.post('/friends', newfriend).then(function(returned_data){
   //          //console.log('attempt to create new friend returned: ', returned_data.data);
   //          // pass the returned user to the callback
   //          if (typeof(callback) == 'function'){
   //            callback(returned_data.data);
   //          }
   //        });
   //    }
   //  };






    _this.update = function(friendToUpdate,callback){
      //console.log('FF UPDATE GOT: ', friendToUpdate);
      var updateuri = '/friends/' + friendToUpdate._id;
      //console.log('update to this url: ',updateuri);
      $http.put(updateuri, friendToUpdate).then(function(returned_data){
        //console.log('got back an updated friend!',returned_data.data);

        // TODO: CHECK IF THE RETURNED DATA IS AN ERROR
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
         });
    };

    };
    _this.delete = function(_id,callback){// what parameters do we need?
      //console.log('You said to delete: ', _id);
      $http.delete('/friends/' + _id).then(function(returned_data){
        if (typeof(callback) == 'function'){
          callback();
        }
      })
    };
    this.show = function(_id,callback){
     //console.log(' this.show -> get one friend by id');
     $http.get('/friends/' + _id).then(function(returned_data){
      //console.log('got back this one friend: ', returned_data.data);
      friends = returned_data.data;
      callback(friends);
     });
   };
    // GETTERS -----------------------------------
    this.getFriends = function(callback){
      callback(friends);
    };
    this.getFriend = function(callback){
        callback(friend);
    };
  }
  //console.log(new FriendsFactory());
  return new FriendsFactory();
}]);






//
// //FORMAT: app.factory('nameFactory', ['injectedservice',function(injectedservice){ .... }]);
// app.factory('friendsFactory', ['$http', function($http) {
//   /* Our factory is going to provide the methods to gather user data from a RESTful API
//         (we aren't quite there yet, but that's where we are going!)
//       Index: return all users
//       Show: return one user based on an a unique selector(often id)
//       Create: generate a new user
//       Update: update a specific user
//       Delete: remove a specific user
//
//       Our controller is going to determine what happens once we complete the change in the dataset using a callback function.
//       These are denoted below, for clarity as: functionPassedByControllerAsAnArgTo **Method**
//
//       Bonus: convert these callbacks to promises!
//   */
//   function FriendsConstructor() {
//      var friend = {};
//      var friends = [{}];
//
//     this.index = function(functionPassedByControllerAsAnArgToIndex) {
//       // console.log('http: ',$http);
//         $http.get('/friends').then(function(data){
//           if (typeof(functionPassedByControllerAsAnArgToIndex) === 'function') {
//             users = data.data;
//             functionPassedByControllerAsAnArgToIndex(users);
//           }
//         });
//         return;
//       }
//     };
//     /*
//       Creates a newUser by pushing the newUser argument into the users array
//       then runs the callback to return the updated array to controllers
//     */
//     this.create = function(newUser, functionPassedByControllerAsAnArgToCreate) {
//       console.log('factory create called: ',newUser);
//       if (typeof(newUser) === 'object') {
//         users.push(newUser)
//       }
//       if (typeof(functionPassedByControllerAsAnArgToCreate) === 'function') {
//         functionPassedByControllerAsAnArgToCreate(users);
//       }
//     };
//     /* This processes the update to the single user's data that comes from edit */
//     this.update = function(updateUser, idx, functionPassedByControllerAsAnArgToUpdate) {
//       if (users[idx]) {
//         for (var key in updateUser) {
//           users[idx][key] = updateUser[key];
//         }
//       }
//       if (typeof(functionPassedByControllerAsAnArgToUpdate) === 'function') {
//         functionPassedByControllerAsAnArgToUpdate(users[idx]);
//       }
//     }
//
//
//
//    //  this.show = function(idx, functionPassedByControllerAsAnArgToShow) {
//    //    console.log('SHOW CALLED',idx);
//    //    if (typeof(functionPassedByControllerAsAnArgToShow) === 'function') {
//    //      functionPassedByControllerAsAnArgToShow(users[idx]);
//    //    }
//    //  }
//
//    this.show = function(idx, functionPassedByControllerAsAnArgToShow) {
//      console.log('SHOW CALLED',idx);
//
//       $http.get('http://tanjir.com:8081/users/' + idx).then(function(data){
//          console.log('hey i got the single user back!!!!!', data);
//        if (typeof(functionPassedByControllerAsAnArgToShow) === 'function') {
//           user = data.data;
//           functionPassedByControllerAsAnArgToShow(user);
//        }
//       });
//       return;
//    }
//
//     this.delete = function(idx, functionPassedByControllerAsAnArgToDelete) {
//       if (users[idx]) {
//         users.splice(idx, 1);
//       }
//       if (typeof(functionPassedByControllerAsAnArgToDelete) === 'function') {
//         functionPassedByControllerAsAnArgToDelete(users);
//       }
//     }
//   }
//   /*
//     What is this factory returning?  Could we extend this code to be reused?
//   */
//   return (new FriendsConstructor());
// }]);

app.controller('indexController', ['$scope','friendsFactory', 'usersFactory','sessionFactory', '$location','moment',
function($scope, friendsFactory, usersFactory, sessionFactory, location, moment) {

/* LOCKDOWN + + + + + + + + + + + + + +  */
   $scope.cur_user = null;
   sessionFactory.getCurUser(function(data){
      //console.log('returned to client INDEX controller',data);
      if(typeof(data.data) == 'string'){
          location.path('/dashboard');
         }else{
            $scope.cur_user = data;
         }
   });
/* end LOCKDOWN + + + + + + + + + + + + + +  */

$scope.user = {};

var index = function() {
   console.log('index controller -> index() called to kick things off...');
   friendsFactory.index(function beingPassedToTheFactoryIndexByThisController(friendsFromTheFactory) {
     $scope.friends = friendsFromTheFactory;
   });

    usersFactory.index(function beingPassedToTheFactoryIndexByThisController(usersFromTheFactory) {
     $scope.users = usersFromTheFactory;
    });
}
/* FRIENDS + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
$scope.deleteFriend = function(_id){
   friendsFactory.delete(_id, function redirectAfterDelete(data){
      //console.log('successfully deleted: ',data );
      // location.path('/index');
      index();
   });
}

$scope.showFriend = function(_id, context){
   location.path('/friends/' + _id );
}

$scope.updateFriend = function(user_id) {
   location.path('/friends/' + user_id + '/edit');
 }

/* USERS   + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
$scope.addUser = function(){
   //console.log('Friend to be created: ',_this.user);
   usersFactory.create( $scope.user, function newUserCreatedNowRedirect(newUser){
      console.log('USER created and recd by new user controller -> redirect coming...', newUser);
      // console.log('ERRORS CAUGHT READY TO HANDLE: ',newUser);
      if ( newUser.hasOwnProperty('errors') ) {
         if ( newUser.hasOwnProperty('users') ) {
            // came from server-side controller validations
            alert('Create new user failed!' + newUser.errors.users.message);
         }else{
            // came from server-side mongoose model validations
            // TODO: CREATE A LOOP TO OUTPUT SPECIFIC ERRORS
            alert('Create new user failed!' + ' Please enter a valid first and last name.');
         }
         $location.path("/");
      }else{
         $scope.user = {};
         $location.path("/users/" + newUser._id);
      }
   });
}





$scope.deleteUser = function(_id){
   usersFactory.delete(_id, function redirectAfterDelete(data){
      //console.log('User Deleted: ',data );
      index();
   });
}

$scope.showUser = function(_id, context){
   location.path('/users/' + _id );
}

$scope.updateUser = function(user_id) {
   location.path('/users/' + user_id + '/edit');
 }

/* INIT   + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
console.log("loading the index controller...");
index();

}]);

app.controller('indexController', ['$scope','friendsFactory', 'usersFactory','sessionFactory', '$location','moment',
function($scope, friendsFactory, usersFactory, sessionFactory, $location, moment) {

/* LOCKDOWN + + + + + + + + + + + + + +  */
   $scope.cur_user = null;
   sessionFactory.getCurUser(function(data){
      //console.log('returned to client INDEX controller',data);
      if(typeof(data.data) == 'string'){
          $location.path('/dashboard');
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
      // $location.path('/index');
      index();
   });
}

$scope.showFriend = function(_id, context){
   $location.path('/friends/' + _id );
}

$scope.updateFriend = function(user_id) {
   $location.path('/friends/' + user_id + '/edit');
 }


$scope.deleteUser = function(_id){
   usersFactory.delete(_id, function redirectAfterDelete(data){
      //console.log('User Deleted: ',data );
      index();
   });
}

$scope.showUser = function(_id, context){
   $location.path('/users/' + _id );
}

$scope.updateUser = function(user_id) {
   $location.path('/users/' + user_id + '/edit');
 }

/* INIT   + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
console.log("loading the index controller...");
index();

}]);

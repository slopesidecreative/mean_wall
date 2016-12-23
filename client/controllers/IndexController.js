app.controller('indexController', ['$scope','usersFactory','sessionFactory', '$location','moment',
function($scope, usersFactory, sessionFactory, $location, moment) {

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

    usersFactory.index(function beingPassedToTheFactoryIndexByThisController(usersFromTheFactory) {
     $scope.users = usersFromTheFactory;
    });
}
/* USERS + + + + + + + + + + + + + + + + + + + + + + + + + + +  */

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

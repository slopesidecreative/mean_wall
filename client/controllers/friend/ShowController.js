app.controller('showController', ['friendsFactory','$location','$routeParams', function(friendsFactory, $location, $routeParams) {
   var _this = this;
   _this.friend = {};

   _this.getFriend = function() {
      friendsFactory.show($routeParams.id, function passedToFriendFactoryShow(friend) {
      //console.log('this is the friend, based on the id: ',friend);
      // if ( friend.hasOwnProperty('errors') ) {
      //    // handle errors
      //    console.log('ERRORS', friend.errors);
      //    alert('Error! Could not create user!');
      //    $location.path("/index");
      // }else{
         friend.created_birthday = new Date(friend.birthday);
         _this.friend = friend;
      //}
    })
  }
   _this.getFriend();

}]);

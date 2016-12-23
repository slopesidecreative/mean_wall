app.controller('newController', ['friendsFactory','$location', function(friendsFactory, $location) {
   var _this = this;
   _this.friend = {}

   _this.addFriend = function(){
      friendsFactory.create( _this.friend, function newFriendCreatedNowRedirect(newFriend){
         if ( newFriend.hasOwnProperty('errors') ) {
            //console.log(newFriend);
            // handle errors
            console.log('ERRORS', newFriend);
            alert('Error! Could not create friend!');
            $location.path("/index");

         }else{
            console.log('FRIEND created and recd by new friend controller -> redirect coming...', newFriend);
            _this.friend = {};
            $location.path("/friends/" + newFriend._id);

         }

      });
   }
}]);

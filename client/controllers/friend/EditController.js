app.controller('editController', ['friendsFactory', '$location', '$routeParams', function(friendsFactory, $location, rParams) {

   var _this = this;
   _this.friend = {};

   _this.controlValue = "Current Name:";

   _this.getFriend = function() {
      friendsFactory.show(rParams.id, function passedToFriendFactoryShow(friend) {
      //console.log('this is the friend, based on the id: ',friend);
      // ANGULAR requires a type="date" field to be tied to Date object
      friend.created_birthday = new Date(friend.birthday);
      // console.log('friend: IsO',friend.created_birthday.toISOString());
      _this.friend = friend;
    })
  }

  _this.updateFriend = function(){
     // UPDATE THE ISO STRING WITH THE VALUE FROM THE DATE OBJECT
     _this.friend.birthday = _this.friend.created_birthday.toISOString();
      friendsFactory.update(_this.friend, function gotUpdatedFriend(updatedFriend){
      _this.friend = updatedFriend;
      _this.controlValue = "Updated Name: ";
       $location.path("/index");
    });
  }
  /* on load time */
  _this.getFriend();
  console.log(_this);
}]);

console.log('err factory js file loaded....');

app.factory('errFactory', ['$http', function($http) {
  // constructor
  var errors = [];
  var error = {};

  function ErrsFactory(){
    var _this = this;

    _this.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/errs').then(function(returned_data){
        console.log(returned_data.data);
        errs = returned_data.data;
        callback(errs);
      });

    _this.create = function(newerr,callback){
      $http.post('/errs', newerr).then(function(returned_data){
        //console.log(returned_data.data);
        // TODO: CHECK IF THE RETURNED DATA IS AN ERROR

        // pass the returned friend to the callback
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

    _this.update = function(errToUpdate,callback){
      //console.log('FF UPDATE GOT: ', friendToUpdate);
      var updateuri = '/errs/' + errToUpdate._id;
      //console.log('update to this url: ',updateuri);
      $http.put(updateuri, errToUpdate).then(function(returned_data){
        //console.log('got back an updated friend!',returned_data.data);

        // TODO: CHECK IF THE RETURNED DATA IS AN ERROR
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
         });
    };

    };
    _this.delete = function(_id,callback){// what parameters do we need?
      console.log('You said to delete: ', _id);
      $http.delete('/errs/' + _id).then(function(returned_data){
      // TODO: CHECK IF THE RETURNED DATA IS AN ERROR
        if (typeof(callback) == 'function'){
          callback();
        }
      })
    };
    this.show = function(_id,callback){// what parameters do we need?
     //console.log(' this.show -> get one friend by id');
     $http.get('/errs/' + _id).then(function(returned_data){
      //console.log('got back this one friend: ', returned_data.data);

      // TODO: CHECK IF THE RETURNED DATA IS AN ERROR
      errors = returned_data.data;
      callback(errors);
     });
   };
    // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getErrors = function(callback){
      callback(errors);
    };
    this.getError = function(callback){
        callback(error);
    };
  }
  //console.log(new FriendsFactory());
  return new ErrsFactory();
}]);

/* friends controller */
console.log('friends controller');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Friends     =  mongoose.model('Friend');

var dev = true;

module.exports = {
// "/"
// Index - show all
index: function (req, res){
   console.log('FRIEND->INDEX');
   Friends.find({}, function(err, data) {
      //console.log('DB returned: ',data);
      if(err){
         console.log('error ${err.errors}');
         if(dev){ res.json(err) };
      }else{
         //console.log('success: ',data);
         res.json(data);
      }
   })
},
/*
   GET /friends/:id
   Show - view a single friend by ID.
*/
show: function (req, res){
   console.log('FRIEND->SHOW');
   Friends.findOne(
      {
         _id: req.params.id
      },
      function(err, data) {
         if(err){
            console.log('error ${err.errors}');
            if(dev){ res.json(err) };
         }else{
            res.json(data);
         }
   })
},
/* POST
   /items
   Create a new item based on form submission.
*/
create: function (req, res){
   console.log('FRIEND->CREATE');

   // BIRTHDAY VALIDATION
   // note: first_name and last_name are validated in the mongoose model
   var str = req.body.birthday;
   var re = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
   var found = str.match(re);

   if(!found){
      console.log('error - birthday invalid!');
      if(dev){ res.json({"err": {"errors":"invalid date"} }) };
   }else{
      var friend = new Friends({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         birthday: req.body.birthday
      });
      console.log('new friend to create: ',friend);
      friend.save(function(err,newFriend){
         if(err){
            console.log('error ${err.errors}');
            if(dev){ res.json(err) };
         }else{
            // console.log('New Friend Added to db!', newFriend);
            res.json(newFriend);
         }
      })
   }
},
/*    PUT /friends/:id
//    Process editing a friend by ID.
// */
update: function (req, res){
   console.log('FRIEND->UPDATE - EDIT PROCESSING.....');
   // BIRTHDAY VALIDATION
   // note: first_name and last_name are validated in the mongoose model
   var str = req.body.birthday;
   var re = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
   var found = str.match(re);

   if(!found){
      console.log('error - birthday invalid!');
      if(dev){ res.json({"err": {"errors":"invalid date"} }) };
   }else{
      Friends.findOne({_id: req.params.id}, function(err, friend){
         console.log('FRIENDS CONTROLLER: Found the friend to update! ',friend);

         friend.first_name = req.body.first_name;
         friend.last_name = req.body.last_name;
         friend.birthday = req.body.birthday;

         friend.save(function(err,updatedFriend){
          console.log('Updated friend!: ',updatedFriend);
         if(err){
            console.log('error updating ${err.errors}');
            if(dev){ res.json(err) };
            }else{
               // console.log('UPDATED FRIEND, NOW TO REDIRECT....');
               res.json(updatedFriend);
               }
         })
      })
   }
},
/* DELETE /items/:id
   Process deleting an item by ID.
*/
delete: function (req, res){
   console.log('FRIEND->DESTROY');
   Friends.remove(
      {
         _id: req.params.id
      },
      function(err, data) {
      if(err){
         console.log('error ${err}');
         if(dev){ res.json(err) };
      }else{
         res.json({"message": "friend deleted"});
      }
   })
}

} // exports

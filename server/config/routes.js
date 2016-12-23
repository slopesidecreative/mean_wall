console.log('server -> routes.js is loading....');
/* THE JOB OF ROUTES IS TO CALL THE CORRECT CONTRLLER METHOD BASED ON ROUTE */

/* LOAD CONTROLLERS ----------------------------------------- */

let session = require('../controllers/session.js');
//console.log('session conroller: ', session);
var Users =  require('../controllers/users.js');
//console.log('Users conroller: ', Users);

module.exports = function(app) {

/* ROOT    --------------------------------------------------- */
   // "/"
   // Root - show all
   // HANDLED BY ANGULAR...
   app.get('/', function (req, res){
      res.json('welcome to FRIENDS');
   });

/* LOGIN + REGISTRATION   ------------------------------------- */

   app.post('/login', function(req, res){
      session.login(req,res);
   })
   app.get('/getcuruser', function(req, res){
      session.getCurUser(req, res)
   })
   app.get('/logout', function(req, res){
      session.logOut(req, res)
   })

/* USERS --------------------------------------------------- */

      // GET /users
      // returns all users
      app.get('/users', function (req, res){
         console.log(' GET index /  ');
         Users.index(req,res);
      });
      /* GET /users/:id
         Show: view a single user by ID.
      */
      app.get('/users/:id', function (req, res){
         console.log('GET show /users/:id ', req.params.id);
         Users.show(req,res);
      });
      /* POST
         /users
         Create a new user based on form submission.
      */
      app.post('/users', function (req, res){
         console.log('POST create /users');
         Users.create(req,res);
      });
      /*
         POST /users/:id
         PUT: process editing a user by ID.
      */
      app.put('/users/:id', function (req, res){
         console.log('PUT user update!!');
         Users.update(req,res);
      });
      /*
         DELETE /users/:id
         Delete: process deleting a user by ID.
      */
      app.delete('/users/:id', function (req, res){
         console.log('DELETE /users/:id');
         Users.delete(req,res);
      });

/* FRIENDS --------------------------------------------------- */
   //
   // // GET /friends
   // // returns all friends
   // app.get('/friends', function (req, res){
   //    console.log(' GET index /  ');
   //    Friends.index(req,res);
   // });
   // /* GET /friends/:id
   //    Show: view a single friend by ID.
   // */
   // app.get('/friends/:id', function (req, res){
   //    console.log('GET show /friends/:id ', req.params.id);
   //    Friends.show(req,res);
   // });
   // /* POST
   //    /items
   //    Create a new item based on form submission.
   // */
   // app.post('/friends', function (req, res){
   //    console.log('POST create /friends');
   //    Friends.create(req,res);
   // });
   // /*
   //    POST /items/:id
   //    PUT: process editing a friend by ID.
   // */
   // app.put('/friends/:id', function (req, res){
   //    console.log('PUT PUT PUT update!!');
   //    Friends.update(req,res);
   // });
   // /*
   //    DELETE /friends/:id
   //    Delete: process deleting a friend by ID.
   // */
   // app.delete('/friends/:id', function (req, res){
   //    console.log('DELETE /friends/:id');
   //    Friends.delete(req,res);
   // });

}

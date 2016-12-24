/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
 /* ROOT   -------------------------------- */
    .when('/index', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
 /* LOGIN + REGISTRATION   ----------------- */
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'sessionController'
    })
/* USERS   -------------------------------- */
   .when('/users/:id/edit/', {
     templateUrl: '/partials/userEdit.html',
     controller: 'userEditController',
     controllerAs: 'eC'
   })
   .when('/users/:id', {
     templateUrl: '/partials/userShow.html',
     controller: 'userShowController',
     controllerAs: 'sC'
   })
   .when('/new/user', {
     templateUrl: '/partials/userNew.html',
     controller: 'userNewController',
     controllerAs: 'nC'
   })
/* MESSAGES   ----------------------------- */
   .when('/messages', {
     templateUrl: '/partials/messages.html',
     controller: 'messagesController'
   })

/* DEFAULT -------------------------------- */
    .otherwise({
      redirectTo: '/dashboard'
    });
});

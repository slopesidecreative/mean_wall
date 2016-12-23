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
/* FRIENDS -------------------------------- */
    .when('/friends/:id/edit/', {
      templateUrl: '/partials/friendEdit.html',
      controller: 'editController',
      controllerAs: 'eC'
    })
    .when('/friends/:id', {
      templateUrl: '/partials/friendShow.html',
      controller: 'showController',
      controllerAs: 'sC'
    })
    .when('/new/friend', {
      templateUrl: '/partials/friendNew.html',
      controller: 'newController',
      controllerAs: 'nC'
    })
/* DEFAULT -------------------------------- */
    .otherwise({
      redirectTo: '/dashboard'
    });
});

angular.module('app', [
  'ngRoute',
  'MainController'
])
.config(['$routeProvider', function ($routeProvider) {
$routeProvider
  .when('/', {
    controller:'MainController',
    templateUrl:'views/main.html'
   })
}]);
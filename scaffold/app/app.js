var app = angular.module('app', [])
.config(['$routeProvider', function ($routeProvider) {
$routeProvider
  .when('/', {
    controller:'MainController',
    templateUrl:'views/main.html'
   })
}]);
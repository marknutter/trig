angular.module('app', ['MainController'])
.config(['$routeProvider', function ($routeProvider) {
$routeProvider
  .when('/', {
    controller:'MainController',
    templateUrl:'views/main.html'
   })
}]);
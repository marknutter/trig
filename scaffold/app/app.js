var app = angular.module('app', [])
.config(['$routeProvider', function ($routeProvider) {
$routeProvider
  .when('/', {
    controller:'MainCtrl',
    templateUrl:'views/main.html'
   })
}]);
var app = angular.module('app',
[ 'MainCtrl'])
.config(['$routeProvider', function ($routeProvider) {
$routeProvider
  .when('/', {
    templateUrl:'views/main.html',
    controller:'MainCtrl'
   })
}])
.run(['$rootScope', function($rootScope) {

}]);
'use strict';


var myListExpense = [{name: 'Проезд', sum: 13.5, dateExpense: '19.01.2017'},
  {name: 'Еда', sum: 47.75, dateExpense: '20.01.2017'},
  {name: 'Проезд', sum: 4.25, dateExpense: '25.01.2017'},
  {name: 'Еда', sum: 14.25, dateExpense: '25.01.2017'},
  {name: 'Прочие', sum: 164.25, dateExpense: '02.02.2017'}];

var expenseSt = [{id: 0, name: 'Проезд', isOpen: false},
  {id: 1, name: 'Еда', isOpen: false},
  {id: 2, name: 'Лекарства', isOpen: false},
  {id: 3, name: 'Комуналка', isOpen: false},
  {id: 4, name: 'Прочие', isOpen: false}];



var app = angular.module("tranjiraApp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/',{
    templateUrl: 'partials/hipage.html'
  });
  $routeProvider.when('/registration',{
    templateUrl: 'partials/registration.html',
    controller: 'registrationCtrl'
  });
  $routeProvider.when('/forgotpass',{
    templateUrl: 'partials/forgotpass.html'
  });
  $routeProvider.when('/login',{
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  });
  $routeProvider.when('/home',{
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);

app.run(function($rootScope, $location, loginService){
  var routepermission = ['/home'];
  $rootScope.$on('$routeChangeStart', function(){
    if (routepermission.indexOf($location.path()) != -1) {
      var connected = loginService.isslogged();
      connected.then(function(msg){
        console.log(msg.data);
        if (!msg.data) {
          $location.path('/login');
        }
      });
    }
  });
});
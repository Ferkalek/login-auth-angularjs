'user strict';

app.controller('loginCtrl', function($scope, loginService){
    $scope.msgtext = '';
    $scope.login = function(user) {
        //call login service
        loginService.login(user, $scope);
    }
});